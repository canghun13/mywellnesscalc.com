# MyWellnessCalc 작업 인수인계
> 최종 업데이트: 2026-07-17 (같은 날 세션 2회차 — 사용자가 신규 확장 가속 지시)

---

## 기본 정보

- **사이트**: https://mywellnesscalc.com
- **GitHub 레포**: `canghun13/mywellnesscalc.com` (GitHub Pages 정적 사이트)
- **GA4**: G-9YL3ZRZBDF
- **AdSense**: ca-pub-5592663499707350
- **AdSense 상태**: 심사 반려(가치없는 콘텐츠) → 트래픽 충분히 쌓인 후 재신청. **재심사 전 다른 광고/제휴 추가 금지.** (2026-07-11 세션에서 남아있던 미완성 iHerb 제휴링크 전부 제거함 — 아래 참고)

---

## ⭐ 작업 방식 (중요 — 반드시 숙지)

이 프로젝트는 **GitHub Personal Access Token(PAT)을 받아서 clone → 수정 → commit → push까지 직접 진행**하는 방식으로 작업한다. 매번 "진행해도 될까요" 재확인 없이, 사용자가 토큰을 주면 바로 작업 시작.

```bash
export GH_TOKEN="<받은 토큰>"
git clone -q https://$GH_TOKEN@github.com/canghun13/mywellnesscalc.com.git /home/claude/repo
cd /home/claude/repo
git config user.email "noreply@mywellnesscalc.com"
git config user.name "MyWellnessCalc Bot"
# ... 수정 작업 ...
git add -A
git commit -m "설명"
git push origin main
```

- 토큰은 **매번 새로 발급**받아서 씀 (작업 끝나면 사용자가 revoke함). 이전 세션 토큰은 재사용 불가.
- push 후에는 GitHub API(`api.github.com`)로 실제 반영 확인하는 습관 들일 것. API rate limit 걸리면 `git ls-remote origin main`으로 로컬/원격 커밋 해시 비교해서 대체 확인 가능.
- git 사용자 정보(`user.email`/`user.name`)는 새로 clone할 때마다 다시 설정해야 함 (매번 초기화됨).
- **⚠️ 사용자가 "토큰 revoke 시킨다" 또는 이와 유사한 세션 종료 신호를 보내면 그 즉시 모든 작업(파일 수정, git 명령 포함)을 멈출 것.** 후속 질문에 답하다가 관성적으로 작업을 이어가지 말 것 — 실제로 이 실수를 한 적 있음 (사용자가 크게 지적함). 이후 새 토큰을 받으면 그때까지 로컬에 남은 미승인 변경사항을 먼저 요약해서 보여주고 승인받은 뒤 진행할 것.

### 다른 사이트 repo 접근 (교차 링크 작업용)
- 같은 계정(canghun13) 산하에 10개 이상의 다른 사이트 repo 존재: autocalchub, cookingcalcs-, diycalckit, ecoenergycalc, freetooldev, getsolotools, go-moneydecoded, gpavault, myinsurancecalc-, petpawcalc, tools-moneydecoded, kr-tools 등. **repo 이름에 하이픈(-)이 붙은 경우 있음** (`cookingcalcs-`, `myinsurancecalc-` — 실제 이름 확인 필수, 아니면 404 남).
- **⚠️ 중요**: `/user/repos` API로 조회하면 이 repo들이 다 보이고 `permissions.push: true`로 표시되지만, **실제로는 fine-grained PAT가 mywellnesscalc.com에만 write 스코프 되어 있고 다른 repo는 read-only일 수 있음**. API의 permissions 필드를 믿지 말고 실제로 `git push`를 시도해서 403이 뜨는지 직접 확인할 것. 2026-07-11 세션에서 이 문제로 cookingcalcs-/myinsurancecalc- 양쪽에 반영 못하고 mywellnesscalc.com 쪽(나가는 링크)만 처리함.
- 나가는 링크(mywellnesscalc → 다른 사이트)만 이번 토큰으로 가능했고, 반대 방향(다른 사이트 → mywellnesscalc)은 해당 사이트 프로젝트 채팅에서 별도 진행하기로 함 — 사용자에게 두 개의 프롬프트(cookingcalcs-용, myinsurancecalc-용) 전달 완료 (아래 "교차 내부링크 현황" 참고).

---

## ⚠️ 절대 반복하면 안 되는 실수들 (실제 경험한 사고 누적)

### 1. div 태그 불균형 — **개수만 맞추지 말고 중첩 순서까지 검증할 것**
파일 수정 전/후로 항상 아래 스크립트로 div open/close **개수**가 일치하는지 확인. **원본 파일 자체에 이미 버그가 있었던 사례 있음**. 남이 만든 파일이라도 무조건 먼저 검증.

```python
import re
html = open('경로').read()
clean = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.S)
clean = re.sub(r'<script[^>]*>.*?</script>', '', clean, flags=re.S)
o = clean.count('<div'); c = clean.count('</div>')
print('OK' if o==c else f'FAIL {o} vs {c}')
```

**🔴 2026-07-11에 실제로 터진 사고**: `protein-calculator.html`에서 FAQ 블록 두 개를 병합하는 과정에서 div 개수는 정확히 맞았는데(79/79), **`.side-col`이 `.main-col` 안에 자식으로 중첩되어버림** (형제 관계여야 CSS Grid가 정상 작동하는데 부모-자식이 되면서 사이드바가 그리드 2열이 아니라 본문 아래로 쌓여버림 — 반응형 문제가 아니라 화면 크기 무관하게 항상 깨져있었음). **개수 검증 스크립트로는 절대 못 잡음.** 아래처럼 스택 기반으로 "특정 태그가 열릴 때 그 시점의 부모가 무엇인지"까지 확인하는 습관 들일 것:

```python
import re
html = open('경로').read()
def strip_keep_lines(pattern, text):
    return re.sub(pattern, lambda m: '\n'*m.group().count('\n'), text, flags=re.S)
h2 = strip_keep_lines(r'<style[^>]*>.*?</style>', html)
h2 = strip_keep_lines(r'<script[^>]*>.*?</script>', h2)
lines = h2.split('\n')
tag_stack = []
for i, line in enumerate(lines, 1):
    for m in re.finditer(r'<div\b(?:[^>]*class="([^"]*)")?[^>]*>|</div>', line):
        full = m.group(0)
        if full == '</div>':
            if tag_stack: tag_stack.pop()
        else:
            tag_stack.append((i, m.group(1) or ''))
    if 'class="side-col"' in line or 'class="article-sidebar"' in line:
        print(f"라인{i} 시점 부모 스택:", tag_stack)  # page-wrap/article-wrap이 바로 위여야 정상
```
특히 **div 구조를 손댄 파일은 작업 끝나고 반드시 이 중첩 검증까지 할 것.** 매크로/일반 개수 체크만으로 "OK"라고 판단하고 넘어가면 안 됨.

### 2. 인쇄용 CSS가 화면 레이아웃까지 건드림
PDF 인쇄 CSS(`@media print`) 만들 때, 화면용 규칙과 인쇄용 규칙을 섞어 쓰면 화면 자체가 깨진다. 반드시 `@media print { }` 블록 안에만 레이아웃 변경 규칙을 넣을 것.

**추가로 확인된 것**: 결과 화면에 있는 원형 마커/포인터(`.scale-pointer`, `.bar-pointer` 같은 시각적 인디케이터)는 인쇄 시 숨김 목록에서 빠지기 쉬움 — `bmi-calculator.html`과 `ideal-weight.html`에서 실제로 PDF 저장 시 원이 그대로 찍혀나온 사고 있었음. 공유 `assets/css/print.css`에 `.scale-pointer, .bar-pointer` 추가해서 해결함. 새 계산기 결과 화면에 이런 시각적 인디케이터(막대바 위 동그라미 등)를 넣을 땐 처음부터 print.css 숨김목록에 포함시킬 것.

### 3. 테이블 반응형 — 확립된 최종 패턴 (2026-07-11 기준 사이트 전체 재검증 완료)
표가 화면 폭을 넘을 때 실패했던 이력들 끝에 정착한 최종 패턴:
1. `<table>`을 `<div class="table-wrapper">`로 감쌈
2. `.table-wrapper { overflow-x:auto; -webkit-overflow-scrolling:touch; margin:1rem 0; }`
3. 표 자체엔 `min-width` 부여 (컬럼수 × 130px, 최소 320px) — **단, 2컬럼짜리 표(라벨+값 형태)는 이 공식을 기계적으로 적용하면 오히려 불필요하게 넓어져서 스크롤을 강제하게 됨. 2열 표는 `table-layout:fixed`로 균등분할 + 헤더/셀 줄바꿈 허용(`white-space:normal`)이 낫다.** (`vo2-max-calculator.html`의 ref-table에서 이 실수 했다가 사용자가 스크린샷으로 캐치해서 수정함)
4. **표를 담은 그리드 부모에 `min-width:0` 추가** (예: `main-col{min-width:0;}` 또는 `.article-main{min-width:0;}`) — 핵심.

**2026-07-11 세션에 발견된 추가 함정들**:
- `overflow:hidden`으로 감싼 결과표 wrapper(예: `.pct-table-wrap`)는 내부에 스크롤 가능한 별도 div(`overflow-x:auto`)를 추가로 넣어야 함. 바깥 wrapper의 `overflow:hidden`은 border-radius 유지용으로 필요하니 그대로 두고, 안에 `.xxx-scroll{overflow-x:auto}` div를 하나 더 넣는 이중 구조로 처리.
- HTML엔 `<div class="table-wrapper">`가 있는데 **정작 CSS에 `.table-wrapper` 규칙 자체가 정의 안 되어 있어서 죽어있던 케이스** 발견됨 (`waist-to-hip-ratio-calculator.html`). wrapper div가 있다고 안심하지 말고 CSS 규칙 존재 여부까지 확인할 것.
- 새 표 만들 때는 처음부터 이 세트로 적용. 기존 파일 수정할 때도 표가 있으면 무조건 wrapper 상태 먼저 점검.

**2026-07-11 세션에 사이트 전체 재점검해서 12개 파일 추가로 발견·수정함** (이전 세션엔 특정 클래스명만 검색해서 놓쳤던 것들 — `<table` 태그 전부를 개별 추적해야 안 놓침): fat-burning-zone-explained, protein-how-much-do-you-need, tdee-vs-bmr, zone-2-vs-hiit-fat-loss, calories-burned-by-heart-rate-zone, how-much-vitamin-d-do-you-need-daily (블로그), calorie-deficit-calculator, maf-calculator, bmi-calculator, vo2-max-calculator(표 3개), waist-to-hip-ratio-calculator, one-rep-max(결과표) (툴). **현재 사이트 전체 테이블 반응형 이슈는 0건 (2026-07-11 기준 전수 검증 완료).**

### 4. FAQ 본문-스키마(JSON-LD) 불일치 — 사이트 전체에 광범위하게 있었던 버그
FAQ를 나중에 추가할 때 스키마를 같이 갱신 안 하는 습관이 있었음. **2026-07-11 세션에 전체 스캔해서 90개 파일 중 20개에서 실제로 발견·수정함**:
- HTML엔 FAQ가 여러 개 있는데 스키마엔 일부만 있거나(개수 불일치)
- 개수는 같은데 문구가 미묘하게 다르거나(따옴표 스타일, 재구성된 문장)
- 심지어 **스키마에 중복 질문**이 들어있거나, **본문에 없는 완전히 다른(오래된) 질문**이 스키마에 남아있는 경우도 있었음 (`high-protein-foods.html`)
- **본문 자체에 "Frequently asked questions" 섹션이 통째로 2번 존재**하는 심각한 케이스도 있었음 (`best-time-to-exercise.html` — 편집 이력상 나중 편집자가 기존 FAQ 섹션을 못 보고 새로 추가한 것으로 추정)
- FAQ가 아예 있는데 **FAQPage 스키마 자체가 없는** 케이스도 있었음 (`vo2-max-calculator.html`)

**새 파일 만들거나 기존 파일에 FAQ 추가할 때마다 반드시 아래로 검증**:
```python
import re, json
html = open('경로').read()
htmlqs = re.findall(r'<div class="faq-q">(.*?)</div>', html)  # 파일마다 <p class="faq-q"> 쓰는 경우도 있음(quiz 계열), 그 경우 정규식 조정
scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
names = None
for s in scripts:
    d = json.loads(s)
    if d.get('@type')=='FAQPage':
        names=[q['name'] for q in d['mainEntity']]
print('일치:', set(htmlqs)==set(names), len(htmlqs), len(names) if names else 0)
```
불일치 시 안전한 자동 수정법: 스키마의 `mainEntity`를 HTML의 실제 FAQ Q&A로 통째로 재생성(regenerate)하는 게 수동으로 하나씩 맞추는 것보다 안전하고 빠름.

### 5. 신규 페이지 만들 때 기존 사이트의 클래스명 통일 안 돼 있음 주의
- 결과 컨테이너 id: `result` 또는 `resultSection` (파일마다 다름, 확인 후 작업)
- 설명 섹션 클래스: `info-section` 또는 `article-section` (파일마다 다름)
- 사이드바 구조: `.side-col` 클래스 방식 또는 `<aside>` 태그 방식 (파일마다 다름)
- FAQ 질문 태그: `<div class="faq-q">` 또는 `<p class="faq-q">` (퀴즈 계열은 p 태그 쓰는 경우 있음)
- CSS 커스텀 변수(`--run`, `--water`, `--fast` 등)가 **정의 없이 쓰이기만 하고 `:root`에 없는 경우**가 있었음(버튼이 흰 배경에 흰 글자로 안 보이는 버그의 원인). 새 파일 만들 때 커스텀 색상 변수는 반드시 파일 안에 `:root{}`로 직접 정의할 것.

### 6. 모바일 CTA 박스(계산기로 유도하는 초록 박스) flex-wrap 버그 — 45개 파일
`display:flex; align-items:center; gap:1rem; flex-wrap:wrap;` 구조의 CTA 박스가 좁은 화면에서 버튼이 텍스트 옆에 어색하게 낑겨있는 문제 있었음 (텍스트가 `flex:1`로 계속 줄어들기만 하고 버튼이 다음 줄로 안 내려감). `@media(max-width:480px){.cta-box{flex-direction:column;align-items:stretch}.cta-box .cta-link{align-self:flex-start}}` 규칙 추가로 해결. **45개 파일에 동일 패턴 있었고 전부 수정 완료.** 나머지 20개 파일(퀴즈 계열)은 이미 다른 안전한 구조(`.cta-links{flex-direction:column}`)라 문제 없었음. 새로 이런 CTA 박스 만들 때 이 미디어쿼리 처음부터 포함시킬 것.

### 7. 결과 카드 2개가 나란히 있을 때 텍스트 길이 불균형으로 시각적으로 어색해 보일 수 있음
`vo2-max-calculator.html`에서 "~50th"(짧은 텍스트)와 "52 ml/kg/min"(길어서 줄바꿈되는 텍스트)이 2열 그리드에 나란히 있으니 폰트 크기는 같은데 후자가 훨씬 커 보이는 착시 발생. 좁은 화면(480px 이하)에서는 `grid-template-columns:1fr`로 세로 스택되게 바꿔서 해결. 결과 카드 여러 개를 나란히 배치할 땐 텍스트 길이가 비슷한지 미리 확인할 것.

### 8. 광고/제휴 링크 관련 — 미완성 링크가 광범위하게 남아있었음
`https://iherb.com/?rcode=YOUR_CODE` 형태의 **미완성 플레이스홀더 제휴링크**가 7개 파일(`body-fat-calculator`, `water-intake`, `sleep-calculator`, `calorie-calculator`, `macro-calculator`, `bmi-calculator`, `if-calculator`)에 남아있었음 — 작동도 안 하고, "AdSense 재심사 전 다른 광고/제휴 추가 금지" 정책에도 위배됨. **2026-07-11 세션에 전부 제거 완료** (bmi-calculator.html은 JS로 동적 제어하던 로직도 같이 정리함). 사이트 전체 재검색해서 0건 확인됨. 새로 제휴링크 넣을 땐 실제 코드 확정 전엔 아예 안 넣는 게 낫다.

---

## New/Updated 뱃지 정책 (2026-07-06 확립)

- **뱃지 유지 기간: 14일.** 게시/수정일로부터 14일 지나면 제거.
- 뱃지 옆에 `<!-- badge-added:YYYY-MM-DD -->` 주석을 반드시 남길 것.
- 적용 대상: `tools/index.html`, `blog/index.html`, `quiz/index.html`, 그리고 홈 `index.html`의 각 미리보기 섹션(툴/블로그/퀴즈) 전부.
- **2026-07-11 기준**: `blog/index.html`에 2026-06-28 날짜 뱃지 4개가 있는데 다음 체크 시점(대략 2026-07-12 이후)엔 14일 지나서 제거 대상이 됨 — 다음 세션에 확인할 것.

---

## 신규 페이지 작업 시 체크리스트

### 절대 누락 금지 (모든 신규 파일)
- 파비콘: `<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">`
- GA4 태그: `G-9YL3ZRZBDF`
- AdSense 태그: `ca-pub-5592663499707350`
- Canonical URL
- Schema Markup (JSON-LD, 아래 타입 참고)

### 페이지 타입별 Schema 구성
- **툴**: WebApplication + BreadcrumbList + FAQPage
- **블로그**: Article + BreadcrumbList + FAQPage
- **퀴즈**: BreadcrumbList + FAQPage

### 콘텐츠 품질 기준
- FAQ 6~8개 권장 (퀴즈는 3~5개도 무방)
- 툴/블로그: 관련 링크(사이드바) 5~6개, 롱폼 필수(1000단어 이상 권장 — 2026-07-11 세션에서 500~900단어대 얇은 페이지 8개를 950~1200단어로 보강한 이력 있음)
- 표가 들어가면 처음부터 위 "테이블 반응형 최종 패턴" 세트 적용

### 신규 페이지 만들고 나서 작업 완료 체크 (2026-07-11 확립, zone-2-training-plan.html 만들 때 실제로 수행한 순서)
1. 신규 파일 생성 (기존 유사 페이지를 템플릿으로 복사해서 시작하는 게 안전 — CSS/스키마 구조 통일성 유지)
2. div 밸런스 + 중첩 순서 검증 (위 실수 #1 참고)
3. FAQ 본문-스키마 정확히 일치하는지 검증 (위 실수 #4 참고)
4. 표 있으면 반응형 wrapper 적용 여부 검증
5. `blog/index.html` (또는 `tools/index.html`/`quiz/index.html`) 맨 위에 카드 추가 + New뱃지 + 날짜주석
6. 홈 `index.html`의 해당 미리보기 섹션에도 반영 (오래된 카드 하나 빼고 교체하는 방식 권장 — 미리보기는 보통 3개 슬롯만 있음)
7. `sitemap.xml`에 URL 추가 (툴 priority 0.8, 블로그/퀴즈 0.7) + XML 유효성 검증(`xml.etree.ElementTree.parse`)
8. `llms.txt`에 설명과 함께 URL 추가
9. **관련 있는 기존 페이지들에서 신규 페이지로 역링크 추가** (내부 링크 자산 확보 — 신규 페이지 혼자 고립되지 않도록. zone-2-training-plan.html 만들 때 기존 zone-2 클러스터 3개 페이지에서 역링크 걸었음)
10. 커밋 메시지에 체크리스트 수행 여부 명시

### 배포 후
- 사이트맵 제출로 색인 요청 갈음 (개별 URL Search Console 색인요청 불필요)

---

## E-E-A-T (전문성/권위/신뢰성) 관련 — 2026-07-11 결정사항

- `about.html`에 "How content on this site is verified" 섹션 추가함 — 어떤 출처(WHO/NIH/EFSA/ISSN)를 쓰는지, 어떻게 공식을 교차검증하는지, 연구가 엇갈리는 주제는 어떻게 표기하는지 설명.
- **저자/운영자 인칭 문제**: 실제 팀도 아니고 실명도 없는 상태라 "we"나 "I" 둘 다 애매해서, **브랜드명(My Wellness Calc)을 주어로 쓰는 방식으로 최종 결정함**. 앞으로 about.html이나 다른 페이지에 관련 문구 추가할 때 이 원칙 유지할 것 — 허위 인물/자격증(예: "등록 영양사 김OO 검수" 같은) 절대 지어내지 말 것. 이건 법적/신뢰도 리스크이자 나중에 걸리면 애드센스/구글 정책상으로도 안 좋음.
- 개별 블로그/툴 페이지마다 저자 박스 넣는 건 90개 파일 다 건드려야 해서 비용 대비 효과 낮다고 판단, 보류함. about.html 레벨에서만 처리.

---

## 교차 내부링크 현황 (2026-07-11 세션)

**관련성 검토 결과**: mywellnesscalc.com(건강/웰니스)과 진짜 관련있는 사이트는 `cookingcalcs-`(요리/식단 계산기)와 `myinsurancecalc-`(보험 계산기, BMI/체지방률이 생명보험 심사 지표로 실제 쓰임) 2곳뿐. 나머지(autocalchub, diycalckit, ecoenergycalc, freetooldev, getsolotools, gpavault, tools-moneydecoded, kr-tools, petpawcalc)는 주제가 안 맞아서 링크 안 걸기로 함 (억지 링크는 스팸성 신호로 오히려 손해).

**완료된 방향 (mywellnesscalc.com → 다른 사이트, outbound)**:
| mywellnesscalc.com 페이지 | → | 대상 |
|---|---|---|
| tools/protein-calculator.html | → | cookingcalcs.com/tools/meal-cost-calculator.html |
| tools/macro-calculator.html | → | cookingcalcs.com/tools/weekly-meal-prep-cost-calculator.html |
| tools/bmi-calculator.html | → | myinsurancecalc.com/tools/life-insurance.html |
| tools/body-fat-calculator.html | → | myinsurancecalc.com/tools/long-term-care-insurance.html |

**미완료 (다른 사이트 → mywellnesscalc.com, inbound)**: 토큰 권한 문제로 이번 세션에선 못함. 사용자에게 각 프로젝트 채팅에서 진행할 수 있게 프롬프트 2개(cookingcalcs-용, myinsurancecalc-용) 전달 완료 — 진행됐는지 다음 세션에 확인할 것. 프롬프트 내용은 위 표와 동일한 4개 링크의 반대 방향.

---

## 현재 사이트 현황 (2026-07-15 기준)

- **툴 26개, 블로그 50개**(이번 세션 신규 3건: maf-training-plan.html, calorie-surplus-calculator.html, lean-bulk-vs-dirty-bulk.html), **퀴즈 20개**
- 개수 목표 고정 안 함

### 최근 세션(2026-07-11)에서 한 일 요약
1. 서치콘솔 신규 데이터(Performance + Coverage) 분석 — 색인 문제 거의 없음(심각한 이슈 2건, 경미), 신규 검색 기회 뚜렷한 건 없음(기존 클러스터 재확인)
2. 웹서치로 2026년 기준 SEO/AdSense 재승인 가이드 확인 — 신생 사이트는 CTR보다 토픽 권위/백링크가 병목, E-E-A-T가 애드센스에도 영향
3. 미완성 제휴링크(iHerb rcode=YOUR_CODE) 7개 파일에서 전부 제거
4. about.html에 E-E-A-T "검증 프로세스" 섹션 추가
5. 교차 내부링크: mywellnesscalc→cookingcalcs/myinsurancecalc 방향 완료(4개 페이지), 반대 방향은 프롬프트 전달만 완료
6. 신규 콘텐츠 1건: `blog/zone-2-training-plan.html` (8주 트레이닝 플랜, 1555단어, FAQ 8개) — Zone2 클러스터 완성용, 검색량 근거는 약하지만 토픽 권위 강화 목적
7. 사이트 전체 재스캔: FAQ/스키마 불일치 20건 발견·수정, 테이블 반응형 누락 12건+2건 발견·수정, div 중첩 버그 1건(protein-calculator.html side-col) 발견·수정
8. 사용자가 스크린샷으로 캐치한 버그 4건 수정: 인쇄 시 원형마커 노출, VO2max 표 과도한 min-width, CTA박스 45개 파일 모바일 스택, 결과카드 텍스트 길이 불균형
9. 콘텐츠 얇은 페이지 8개 보강: one-rep-max, vitamin-d-calculator, body-fat-calculator, running-pace, protein-calculator-women-over-40, tdee-vs-bmr, creatine-do-you-need-it, macro-calculator — 각각 FAQ 확충, 관련링크 확충, 신규 기준표/섹션 추가로 단어수 40~90% 증가

---

## 데이터 스냅샷 (2026-07-11 기준, 참고용 — 다음 체크 때 최신 데이터로 교체할 것)

- **주의**: 2026-07-09와 2026-07-11 데이터가 겨우 2일 차이라 대부분의 페이지 순위/노출이 거의 그대로였음 (구글 반영 지연 2-3일+ 고려하면 지난 세션 최적화 효과는 아직 이 데이터에 안 잡혀있을 가능성 높음). **다음 체크는 최소 1~2주 간격을 두고 하는 게 효과 판단에 유리함.**
- Coverage(색인 상태): 심각한 문제 2건("발견됨-미색인", 정상 범위), 중요하지 않은 문제 0건
- Zone2/심박수 클러스터, MAF 클러스터, 단백질 관련 클러스터 등 기존에 파악된 순위 분포(대부분 50~95위대) 큰 변화 없음 — 계속 지켜볼 것

---

## 진행 중 논의만 되고 미착수인 것

- (2026-07-13 세션에서 아래 두 건 모두 확인·해소됨 — 상세는 하단 "2026-07-13 세션 요약" 참고)
- ~~교차 내부링크 반대 방향~~ → 2026-07-13 확인 결과 4개 링크 전부 반영 완료됨(cookingcalcs-/myinsurancecalc- 양쪽 프로젝트 채팅에서 진행된 것으로 보임).
- ~~뱃지 정리(2026-06-28 뱃지 4개)~~ → 2026-07-13 세션에 14일 경과 확인 후 제거 완료.

## ⭐ 신규 콘텐츠 발굴 방법론 (2026-07-17 세션 2회차 후반, 사용자 지시로 확정)

**문제 인식**: 지금까지(07-13/07-15/07-17 1회차) 신규 후보를 찾을 때 주로 **서치콘솔 쿼리 1,000개를 키워드 그룹으로 스캔**하는 방식을 썼음. 그런데 이 방식은 구조적 한계가 있음 — GSC에 쿼리가 잡힌다는 것 자체가 "그 쿼리로 우리 페이지 중 하나가 이미 어딘가에 노출되고 있다"는 뜻이라, 이 방식으로 찾은 "갭"은 실제로는 전부 **기존에 이미 다루는 주제의 인접 확장판**일 뿐 진짜 새 카테고리가 아니었음 (예: menopause protein calculator — 이미 있는 protein-calculator-women-over-40.html 바로 옆동네, calorie surplus — 이미 있는 calorie-deficit-calculator.html의 반대짝). 유일하게 이 방식으로 잘 맞은 MAF 사례도 "새 카테고리 발견"이 아니라 "기존 페이지가 생각보다 순위가 좋다는 재확인"이었음.

**확정된 새 방법론**:
- **GSC 데이터는 "기존 클러스터가 잘 되고 있나 확인용"으로만 사용.** 순위/노출/클릭 추이를 보고 어떤 클러스터에 더 투자할지, 어떤 페이지가 CTR 문제인지 판단하는 용도. 신규 카테고리 발굴의 주 소스로 쓰지 않음.
- **신규 카테고리 발굴은 매번 웹서치로 인접 카테고리를 직접 브레인스토밍하는 것을 기본 프로세스로 승격.** (07-17 세션 2회차 후반에 카페인/안정심박수/근력운동/불면증 등을 조사한 게 이 방식이었음 — 결과가 다 기각되긴 했지만 방법론 자체는 맞다고 사용자가 확인함)
- **한 번에 몰아서 찾지 말고 세션마다 조금씩(2~3개 후보) 넓혀갈 것.** 매 세션 완전히 새로운 카테고리 2~3개를 웹서치로 조사 → 경쟁강도/YMYL리스크/사이트 정체성 적합도 확인 → 통과하는 것만 진행.
- 이 방식으로 후보를 찾을 때도 기존 원칙은 동일하게 적용: ①기존 파일과 중복확인 ②경쟁강도 웹서치(대형 브랜드/의료기관 지배 여부, 전용 계산기 사이트 몇 개나 있는지) ③YMYL/의료진단 인접 여부(리스크 높으면 기각) ④사이트 정체성(웰니스 계산기, 익명 브랜드)에 맞는지.

---

## 다음에 할 만한 것 (우선순위 없이 나열, 데이터 보고 판단)

- [x] ~~다음 서치콘솔 체크(1~2주 후 권장) 때 이번 세션(07-15)에서 만든 신규 페이지(high-protein-dinner-women-over-40.html)와 내부링크 보강(zone-2/recovery 클러스터 → 퀴즈)이 색인/노출에 반영됐는지 확인~~ → **2026-07-17 중간 확인(아직 2일뿐이라 참고용)**: `zone-2-training-plan.html`은 0→30노출로 신호 생김. `quiz/zone-2-fitness-level.html`/`quiz/recovery-type.html`은 여전히 노출 0. `high-protein-dinner-women-over-40.html` 자체도 아직 노출 데이터 없음(07-15 게시, 데이터 반영 지연 2-3일+ 고려하면 정상). **1~2주 뒤 재확인 필요.**
- [ ] AdSense 재신청 여부는 트래픽 데이터 보고 판단 (2026-07-13 기준 여전히 이르다고 판단됨 — 이번 세션엔 재확인 안 함, 다음 세션에 최신 GA4로 재확인 권장. 2026-07-17 세션엔 GA4 미첨부라 판단 자료 없음)
- [ ] **신규 콘텐츠 재개 결정(2026-07-15, 사용자 지시)** — 이전 세션(07-13)엔 "도메인 권위가 병목이라 신규 보류" 판단이었으나, 사용자가 확장 국면이라고 판단하여 이번 세션에 재개함(아래 세션 요약 참고). 앞으로도 신규 페이지는 **①기존에 실제로 트래픽/클릭이 발생하는 클러스터의 자연스러운 확장**이면서 **②웹서치로 확인한 경쟁강도가 낮거나 파편화된(=지배적 대형 도메인이 없는) 키워드**를 우선순위로 판단할 것. 이번 세션에 조사해서 기각한 후보(경쟁 너무 강함): creatine 도구(dosage calculator) — bodybuilding.com/BodySpec/FitnessVolt 등 10개+ 전문 도구 사이트가 이미 선점.
- [x] ~~다음 신규 후보로 검토 가능한 것: `high-protein-snacks-women-over-40.html`~~ → **2026-07-17 세션에 작성 완료.** women-over-40 protein 4종 세트(breakfast/lunch/dinner/snacks) 전체 완성, 4개 파일 전부 상호링크 배선 완료. 아래 세션 요약 참고.
- [x] ~~`calorie-surplus-calculator`(기존 calorie-deficit-calculator.html의 반대 축, bulking/근육증가 수요) — 06월/07-15 조사에서 경쟁 중간강도로 확인~~ → **2026-07-17 세션 2회차에 사용자 지시(신규 확장 가속)로 작성 완료.** 상세는 하단 세션 요약 참고. 범용(성별/연령 비특정) 버전으로 진행, "women over 40" 특정 앵글은 reverse.health가 이미 선점하고 있어 회피함.
- [x] ~~**GEO(생성형 엔진 최적화) 구조 적용 확대 검토**~~ → 2026-07-17 세션 2회차에 신규 콘텐츠(lean-bulk-vs-dirty-bulk.html) 1건 더 비교표 중심 포맷으로 작성. **기존 페이지 전체 소급 적용은 여전히 미착수** — 다음 세션 이후 사용자와 우선순위 논의 필요(아래 새 항목 참고).
- [ ] **기존 페이지 GEO 포맷 소급 적용 우선순위 선정** — 지금까지 신규 페이지 2건(snacks, lean-bulk-vs-dirty-bulk)에만 비교표/체크리스트 포맷을 시범 적용함. 기존 96개 콘텐츠 페이지 전체를 손대는 건 비용이 크므로, 다음 세션엔 ①노출은 있지만 클릭이 없는 페이지 ②이미 순위가 붙어있어 개선 시 효과가 큰 페이지(MAF 클러스터, zone-2-heart-rate-by-age 등) 위주로 좁혀서 후보 추리는 작업부터 시작할 것.
- [ ] **이번 세션(07-17 2회차) 신규 3건의 노출/색인 반영 확인** — maf-training-plan.html, calorie-surplus-calculator.html, lean-bulk-vs-dirty-bulk.html 전부 당일 게시라 이번 서치콘솔 데이터엔 전혀 안 잡혀있음. 최소 1~2주 후 재확인.
- [ ] **MAF 클러스터 지속 투자 검토** — 이번 세션에 MAF 관련 쿼리들이 사이트 전체에서 가장 좋은 순위(12~40위대)를 보이는 걸 확인함. 다음 콘텐츠 확장 시 이 클러스터를 계속 우선 후보로 볼 것(예: "MAF vs 일반 조깅" 비교, "MAF 테스트 기록 해석법" 심화 등 — 단, 신규 페이지 만들기 전 중복확인 필수).
- [ ] **reverse.health 경쟁사 노트** — 이번 세션 조사 중 이 사이트가 "bulking calculator for women over 40", "steps to lose weight calculator", (07-13 세션에 발견) "menopause protein calculator"까지 최소 3개 카테고리에서 우리와 겹치는 걸 확인함. 여성 40+ 웰니스 계산기 분야의 잘 갖춰진 경쟁사로 인지하고, 향후 신규 후보 조사 시 이 사이트가 이미 선점했는지 우선 확인할 것.
- [ ] `waist-to-hip-ratio-calculator.html`, `vo2-max-calculator.html`, `active-recovery-calculator.html`, `calorie-deficit-calculator.html` 등 사이트맵엔 있지만 최근 3개월 서치콘솔 노출이 0인 페이지 다수 확인됨 — noindex/canonical 등 기술적 이슈는 없음을 확인함(정상, 페이지가 비교적 최근 것이거나 아직 크롤링/인덱싱 반영 전일 가능성 높음). **2026-07-15 세션에 추가로 확인**: `ffmi-vs-bmi.html`, `how-to-improve-vo2-max.html`, `calorie-deficit-how-much.html`도 같은 상태(0 노출) — 아래 세션 요약 참고.

---

## 2026-07-13 세션 요약

**작업 방식**: 사용자가 새 PAT 제공, 세션 내내 이어서 사용(revoke 신호 없었음).

**분석한 자료**: 서치콘솔 Coverage + Performance(최근 3개월, 2026-07-13 내보내기), GA4 보고서 개요(계정: GetSoloTools, 2026-06-15~07-12, 4주).

### 주요 발견
1. **여전히 조직검색 트래픽 극히 미미**: GA4 기준 최근 4주 신규 사용자 180명 중 Direct 162명, Organic Search 8명, Referral 6명, AI Assistant 2명(신규 채널로 처음 등장, 클로드/챗지피티 등에서의 유입으로 추정). 서치콘솔 기준 3개월 누적 클릭 6건, 평균 게재순위 약 60~70위대.
2. **활성 사용자 지역 분포가 다소 특이함**: 최근 4주 활성 사용자 중 싱가포르(105명)가 미국(23명)보다 압도적으로 많음 — Direct 트래픽 비중이 90%에 달하는 것과 맞물려 봇/테스트 트래픽 가능성 배제 못 함(광고 심사에 영향 줄 수 있어 참고만 해둠, 이번 세션엔 추가 조치 안 함).
3. **Coverage**: "발견됨-미색인" 2건 표시되지만 **유효성 검사 '통과'** 상태 — 구글이 이미 재크롤링해서 문제없음을 확인한 정상 항목. **이 항목은 사고가 아니고 앞으로 세션마다 재확인/재언급 불필요.** 중요하지 않은 문제 0건. 색인 생성된 페이지 수는 86건으로 안정적.
4. **키워드 기회 스캔 결과 — 새 콘텐츠 갭 없음**: 노출 상위 쿼리(예: protein intake calculator 222회, zone 2 heart rate 135회, fast calculator 74회 등) 전부 기존 페이지가 이미 타겟팅 중인 주제이며, 순위가 60~95위권으로 낮아 "콘텐츠가 없어서"가 아니라 "권위가 부족해서" 문제로 판단됨. 순위 20위 이내 노출 쿼리는 5개뿐(노출량 미미).
5. **후보로 거론됐던 "menopause protein calculator" 키워드 조사**: 웹서치 결과 Superpower(바이오마커 기업), reverse.health 등 기존 강한 도메인이 이미 선점 중이고, 검색량 자체도 적음(3개월 34회 노출). 이미 보유한 `protein-calculator-women-over-40.html`/`protein-needs-women-over-40.html`과 주제가 겹쳐 신규 페이지를 만들면 자기잠식(cannibalization) 우려. **결론: 신규 페이지 미작성.**
6. **교차 내부링크 반대 방향 확인 완료**: cookingcalcs-(meal-cost-calculator, weekly-meal-prep-cost-calculator)와 myinsurancecalc-(life-insurance, long-term-care-insurance) 4개 페이지 모두에 mywellnesscalc.com으로의 링크가 반영되어 있음을 GitHub API로 읽기 전용 확인(직접 수정 안 함, 확인만).
7. **뱃지 14일 규칙 적용**: `blog/index.html`의 2026-06-28일자 뱃지 4개(what-is-vo2-max, how-to-improve-vo2-max, calorie-deficit-how-much, fat-burning-heart-rate-zone) 14일 경과 확인 후 제거 완료.

### 이번 세션에 한 작업
- `blog/index.html`: 14일 경과 New/Updated 뱃지 4개 + 날짜 주석 제거
- `handover.md`: 이번 세션 내용 반영

### 이번 세션에 하지 않은 것 (의도적 보류)
- **신규 콘텐츠 작성 없음** — 위 5번 근거로 이번 세션엔 보류. 사이트 권위가 쌓이고(백링크/시간) 서치콘솔 게재순위가 개선되기 시작하면 그때 콘텐츠 확장을 다시 검토하는 게 ROI 관점에서 낫다고 판단.
- 기존 페이지 title/meta 수정 등 CTR 최적화 시도 안 함 — 노출 자체가 워낙 적어(대부분 쿼리 3개월 노출 <50회) 유의미한 신호로 보기 어렵다고 판단, 트래픽이 더 쌓인 후 재검토 권장.
- 사이트맵상 노출 0건 페이지들의 기술적 이슈는 확인만 하고(정상) 별도 수정 없음.

### 추가 정정 및 확인 (같은 날 대화 연장)

- **"백링크 부족" 진단 정정**: 사용자가 타사 백링크 체커로 확인한 결과 70개+ 백링크가 있고 계속 느는 중이라고 함. 백링크 수 자체는 문제가 아닌 것으로 보임. **더 유력한 원인은 도메인 나이** — 레포 첫 커밋이 2026-04-29로, 2026-07-13 기준 약 2.5개월 된 신생 도메인. 건강/피트니스 계산기처럼 경쟁이 심하고 YMYL에 가까운 카테고리는 백링크가 있어도 구글 신뢰 축적(“샌드박스”)에 시간이 걸리는 게 일반적 — 이게 저조한 순위의 더 설득력 있는 설명. (단, 70개 백링크 중 상당수가 canghun13 계정 소유의 자매 사이트발일 가능성은 미확인 — 다음에 백링크 리스트 받으면 교차 검증 가능)
- **애드센스 재신청 가능 여부 실측 확인**: 트래픽/조회수는 애드센스 공식 심사 기준이 아니며(웹서치로 확인), "가치없는 콘텐츠" 반려는 글자수(300~400단어 미만), 중복/복사 콘텐츠, 편집되지 않은 자동생성 콘텐츠가 핵심 기준. 사이트 실측 결과:
  - 블로그 글 표본 4개 분량: 2,236~4,444단어 (기준치 훨씬 상회)
  - 전체 101개 페이지 중 400단어 미만은 5개뿐이며, 그중 3개는 원래 짧아야 하는 페이지(구글 소유권 확인 파일, header/footer 부분 템플릿), 나머지 2개(contact.html 207단어, privacy-policy.html 352단어)도 통상적인 유틸리티 페이지라 문제 소지 낮음
  - 표본 4개 글의 h2/h3 목차가 전부 주제별로 고유함(템플릿 반복 아님) — 자동생성/복붙 콘텐츠로 보이는 패턴 없음
  - **결론(확정)**: 표본 글 본문을 직접 다시 읽어 확인 — 구체적 연구 인용(예: JAMA Network Open 2018년 12.2만명 코호트, 2022년 노르웨이 연구)과 메커니즘 설명이 포함된 실질적 콘텐츠로, 이전 반려 사유("가치없는 콘텐츠"의 전형: 빈약한 분량/복붙/편집 안 된 AI 텍스트)에 해당하지 않는다고 판단함. **재신청을 추천함.** 리스크 낮고(무료, 즉시 가능) 이전 반려 당시보다 명백히 개선된 상태.
- **이번에 업로드된 서치콘솔/GA4 데이터는 같은 날 앞서 분석한 데이터와 동일**(Coverage/Performance 파일 동일, GA4 기간도 동일하게 2026-06-15~07-12) — 새로운 신호 없음, 추가 분석/조치 없음.
- 뱃지 재확인: 2026-07-06자 5개, 2026-07-11자 1개 — 아직 14일 안 지남(07-20 전후 만료 예정), 이번엔 제거 대상 없음.

### 진짜로 찾아서 고친 보강 작업 (같은 날 대화 더 연장 — "정말 할 게 없냐"는 질문에 재점검해서 발견)

사용자가 "정말 보강할 거 없냐"고 재차 물어서, 메타디스크립션 누락/FAQ스키마 누락/고아 페이지 관점으로 다시 스캔함. 메타디스크립션·FAQ스키마는 누락 없었지만, **breadcrumb 링크 버그를 발견해서 수정함**:

- **문제**: `tools/*.html` 21개 페이지의 브레드크럼("Home › Calculators › [도구명]")에서 "Calculators"가 `tools/index.html`(실제 허브 페이지)이 아니라 홈페이지의 `#tools` 앵커(인라인 섹션)로 연결되고 있었음. BreadcrumbList 스키마의 URL도 동일하게 `https://mywellnesscalc.com/#tools`로 되어 있어 표시 링크와 스키마가 일관되게 잘못 연결된 상태였음. 결과적으로 `tools/index.html`로 향하는 내부링크가 사이트 전체에 사실상 없었음(nav바는 JS로 주입되는 `assets/partials/header.html`을 통해 `tools/`를 링크하고 있어 완전한 고아 페이지는 아니었지만, breadcrumb을 통한 링크 경로는 없었음).
- **수정**: 21개 파일 전부에서 표시 href(`../#tools` → `../tools/`)와 BreadcrumbList 스키마 URL(`.../#tools` → `.../tools/`) 둘 다 일괄 수정. JSON-LD 문법 깨짐 없음 확인함.
- 참고: 이런 종류의 "내부링크 배선 누락"은 앞으로도 체크리스트에 추가해서 볼 만함 — 신규 페이지 만들 때 breadcrumb의 상위 카테고리 링크가 실제 허브 페이지를 가리키는지 확인할 것.
---

## 2026-07-15 세션 요약

**작업 방식**: 사용자가 새 PAT 제공, 세션 내내 이어서 사용(revoke 신호 없었음). 사용자가 명시적으로 "대시보드/시각화 만들지 말고 텍스트로만 얘기해"라고 지시함 — 이번 세션엔 분석용 아티팩트/시각화 생성 안 함.

**분석한 자료**: 서치콘솔 Coverage + Performance(최근 3개월, 2026-07-15 내보내기).

### Coverage(색인 상태) 분석 — 사용자 지시사항과 실제 데이터의 차이

- 이번 내보내기의 "심각한 문제" CSV: **"크롤링됨-현재 색인이 생성되지 않음" 2건(유효성 검사: 시작됨)** + **"발견됨-현재 색인이 생성되지 않음" 2건(유효성 검사: 통과)** = 총 4건. 사용자는 이 중 "발견됨-미색인" 2건만 신경쓰면 된다고 지시함(보강 대상).
- **중요한 한계**: GSC 대량 내보내기 CSV(bulk export)는 문제 유형별 **집계 건수만 제공하고 개별 URL 목록은 포함하지 않음**. Search Console UI의 URL 검사 도구나 API 없이는 정확히 어떤 2개 페이지가 "발견됨-미색인"인지 이 데이터만으로 특정할 수 없음. 이 한계를 다음 세션에도 인지할 것 — 가능하면 사용자가 URL 검사 화면을 캡처해서 공유하면 훨씬 정확해짐.
- **대안으로 사용한 추정 방법**: 사이트맵 URL(98개) vs 서치콘솔 성과 데이터에 노출이 1건이라도 있는 URL을 비교해 "3개월간 노출 0건" 페이지 24개를 추출하고, git 커밋 로그로 최근 게시일을 대조함. "발견됨-미색인"은 보통 신규 도메인에서 크롤링 우선순위 문제로 발생하므로 **가장 최근에 추가됐으면서 노출 0건인 페이지**가 유력 후보로 판단:
  - 유력 후보: `blog/zone-2-training-plan.html`(07-11 게시, 4일차), `quiz/zone-2-fitness-level.html` / `quiz/recovery-type.html`(둘 다 07-07 게시, 8일차 — 같은 날 만든 3개 퀴즈 중 이 둘만 노출 0건, `quiz/muscle-building-starting-point.html`은 이미 노출 있음)
  - "크롤링됨-미색인"(품질 판단으로 제외됐을 가능성) 후보: `blog/ffmi-vs-bmi.html`(07-06, 9일차), `tools/vo2-max-calculator.html` / `blog/how-to-improve-vo2-max.html` / `blog/calorie-deficit-how-much.html`(07-29, 16일차) — 단 모두 실측 1700~2800단어로 콘텐츠 자체가 얇아서는 아닌 것으로 보임(내부 링크/크롤 우선순위 문제일 가능성이 더 높음)
- **결론(확정 아님, 추정)**: 정확한 URL 특정은 못 했지만, 공통적으로 이 후보 페이지들의 실제 문제는 **내부링크 부족**이었음 — 아래 보강 작업 참고.

### 보강(reinforcement) 작업 — 내부링크 배선 누락 발견 및 수정

동일 카테고리 페이지 간 상호링크를 점검하다가, **zone-2 클러스터와 recovery 클러스터의 블로그/툴 페이지들이 대응하는 퀴즈로 전혀 링크하지 않고 있던 것**을 발견함(홈페이지·quiz/index.html에서만 링크되고 있었고, 관련 콘텐츠 페이지 사이드바엔 전무). 아래 5개 파일에 `related-tools`/`related-list` 사이드바에 퀴즈 링크 추가:

| 수정 파일 | 추가한 링크 |
|---|---|
| `tools/active-recovery-calculator.html` | → `quiz/recovery-type.html` |
| `blog/active-recovery-heart-rate.html` | → `quiz/recovery-type.html` |
| `blog/zone-2-heart-rate-training-beginners.html` | → `quiz/zone-2-fitness-level.html` |
| `blog/how-to-improve-zone-2-fitness.html` | → `quiz/zone-2-fitness-level.html` |

div 밸런스 검증 완료(전부 OK). 참고: `muscle-building-starting-point.html`도 동일하게 2개 내부링크(홈+퀴즈허브)만 있었는데 노출이 있는 걸로 보아, 내부링크 개수 자체가 결정적 원인은 아닐 수 있음 — 그래도 관련 콘텐츠에서의 문맥적 내부링크는 항상 도움이 되므로 진행함. 다음 체크 때 이 4개 페이지의 색인/노출 변화를 지켜볼 것.

### 신규 콘텐츠 — 사용자 지시로 재개, 경쟁강도 조사 후 1건 작성

**배경**: 07-13 세션엔 "도메인 권위가 병목이니 신규 보류"로 결론냈으나, 이번 세션엔 사용자가 "확장 국면에 왔다"고 판단하여 신규 작성을 명시적으로 지시함. 지시에 따라 ①기존 파일과 중복 확인 ②웹서치로 키워드 경쟁강도 확인 ③수익화(애드센스 트래픽/클릭) 관점 우선순위로 진행.

**조사한 후보 3개와 결론**:
1. **Calorie Surplus / Bulk Calculator** (기존 `calorie-deficit-calculator.html`의 반대 축) — 웹서치 결과 traincalc, bitekit, monocalc, kaloria, procalculatorshub 등 5~6개의 전문 계산기 사이트가 이미 있으나 대형 브랜드(Healthline류)는 없어 **중간 강도**. 기각하진 않았지만 이번엔 보류, 다음 후보로 남겨둠.
2. **Creatine Dosage Calculator** (기존 creatine 블로그/퀴즈의 자연스러운 확장) — 웹서치 결과 Bodybuilding.com, BodySpec, FitnessVolt, ShreddedDad, CreatineInsider 등 **10개 이상의 전문 도구/권위 사이트**가 이미 선점 중. 신생 도메인엔 너무 경쟁이 강하다고 판단해 **기각**.
3. **High Protein Dinner Ideas for Women Over 40** — 웹서치 결과 경쟁이 소규모 영양 코치/레시피 블로그 위주로 **파편화**되어 있고 지배적인 대형 SEO 권위 사이트가 없음. 결정적으로, 이 클러스터(women-over-40 protein)의 breakfast 페이지가 **사이트 전체에서 실제 클릭이 발생하는 몇 안 되는 페이지 중 하나**(3개월 72노출, 1클릭, CTR 1.39%, 평균 게재순위 31위 — 대부분의 페이지가 50~95위인 것과 대조적으로 이미 실제로 순위권에 있음). breakfast/lunch는 있었지만 dinner가 없어 세트가 미완성이었음. **채택.**

**작업 내용**:
- `blog/high-protein-dinner-women-over-40.html` 신규 생성 (약 2,113단어, FAQ 5개, Article+BreadcrumbList+FAQPage 스키마, div 밸런스·FAQ-스키마 일치 검증 완료). 저녁 특유의 각도(수면 전 단백질과 야간 근단백질 합성, 취침 전 카세인 vs 일반 단백질, 저녁 탄수화물/혈당, 식욕이 낮을 때의 대안)로 breakfast/lunch와 콘텐츠 중복 없이 차별화함.
- 체크리스트 순서대로 배선 완료:
  - `blog/index.html` 최상단에 카드 추가 + New뱃지(`badge-added:2026-07-15`)
  - 홈 `index.html` 블로그 미리보기 3슬롯 중 가장 오래된 것(`what-is-ffmi.html`, 07-06자) 교체(빼도 blog/index.html·사이트맵엔 그대로 있어 고아 페이지 안 됨)
  - `sitemap.xml`에 추가(priority 0.7) + XML 유효성 검증 통과
  - `llms.txt`에 설명 추가
  - 역링크: `high-protein-breakfast-women-over-40.html`, `high-protein-lunch-women-over-40.html`, `protein-needs-women-over-40.html` 3개 기존 페이지 사이드바에 dinner 링크 추가(고립 방지)
- 전체 관련 파일 div 밸런스 재검증 완료(전부 OK), 링크 대상 파일 실존 여부 전수 확인 완료.

### 이번 세션에 하지 않은 것

- Coverage 문제의 정확한 URL 특정 — 위 한계 참고, bulk CSV로는 불가능. 다음 세션엔 가능하면 URL 검사 화면 캡처 요청할 것.
- `high-protein-snacks-women-over-40.html`(4종 세트 완성용) — 후보로 남겨둠, 이번엔 1건만 진행.
- GA4 데이터는 이번엔 첨부되지 않아 분석 안 함(서치콘솔만 분석). 다음 세션에 GA4도 같이 받으면 AdSense 재신청 판단 갱신 가능.

---

## 2026-07-17 세션 요약

**작업 방식**: 사용자가 새 PAT 제공, 세션 내내 이어서 사용(revoke 신호 없었음). 사용자가 명시적으로 대시보드/시각화 생성 금지, 텍스트 분석만 지시 — 이번 세션도 분석용 아티팩트/시각화 생성 안 함.

**분석한 자료**: 서치콘솔 Coverage + Performance(최근 3개월, 2026-07-17 내보내기). 07-15 내보내기와 2일 차이라 대부분 신호가 노이즈 수준이지만, 07-15 세션에 만든 dinner 페이지와 zone-2/recovery 내부링크 보강 효과를 참고삼아 훑어봄. GA4는 이번에도 미첨부.

### Coverage(색인 상태) — 변화 없음
"심각한 문제" 4건(크롤링됨-미색인 2건 시작됨 + 발견됨-미색인 2건 통과) — 07-15와 완전히 동일한 수치. 통과 상태인 "발견됨-미색인" 2건은 기존 결정대로 정상 범위로 판단하고 재언급하지 않음. 중요하지 않은 문제 0건.

### Performance 분석 — 새로운 콘텐츠 갭 있는지 재스캔

- 상위 노출 페이지/쿼리 재확인: 여전히 `protein-calculator.html`(2,320노출), `fat-burning-heart-rate-zone.html`(1,452노출) 등 대형 노출 페이지들이 순위 60~90위권에 머물러 있음 — 07-13/07-15 세션과 동일하게 "콘텐츠 부재"가 아니라 "권위/시간" 병목으로 재확인.
- **CTR 기회 스캔**: 페이지 단위로 노출 대비 순위를 재정렬해서 "이미 페이지 1~2에 가까운데 클릭이 안 나는" 케이스를 찾음. `zone-2-heart-rate-by-age.html`이 596노출/평균순위 10.1인데 CTR 0.17%(1클릭)로 유일하게 눈에 띄었으나, 쿼리 단위로 대조해보니 이 페이지와 직접 매치되는 개별 쿼리들은 전부 순위 50~85위대였음 — 즉 페이지 평균순위 10.1은 노출량이 적은 롱테일 쿼리 다수가 만든 통계적 착시(일부 쿼리는 실제로 페이지1 근접, 노출 큰 쿼리들은 여전히 하위권)로 판단, title/meta 수정으로 해결될 문제가 아니라고 결론 — 조치 안 함.
- **쿼리 1,000개 전체 스캔(코호트/호르몬/전해질/수면주기/1RM 등 20+ 키워드 그룹으로 매칭)**: 기존 클러스터(단백질, zone2, 비타민D, 체지방, IF, 수면, MAF, 1RM 등)를 벗어나는 새로운 수요 신호 없음. `menopause/perimenopause protein calculator`는 여전히 노출은 있으나(34~52회) 07-13 세션에 이미 경쟁강도/자기잠식 이유로 기각한 결론 유지.
- `tools/one-rep-max.html`의 "squat 1 rep max calculator" 계열 쿼리 변형(다수 확인됨)은 이미 title/description/FAQ에 squat이 명시적으로 다뤄지고 있어 별도 보강 불필요로 확인.

### 신규 콘텐츠 — women-over-40 protein 4종 세트 완성

**의사결정 근거(수익화 우선순위 기준)**: 사이트 전체에서 실제 클릭이 발생하는 페이지는 극소수인데, `high-protein-breakfast-women-over-40.html`(72노출/1클릭/CTR 1.39%/평균 31위)이 그중 하나로 확인되어 있었음(07-15 세션에 이미 파악). 07-15 세션에 dinner를 추가해 3종을 만들었고, 이번 세션엔 **①기존 파일 중복 확인 ②웹서치 경쟁강도 재확인 ③수익화 관점 우선순위**를 사용자 지시대로 적용해 남은 4번째(snacks)를 완성함.

- **중복 확인**: `high-protein-foods.html`, `protein-needs-women-over-40.html`, breakfast/lunch/dinner 3개 파일의 H2 목차를 전부 grep해서 대조 — snack 타이밍/휴대성/라벨읽기 앵글은 기존 어디에도 없음을 확인 후 진행.
- **경쟁강도 웹서치**: "high protein snacks women over 40" 계열 검색 결과, AOL 신디케이션 매체(Prevention/EatingWell/Women's Health/TODAY 재게시), 개인 코치 블로그(purposefulhealingdpc, midlifeprotein, oldladygains, tracidmitchell) 위주로 파편화 — 대형 전문 계산기/툴 사이트의 지배 없음. breakfast/lunch/dinner 3개와 동일한 경쟁 패턴 확인, 채택.
- **GEO(생성형 엔진 최적화) 리서치 반영**: 사용자가 언급한 "AI검색은 도메인 권위보다 콘텐츠 자체가 중요하다"는 주장을 웹서치로 확인 — **정확히는 "권위가 안 중요해진다"가 아니라, 전통 SEO와 마찬가지로 E-E-A-T·권위 신호는 여전히 유효하되, 여기에 더해 구조적 명확성(direct-answer 포맷, 섹션별 독립적 요약, 스캔 가능한 비교/표 형태)과 원본성이 상대적으로 더 크게 반영된다는 것이 2026년 다수 소스의 공통된 결론**임. 이를 반영해 이번 신규 페이지엔 breakfast/lunch/dinner 3개엔 없었던 **①12개 간식 비교표(스캔 가능한 quick-reference 표) ②"단백질 스낵바가 진짜인지 가려내는 법" 문제해결형 체크리스트 섹션**을 처음 도입함 — 콘텐츠 자체의 실용적 문제해결 밀도를 높이는 방향.

**작업 내용**:
- `blog/high-protein-snacks-women-over-40.html` 신규 생성 (약 1,836단어, FAQ 6개, Article+BreadcrumbList+FAQPage 스키마, div 밸런스·중첩순서·FAQ-스키마 일치·테이블 wrapper 패턴 전부 검증 완료).
- 체크리스트 순서대로 배선 완료:
  - `blog/index.html` 최상단에 카드 추가 + New뱃지(`badge-added:2026-07-17`)
  - 홈 `index.html` 블로그 미리보기 3슬롯 중 가장 오래된 것(`ffmi-vs-bmi.html`, 07-06자) 교체(빼도 blog/index.html·사이트맵엔 그대로 있어 고아 페이지 안 됨)
  - `sitemap.xml`에 추가(priority 0.7) + XML 유효성 검증 통과
  - `llms.txt`에 설명 추가
  - 역링크: `high-protein-breakfast-women-over-40.html`, `high-protein-lunch-women-over-40.html`, `high-protein-dinner-women-over-40.html`, `protein-needs-women-over-40.html` **4개 전부**의 사이드바에 snacks 링크 추가 — 이로써 4종 세트가 완전 상호연결됨(모든 페이지에서 다른 3개로 링크).
- 영향받은 7개 파일(신규 1개 + 사이드바 수정 4개 + blog/index.html + index.html) 전부 div 밸런스/중첩순서 재검증 완료(전부 OK), 전체 링크 대상 파일 실존 여부 전수 확인 완료.
- 커밋 해시 `036daab`, GitHub API로 push 반영 확인 완료.

### 이번 세션에 하지 않은 것

- **기존 47개 페이지에 GEO 포맷(비교표/문제해결형 체크리스트) 소급 적용** — 이번엔 신규 페이지 1건에만 시범 적용. 전체 소급은 범위가 크고, 페이지마다 어떤 섹션이 비교/문제해결 형태로 바꿀 가치가 있는지 개별 판단이 필요해 다음 세션 이후 사용자와 우선순위 논의 후 진행 권장.
- **calorie-surplus-calculator 착수** — 위 "다음에 할 만한 것" 항목 참고, 이번 세션엔 서치콘솔 수요 신호가 약해 순위를 내림. 착수 안 함.
- **CTR 최적화(title/meta 수정)** — `zone-2-heart-rate-by-age.html` 등 재검토했으나 위 분석대로 통계적 착시로 판단해 조치 안 함.
- Coverage 미색인 2건의 정확한 URL 특정 — 여전히 bulk CSV 한계로 불가(07-15 세션과 동일한 제약).
- GA4 데이터 미첨부로 AdSense 재신청 판단 갱신 안 함.

---

## 2026-07-17 세션 2회차 요약 (같은 날 대화 연장 — 사용자가 신규 확장 가속 지시)

**배경**: 1회차 세션(위 요약)에서 신규 1건(snacks) 작성 후, 사용자가 "신규가 너무 적다, 최대한 빠르게 확장해라, 카테고리를 넓혀도 된다, 경쟁 센 키워드는 좋은 롱테일로 선점하고 중간 경쟁도는 그냥 좋은 키워드로 진행해도 된다"고 명시적으로 지시함. 이에 따라 리서치 강도를 낮추고 실행 속도를 높여 신규 3건(블로그 2 + 툴 1)을 추가로 작성.

### 후보 리서치 — 여러 후보 기각 후 확정한 3건

사용자 지시대로 카테고리를 넓혀서 다수의 후보를 웹서치로 조사함. **2026년 현재 건강/피트니스 계산기 분야가 예상보다 훨씬 포화 상태**라는 걸 이번에 재확인함 — 아래는 조사했지만 기각한 후보와 사유:

| 후보 | 기각 사유 |
|---|---|
| Caffeine cutoff calculator (카페인 컷오프 계산기) | 웹서치 결과 fatcalc/thinksera/calculory/sleep.report/jitterliss/nightowlsleepcalc/lastsip 등 **8개 이상의 전용 계산기/앱**이 이미 존재 — 니치처럼 보이지만 실제로 2026년 AI 생성 계산기 사이트들이 이미 많이 선점한 분야로 확인 |
| Resting heart rate calculator/chart (안정시 심박수) | Cleveland Clinic, Mayo Clinic(피인용), Forbes Health, MedicineNet 등 **대형 의료기관/매체가 지배** — 의학적(서맥/빈맥) 판단과 가까워 YMYL 리스크도 있어 기각 |
| 4-Week strength training program for women over 40 | PureGym, Women's Health(전담 트레이너 프로그램), Muscle & Strength, 심지어 Gumroad 유료 PDF까지 **이미 매우 많이 다뤄진 포맷** — zone-2-training-plan 성공 포맷을 그대로 재현하려 했으나 이 특정 조합은 이미 포화 확인 |
| Perimenopause insomnia / "can't sleep women 40s" | Midi Health(여성건강 전문 원격의료 기업), Stanford Lifestyle Medicine, oova.life 등 **자격을 갖춘 의료/헬스테크 기업이 지배** — 의학적 조언 영역과 가까워 무명 브랜드 사이트가 다루기엔 리스크 대비 효과가 낮다고 판단해 기각 |
| Bulking calculator "for women over 40" (인구통계 특정 앵글) | reverse.health가 정확히 이 키워드로 이미 전용 계산기 보유(웹서치로 확인) — 정면충돌 대신 성별/연령 비특정 일반 버전으로 방향 전환 |

**확정한 3건과 근거**:
1. **`blog/maf-training-plan.html`** — 이번 세션 서치콘솔 재분석 중 MAF 관련 쿼리들이 사이트 전체에서 가장 좋은 순위를 보이는 걸 발견함(예: "maf 180 calculator" 순위 12.75, "maf training plan" 순위 29.2, "maf training" 순위 33.43 — 대부분 페이지가 50~95위인 것과 뚜렷하게 대조적). 이미 검증된 성공 포맷(zone-2-training-plan.html: 개념 가이드에 "구체적 주차별 실행 스케줄"을 추가해 성공)을 MAF 클러스터에 동일 적용. 경쟁강도 웹서치 결과 "MAF training plan" 자체는 포럼/개인블로그/러닝매거진 수준으로 파편화되어 있어 확실한 저경쟁으로 확인.
2. **`tools/calorie-surplus-calculator.html`** — 기존 calorie-deficit-calculator.html의 반대축으로 자사 계산기 세트를 완성하는 실사용 가치가 있음. 경쟁강도는 예상보다 셈(전문 계산기 사이트 6~7개+)을 재확인했지만, 사용자가 이번에 "중간 경쟁도는 좋은 키워드로 그냥 진행해도 된다"고 명시적으로 승인한 기준에 부합해 진행. 차별화 요소로 "트레이닝 경력"(초보/중급/고급)에 따른 권장 서플러스 크기 제시 기능을 추가함(경쟁사 리서치에서 확인한 실제 유효 패턴 반영).
3. **`blog/lean-bulk-vs-dirty-bulk.html`** — surplus 계산기의 컴패니언 콘텐츠. 사용자 지시(AI검색엔 비교분석형 콘텐츠가 유리) 반영해 처음부터 비교표 중심으로 설계, 툴 페이지의 "계산 방법" 콘텐츠와 겹치지 않게 "어느 쪽이 실제로 나은가" 의사결정 앵글로 차별화.

### 작업 내용 요약

- 3건 모두 기존 파일과 H2 목차 대조로 중복 확인 완료(특히 build-muscle-after-40.html/zone-2 클러스터/maf-training-for-beginners.html과 겹치는 섹션 없음 확인).
- `tools/calorie-surplus-calculator.html`은 검증된 `calorie-deficit-calculator.html` 아키텍처를 그대로 재사용(Mifflin-St Jeor BMR + 7700kcal/kg 공식) — 새 계산 로직을 처음부터 짜지 않고 기존 패턴을 재사용해 버그 리스크를 최소화함. JS 계산 결과를 수동으로 트레이스해서(예: 여성 65kg/165cm/30세/중간활동/0.35kg주간증가 → TDEE 2124, 목표 2509kcal, 26주 — 상식적으로 타당) 정합성 확인.
- 3건 전부 div 밸런스·중첩순서(특히 side-col/article-sidebar가 형제 관계인지)·FAQ-스키마 일치 검증 완료.
- 체크리스트(허브 페이지 카드+뱃지, 홈 미리보기 교체, sitemap.xml, llms.txt, 역링크) 3건 전부 완료 — 영향받은 파일 총 9개, 전부 재검증 완료(OK), 링크 대상 파일 실존 여부 전수 확인 완료.
- 커밋 해시: `768a5f1`(MAF plan), `ba0f920`(surplus calculator + lean-bulk-vs-dirty-bulk) — 둘 다 GitHub API로 push 반영 확인 완료.

### 이번에 조사했지만 기각한 후보 (7건, 07-17 세션 통틀어)

| 후보 | 기각 사유 |
|---|---|
| Caffeine cutoff calculator | 8개+ 전용 계산기/앱 이미 존재 |
| Resting heart rate calculator/chart | Cleveland Clinic/Mayo Clinic 등 대형 의료기관 지배 + YMYL 리스크 |
| 4-Week strength program for women over 40 | PureGym/Women's Health/Muscle&Strength 등 이미 매우 많이 다뤄짐 |
| Perimenopause insomnia | Midi Health 등 자격있는 의료/헬스테크 기업 지배 |
| **Grip strength calculator by age** | topendsports/gymcreek/handexer/completecalculators×2/betterlifefitness/getfitcalc 등 **7개+** 전용 계산기 존재 |
| **Alcohol calories calculator** | missvickie/miniwebtool/fitmetriclab/WCRF(대형 비영리단체)/abvcalculator/quickalcoholmath/basicfreetools 등 **7개+** 존재 |
| **Cold plunge duration guide** | Plunge/BodyKore/StrengthWarehouse/RenuTherapy/NorthernSaunas/IVLeague 등 **8개+** 존재 — 콜드플런지 욕조 판매업체들이 제품판매 목적으로 SEO 강하게 투자해놓은 상태 |

**결론(중요, 다음 세션에도 참고할 것)**: 사용자 지시로 GSC를 배제하고 순수 웹서치 브레인스토밍만으로 7개 카테고리를 조사했는데 **전부 일관되게 5~8개 이상의 경쟁자가 이미 있었음**. 이 정도로 일관된 결과면 "운이 나빴다"가 아니라 **2026년 현재 웰니스 계산기/가이드 콘텐츠 시장 자체가 구조적으로 포화 상태**라고 봐야 함 — 특정 니치를 잘못 골라서가 아니라, 이 카테고리(수치 계산 + 일반 가이드형 콘텐츠)는 어떤 주제를 고르든 이미 누군가 있을 확률이 매우 높은 시장 환경. **완전히 새로운 카테고리에서 "아무도 안 다룬 것" 찾기보다는, 오늘 실제로 통했던 방식(MAF처럼 자사 사이트가 이미 부분적 강점을 가진 곳을 깊게 파고들거나, women-over-40 protein처럼 두 개 이상의 구체적 조건을 조합한 롱테일)이 훨씬 승산 높음.** 이번엔 억지로 발행하지 않고 여기서 신규 작업 중단.

**⚠️ 추가 검증 (같은 날 대화 연장 — 사용자가 "헤드텀만 보고 포기한 거 아니냐"고 재차 지적, 타당한 지적이었음)**: 위 7개 중 3개(악력/콜드플런지/알코올)에 대해 헤드텀이 아니라 실제로 **롱테일 조합**을 시도해서 재검증함:
- "grip strength **women over 40**" — 여전히 8개+ (Ubie Health, Cleveland Clinic, **Superpower**(menopause protein calculator에서도 나왔던 반복 경쟁사), performanceover40.com 등). 게다가 사망률/골감소증 등 임상적 프레이밍이 강해 의료 리스크도 있음.
- "cold plunge **vs active recovery**"(기존 active-recovery 클러스터와 연결 시도) — 이미 직접 다룬 콘텐츠 존재(Havok Journal 등), 콜드플런지 욕조 판매회사(Coldture/Plungechill/Iceology)들이 지배.
- "alcohol **and calorie deficit**"(기존 calorie-deficit 클러스터와 연결 시도) — 셋 중 제일 진입장벽 낮음(대형 의료기관보다 RippedBody 등 소형 피트니스 블로그 위주)이지만 그래도 8개+가 이미 "알코올이 지방연소를 일시정지시킨다"는 동일한 핵심 논리로 선점, 추가할 차별화 앵글을 못 찾음.
- **결론**: 롱테일 조합을 실제로 시도하는 방법론 자체는 계속 기본으로 유지해야 하지만(사용자 지적이 맞았음), 이 3개 특정 조합은 롱테일로도 여전히 막혀있음을 확인. 무리하게 발행하지 않고 최종적으로 신규 작업 중단.

### 조사 중 얻은 추가 인사이트 (다음 세션에도 참고할 것)

1. **성공 패턴 재확인**: ①실제 서치콘솔에서 이미 좋은 신호(노출·순위·클릭)가 있는 기존 클러스터를 우선 확장(MAF, women-over-40 protein이 이번에도 통함) ②"개념 설명형" 콘텐츠가 있는 클러스터엔 "구체적 실행 플랜/스케줄" 포맷을 추가하는 게 반복적으로 유효함(zone-2 성공 → MAF에도 동일 적용 성공적으로 재현) ③의료 진단에 가까운 주제(안정시 심박수, 불면증 등)는 대형 의료기관이 지배하고 있어 무명 브랜드 사이트에겐 리스크 대비 효과가 낮음.
2. **reverse.health를 경쟁사로 명확히 인지할 것** — women-over-40 웰니스 계산기 분야에서 최소 3개 카테고리(menopause protein calculator, bulking calculator for women over 40, steps to lose weight calculator)에서 이미 우리와 겹치는 걸 확인함. 다음에 "women over 40" 앵글의 신규 후보를 볼 때 이 사이트가 이미 있는지 우선 확인.
