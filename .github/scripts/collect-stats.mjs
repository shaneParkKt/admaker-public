// 방문(Traffic)·다운로드 수를 매일 모아 CSV 로 쌓는다.
// GitHub Traffic API 는 최근 14일치만 주므로 날짜별로 합쳐 오래 보관한다.
//
// 사용: node collect-stats.mjs <출력 폴더>
// 환경 변수
//   GITHUB_REPOSITORY  owner/name
//   GITHUB_TOKEN       릴리스 다운로드 수 조회용 (기본 Actions 토큰으로 충분)
//   TRAFFIC_TOKEN      Traffic 조회용 (레포 Administration: Read 권한 토큰). 없으면 Traffic 은 건너뜀
import fs from 'node:fs';
import path from 'node:path';

const outDir = process.argv[2] || 'stats';
const repo = process.env.GITHUB_REPOSITORY;
if (!repo) throw new Error('GITHUB_REPOSITORY 가 없습니다');
const today = new Date().toISOString().slice(0, 10);

async function api(p, token) {
  const res = await fetch(`https://api.github.com/repos/${repo}${p}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`${p}: HTTP ${res.status} ${await res.text()}`);
  return res.json();
}

function readCsv(file) {
  if (!fs.existsSync(file)) return [];
  const [head, ...lines] = fs.readFileSync(file, 'utf8').trim().split('\n');
  if (!head) return [];
  const keys = head.split(',');
  return lines.filter(Boolean).map((l) => {
    const cells = parseLine(l);
    return Object.fromEntries(keys.map((k, i) => [k, cells[i] ?? '']));
  });
}

function parseLine(line) {
  const out = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') quoted = false;
      else cur += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

const cell = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

function writeCsv(file, keys, rows) {
  const body = [keys.join(','), ...rows.map((r) => keys.map((k) => cell(r[k] ?? '')).join(','))].join('\n');
  fs.writeFileSync(file, body + '\n');
}

// 날짜를 키로 합친다. 같은 날짜는 새 값으로 덮어쓴다 (GitHub 가 최근 며칠 값을 나중에 보정하기 때문)
function mergeByKey(file, keys, keyOf, fresh) {
  const map = new Map(readCsv(file).map((r) => [keyOf(r), r]));
  for (const r of fresh) map.set(keyOf(r), r);
  const rows = [...map.values()].sort((a, b) => keyOf(a).localeCompare(keyOf(b)));
  writeCsv(file, keys, rows);
  return rows;
}

fs.mkdirSync(outDir, { recursive: true });
const f = (name) => path.join(outDir, name);

// 1) 릴리스 설치 파일 다운로드 수 (누적값 스냅샷)
const releases = [];
for (let page = 1; ; page++) {
  const batch = await api(`/releases?per_page=100&page=${page}`, process.env.GITHUB_TOKEN);
  releases.push(...batch);
  if (batch.length < 100) break;
}
const downloadRows = releases.flatMap((rel) =>
  rel.assets.map((a) => ({ date: today, tag: rel.tag_name, asset: a.name, downloads: a.download_count })),
);
const downloads = mergeByKey(
  f('downloads.csv'),
  ['date', 'tag', 'asset', 'downloads'],
  (r) => `${r.date}|${r.tag}|${r.asset}`,
  downloadRows,
);

// 2) Traffic (조회·순 방문자·클론·유입 경로)
let views = readCsv(f('views.csv'));
const trafficToken = process.env.TRAFFIC_TOKEN;
if (!trafficToken) {
  console.log('::warning::TRAFFIC_TOKEN 이 없어 방문 수(Traffic) 수집을 건너뜁니다.');
} else {
  const v = await api('/traffic/views?per=day', trafficToken);
  views = mergeByKey(
    f('views.csv'),
    ['date', 'views', 'unique_visitors'],
    (r) => r.date,
    v.views.map((d) => ({ date: d.timestamp.slice(0, 10), views: d.count, unique_visitors: d.uniques })),
  );
  const c = await api('/traffic/clones?per=day', trafficToken);
  mergeByKey(
    f('clones.csv'),
    ['date', 'clones', 'unique_cloners'],
    (r) => r.date,
    c.clones.map((d) => ({ date: d.timestamp.slice(0, 10), clones: d.count, unique_cloners: d.uniques })),
  );
  // 유입 경로·인기 경로는 '최근 14일 합계'만 주므로 날짜별 스냅샷으로 남긴다
  const refs = await api('/traffic/popular/referrers', trafficToken);
  mergeByKey(
    f('referrers.csv'),
    ['date', 'referrer', 'views', 'unique_visitors'],
    (r) => `${r.date}|${r.referrer}`,
    refs.map((r) => ({ date: today, referrer: r.referrer, views: r.count, unique_visitors: r.uniques })),
  );
  const paths = await api('/traffic/popular/paths', trafficToken);
  mergeByKey(
    f('paths.csv'),
    ['date', 'path', 'views', 'unique_visitors'],
    (r) => `${r.date}|${r.path}`,
    paths.map((p) => ({ date: today, path: p.path, views: p.count, unique_visitors: p.uniques })),
  );
}

// 3) 한눈에 보는 요약
const latest = downloads.filter((r) => r.date === today);
const totalDownloads = latest.reduce((s, r) => s + Number(r.downloads), 0);
const byTag = new Map();
for (const r of latest) byTag.set(r.tag, (byTag.get(r.tag) || 0) + Number(r.downloads));
const totalViews = views.reduce((s, r) => s + Number(r.views), 0);
const recent = views.slice(-30).reverse();

const md = [
  '# Admaker 방문·다운로드 통계',
  '',
  `마지막 집계: ${today} (UTC)`,
  '',
  '| 항목 | 값 |',
  '|------|----|',
  `| 누적 다운로드 (전체 설치 파일) | ${totalDownloads} |`,
  `| 누적 조회수 (집계 시작 이후) | ${views.length ? totalViews : '수집 안 됨'} |`,
  views.length ? `| 집계 시작일 | ${views[0].date} |` : null,
  '',
  '## 버전별 다운로드',
  '',
  '| 버전 | 다운로드 |',
  '|------|----------|',
  ...[...byTag].map(([tag, n]) => `| ${tag} | ${n} |`),
  '',
  '## 최근 30일 방문',
  '',
  '| 날짜 | 조회 | 순 방문자 |',
  '|------|------|-----------|',
  ...recent.map((r) => `| ${r.date} | ${r.views} | ${r.unique_visitors} |`),
  '',
  '순 방문자는 날마다 따로 세기 때문에 여러 날을 더하면 실제 순 방문자보다 커집니다.',
  '',
].filter((l) => l !== null).join('\n');
fs.writeFileSync(f('README.md'), md);

if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
console.log(`다운로드 ${totalDownloads}, 조회 ${totalViews}`);
