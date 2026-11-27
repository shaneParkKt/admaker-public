# Admaker

[![방문](https://hits.sh/github.com/shaneParkKt/admaker-public.svg?view=today-total&label=%EB%B0%A9%EB%AC%B8)](https://hits.sh/github.com/shaneParkKt/admaker-public/)
[![다운로드](https://img.shields.io/github/downloads/shaneParkKt/admaker-public/total?label=%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C)](https://github.com/shaneParkKt/admaker-public/releases)

**광고 영상을 기획부터 생성·편집·내보내기까지 한 곳에서 만드는 AI 광고 영상 에디터**의 데스크톱 앱 배포 저장소입니다.

[![Admaker 소개 영상](docs/admaker-demo.webp)](docs/admaker-demo.mp4)

<sub>미리보기를 누르면 소리가 있는 1080p 영상(mp4)을 볼 수 있습니다.</sub>

이 저장소에는 설치 파일과 릴리스 노트만 올라옵니다. 소스 코드는 공개하지 않습니다.

## 소개

Admaker 는 상품·매장 정보만 넣으면 광고 기획안, 장면 구성, 이미지·영상·음악·내레이션까지 AI 로 만들어 바로 편집할 수 있게 해 주는 광고 영상 제작 도구입니다.

| 모드 | 하는 일 |
|------|---------|
| **Quick** | 사진 몇 장과 매장 정보로 짧은 광고 영상을 빠르게 완성 |
| **Planner** | 광고 기획안과 스토리보드를 만들고 장면별로 다듬은 뒤 영상으로 생성 |
| **Studio** | 타임라인 편집기. 텍스트·스티커·전환 효과·모자이크·자막, AI 이미지·영상·BGM·보이스 생성 |

데스크톱 앱은 웹 버전과 같은 기능에 더해 다음을 제공합니다.

- 큰 영상도 내 PC 에서 바로 인코딩해 저장하는 로컬 내보내기
- 작업 폴더의 사진·영상·자막 파일을 바로 불러오기
- AI 에이전트(Agent) 연결로 대화하며 광고 만들기

## 다운로드

[최신 릴리스](https://github.com/shaneParkKt/admaker-public/releases/latest)에서 운영체제에 맞는 파일을 받으세요.

| OS | 파일 | 설치 |
|----|------|------|
| Windows | `Admaker-<버전>-win-setup.exe` | 설치 마법사를 따라 설치합니다. 바탕화면·시작 메뉴 바로가기가 만들어집니다. |
| macOS | `Admaker-<버전>-mac.pkg` | Apple Silicon·Intel 겸용입니다. 처음 열 때 막히면 **시스템 설정 → 개인정보 보호 및 보안 → 그래도 열기**를 누르세요. 설치가 끝나면 앱이 바로 실행됩니다. |

## 릴리스 노트

새 버전이 나올 때마다 아래에 변경 사항이 자동으로 추가됩니다 (최근 10개). 전체 기록은 [Releases](https://github.com/shaneParkKt/admaker-public/releases)에서 볼 수 있습니다.

<!-- releases:start -->
### 1.13.5 (2026-11-28)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.13.5)

#### 새 기능
- SNS 업로드용 영상은 다운로드 없이 만들어 바로 올리기
- 로그인 전 서비스 소개 페이지와 /login 분리
- 헤더 로그인 옆에 데스크톱 앱 받기 버튼 추가
- 리캡 장면 조각을 키프레임 복사로 빠르게 자르고 대용량 기준을 100MB로
- 소개 책에 Agent·MCP, 공유, 유튜브 업로드·성과 관리 쪽 보강
- 앱 화면 멈춤 기록·복구, 원본 정보 캐시, 오디오 파형을 앱 ffmpeg으로

#### 버그 수정
- MCP(Agent) 작업 중에도 패널·팝업·미리보기 열고 닫기 허용 — 생성·편집만 막기
- 소개 페이지 형태를 화면 크기 대신 주소로 결정
- 파일·공유 메뉴의 '광고' 표기를 '프로젝트'로 변경
- 다른 PC·탭의 최신 저장본을 옛 화면으로 덮어쓰지 않게 저장 충돌 처리

### 1.13.3 (2026-11-26)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.13.3)

#### 새 기능
- 작업 폴더에 3D 모델(GLB) 넣고 종류 필터를 아이콘 버튼으로
- 크게 보기에서 좌우로 이전/다음 이미지 보기

### 1.13.2 (2026-11-26)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.13.2)

#### 새 기능
- 오래된 앱 실행 차단을 없애고 자동 업데이트로만 업데이트
- 헤더 MCP 메뉴를 APP으로 바꾸고 버전 표기 + 지금 업데이트(강제 업데이트) 추가
- 헤더 앱 메뉴를 Admaker로 바꾸고 맨 앞(파일 왼쪽)으로 이동

### 1.13.1 (2026-11-26)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.13.1)

#### 기타
- 안정성 개선 및 버그 수정

### 1.13.0 (2026-11-26)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.13.0)

#### 새 기능
- SNS 성과 영상 상세 — 전체 탭이면 올린 플랫폼 합계

#### 버그 수정
- Quick·Planner 공유 메뉴 영상 다운로드가 최종 영상이 있어도 비활성으로 남던 문제
- Quick 결과 하단 '광고 다운로드' 버튼 문구를 '영상 다운로드'로 변경

#### 기타
- MCP 스킬 동기화: admaker-3d 스킬 분리 반영

### 1.12.4 (2026-11-26)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.12.4)

#### 새 기능
- MCP 요청 출처 헤더 + 기획 이용료에 확정 기획 전달
- 엔진 버전만 바뀌어도 스킬 자동 업데이트 + 알림에 스킬 버전 표시

#### 버그 수정
- 앱에서는 앱 전용 3D 모델도 생성, 텍스트로 만들기 모델 선택
- 예전 생성 모델 목록 캐시 때문에 텍스트→3D 모델 선택이 안 보이던 문제
- Blender MCP 연결돼도 열린 Blender를 안 쓰고 blender -b로 돌던 문제
- Blender 렌더는 항상 GPU 먼저 (GPU 없으면 CPU 전에 멈추고 묻기)

### 1.12.3 (2026-11-26)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.12.3)

#### 기타
- 안정성 개선 및 버그 수정

### 1.12.2 (2026-11-26)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.12.2)

#### 버그 수정
- SNS 성과 화면 — 차트 높이 고정, 플랫폼 탭 유지, 영상별 성과 플랫폼 합치기
- Agent(MCP) 생성은 결과가 타임라인에 들어가야 작업 목록 완료

### 1.12.1 (2026-11-26)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.12.1)

#### 기타
- 안정성 개선 및 버그 수정

### 1.12.0 (2026-11-25)

[다운로드](https://github.com/shaneParkKt/admaker-public/releases/tag/admaker-app-v1.12.0)

#### 새 기능
- SNS 업로드 성과 탭 — 조회수·좋아요·시청 시간·이탈 그래프·유입 경로
- 업로드 내역에서 다른 채널에 올리기
- 업로드 실패 이유 자세히 보기
- SNS 업로드 화면에서 오른쪽 패널 접기
- SNS 업로드 플랫폼별 해상도 선택·미리보기 + 앱에서 변환 후 올리기
- Quick 모드 상단 헤더에 공유 버튼
- Quick 헤더 공유 버튼 옆에 미리보기 버튼
- 채널 연결 관리를 헤더 유저 메뉴(로그아웃 위)로 이동

#### 버그 수정
- 이미 올린 채널 비활성화, AI 문구 확인창 닫힘, 유튜브 전용 설정 표시
- SNS 업로드 창 제목·아이콘을 대시보드 메뉴와 통일
- SNS 변환 흐린 배경을 LGPL ffmpeg에 있는 gblur로
- 인스타그램 rupload에 Content-Length·X-Entity-Length 헤더
- 인스타그램 rupload 헤더를 문서 예시와 같게 + 실패 단계 표시
<!-- releases:end -->

## 라이선스

Copyright (c) 2026 KT Corporation. All rights reserved.

배포되는 앱은 KT 의 독점 소프트웨어입니다. KT 의 사전 서면 허가 없이 복제, 수정, 배포, 외부 공개할 수 없으며, 리버스 엔지니어링·디컴파일과 이를 통한 재구현을 금지합니다. 전문은 [LICENSE](./LICENSE)를 참고하세요.
