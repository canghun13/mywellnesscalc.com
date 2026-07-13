# MyWellnessCalc 작업 인수인계
> 최종 업데이트: 2026-07-13

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

## 현재 사이트 현황 (2026-07-11 기준)

- **툴 25개, 블로그 46개**(zone-2-training-plan.html 신규 추가로 +1), **퀴즈 20개**
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

## 다음에 할 만한 것 (우선순위 없이 나열, 데이터 보고 판단)

- [ ] 다음 서치콘솔 체크(1~2주 후 권장, 2026-07-13 기준 다음 체크는 07-20 이후 권장)에서 이번 세션 포함 최근 최적화/보강/버그수정 효과 확인
- [ ] AdSense 재신청 여부는 트래픽 데이터 보고 판단 (2026-07-13 기준 여전히 이르다고 판단 — 조직 검색 신규 사용자 4주간 8명, 클릭 6건 수준)
- [ ] **신규 콘텐츠는 당분간 보류 권장** — 2026-07-13 세션에서 검토했으나, 사이트의 병목은 콘텐츠 커버리지가 아니라 도메인 권위/백링크로 판단됨(아래 세션 요약 참고). 노출은 있지만 클릭 전환이 거의 없는 상황이라 신규 페이지보다 기존 페이지의 권위 축적(백링크, 시간 경과)이 우선.
- [ ] `waist-to-hip-ratio-calculator.html`, `vo2-max-calculator.html`, `active-recovery-calculator.html`, `calorie-deficit-calculator.html` 등 사이트맵엔 있지만 최근 3개월 서치콘솔 노출이 0인 페이지 다수 확인됨 — noindex/canonical 등 기술적 이슈는 없음을 확인함(정상, 페이지가 비교적 최근 것이거나 아직 크롤링/인덱싱 반영 전일 가능성 높음).

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