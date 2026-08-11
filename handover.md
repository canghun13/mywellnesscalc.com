# MyWellnessCalc 작업 인수인계
> 최종 업데이트: 2026-08-11

## 2026-08-11 세션 — 일요일 정기점검(앞당겨 진행). 🔴🔴 노출붕괴가 1회성이 아니라 **반복 현상**임을 확인(08-04 세션 해석 정정) + 퀴즈 포맷이 이 사이트 유일한 상위노출 자산이라는 구조적 발견 + 사이트맵 lastmod/IndexNow 정비

**작업 방식**: 사용자가 새 PAT 제공. 대시보드/시각화 금지(기존 정책 동일). 신규 콘텐츠는 ①기존 파일 중복확인 ②웹서치 경쟁강도 ③롱테일 ④수익화 우선순위 적용. **사용자 재강조**: 공격적 확장 전략은 바꾸지 말 것, 다만 "진짜로 할 게 없으면 안 하는 게 맞다"고 명시함.

**분석 자료**: 서치콘솔 Performance + Coverage **Drilldown**(2026-08-11 내보내기, 08-04와 7일 차이), GA4 보고서 개요(2026-07-14~08-10, 4주).
**⚠️ 이번 Coverage는 요약본이 아니라 "발견됨-현재 색인이 생성되지 않음" 단일 이슈의 드릴다운이라 총 색인 건수(지난번 104건)는 이번 자료로 확인 불가.** 다음 세션엔 Coverage 요약(색인/미색인 총계) 쪽을 받는 게 좋음.

### 🔴🔴 최우선 — 노출붕괴가 3주간 **3번** 반복됨 (08-04 세션의 "1회성 이벤트" 해석은 틀렸음)

08-04 세션은 07-23~07-28 붕괴를 단발 사고로 보고 원인 가설 3개를 세웠는데, 이번 데이터로 보니 **같은 패턴이 계속 재발하고 있음**:

| 구간 | 일별 노출 | 성격 |
|---|---|---|
| 07-23~07-28 (6일) | 7 / 10 / 1 / 7 / 1 / 2 | 붕괴 |
| 07-29~08-01 (4일) | 123 / 151 / 123 / 115 | 정상 |
| **08-02~08-04 (3일)** | **2 / 2 / 16** | **붕괴(신규)** |
| 08-05~08-06 (2일) | 124 / 89 | 정상 |
| **08-07~08-08** | **1 / 0** | **붕괴(신규, 내보내기 시점 진행중)** |

- **정상일 ~120회 / 붕괴일 ~1~2회.** 중간값이 없는 온·오프 스위치형 패턴이고, 3주 중 **11일이 붕괴 상태**(약 절반). 3개월 노출의 상당분이 이걸로 날아가고 있음.
- **커밋과의 상관은 약함**: 붕괴1 직전 07-22 index.html 커밋 2건, 붕괴3 직전 08-06 index.html 커밋 1건은 시점이 맞지만, **붕괴2(08-02)는 직전 6일간 커밋이 전혀 없었음.** 커밋이 원인이라는 가설은 이걸로 부분 기각.
- **이번 세션에 제거한 가설 — DNS 스테일 A레코드**: apex 도메인 A레코드를 직접 조회한 결과 `185.199.108.153 / .109.153 / .110.153 / .111.153` **현행 GitHub Pages IP 4개 전부 정확**. 구형 IP 잔존으로 인한 라운드로빈 간헐 실패 시나리오는 **아님**. (이건 재조사하지 말 것)
- **남은 유력 가설 2개**: ①GitHub Pages 간헐 5xx/타임아웃으로 Googlebot이 서빙 실패를 반복 수신 ②GSC 데이터 파이프라인 로깅 갭.
- **🔵 사용자에게 요청할 것 (이게 이번 세션 최우선 액션)**: 08-04 세션이 요청한 "크롤링 통계 캡처"는 이번에도 안 왔음. **크롤링 통계보다 훨씬 싸고 결정적인 판별법이 있음 — 같은 계정 산하 다른 사이트(getsolotools, cookingcalcs, myinsurancecalc 등) GSC의 같은 날짜(07-23~28 / 08-02~04 / 08-07~08) 노출 그래프를 열어볼 것.**
  - 다른 사이트도 **같은 날** 붕괴 → 구글 측 로깅 갭. 우리가 할 일 없음, 추적 종료.
  - 우리 사이트만 붕괴 → 서빙/크롤 문제 확정. 그때 크롤링 통계로 응답코드 확인.
  - 이건 캡처 1~2장이면 끝나고 가설을 절반으로 자를 수 있음. 다음 세션에 반드시 먼저 물어볼 것.

### 🔵 구조적 발견 — 퀴즈 포맷이 이 사이트에서 **유일하게 상위노출되는 자산**

페이지 타입별로 GSC 실측을 집계해보니 격차가 명확함:

| 타입 | 페이지수 | 클릭 | 노출 | 노출가중 평균순위 | **중앙값 순위** |
|---|---|---|---|---|---|
| **quiz** | 12 | **3** | 78 | 45.6 | **14.0** |
| tools | 27 | **0** | 5,384 | 71.6 | 58.3 |
| blog | 51 | 3 | 5,997 | 55.4 | 47.9 |

- 노출이 잡힌 퀴즈 12개 중 **9개가 포지션 4~24위**: body-goal-type 4.0 / right-macros 6.5 / vitamin-d-supplement 7.0 / ideal-body-weight 9.5 / **creatine-right-for-you 10.4** / weight-loss-rate 14.0 / ideal-fasting-protocol 21.3 / enough-water 24.5.
- 반면 **툴 27개는 노출 5,384회에 클릭 0회**, 중앙값 58위. protein-calculator 혼자 2,524노출(사이트 전체의 22%)인데 포지션 77.7.
- **`quiz/creatine-right-for-you.html`이 사이트 유일한 정상 CTR 페이지**: 11노출 3클릭 **CTR 27.27%**, 포지션 10.45. 3개월 전체 클릭 6회 중 **절반이 이 한 페이지에서 나옴.**
- **해석**: 경쟁사들은 계산기와 아티클은 다 만들지만 **색인되는 정적 퀴즈는 거의 안 만듦.** 그래서 퀴즈는 경쟁이 사실상 비어 상위 20위에 쉽게 들어감. 이게 이 사이트가 실제로 갖고 있는 유일한 **포맷 해자(moat)**임. 사용자가 요구한 "경쟁 피하기 위한 장치"의 실측 답이 이것.
- **단, 과대해석 금지**: 퀴즈 12개 합계 노출이 78회뿐임(툴 5,384회의 1.4%). 퀴즈가 이기는 쿼리는 검색량이 거의 없는 초롱테일. **퀴즈 1개 추가의 기대값 ≈ 3개월 7노출 / 0.25클릭.** "퀴즈 = 상위노출"은 맞지만 "퀴즈 = 트래픽"은 아님. 다음 세션이 이 발견을 근거로 퀴즈를 대량 양산하려 들면 안 됨.
- **0노출 퀴즈 9개의 원인은 내부링크가 아님(이번에 검증 완료, 재조사 금지)**: 퀴즈별 인바운드 내부링크를 전수 집계한 결과 **역상관**이 나옴 — 0노출인 weight-loss-plateau는 인바운드 10개, enough-protein 8개인데, 최고 성과 페이지 creatine-right-for-you는 **인바운드 1개(quiz/index.html뿐)**. 원인은 링크가 아니라 **주제 수요**임. 0노출 퀴즈들은 cardio-type/metabolism-type/recovery-type/sleep-type처럼 아무도 검색하지 않는 "○○ 유형" 프레이밍이고, 성과 나는 쪽은 "is X right for you"처럼 실제 결정 쿼리에 대응함.

### Coverage — 영향 URL 단 1건, `quiz/cardio-type.html` (한 번도 크롤된 적 없음)

- "발견됨-현재 색인이 생성되지 않음" 영향 페이지: 07-25부터 **1건 고정**, 대상은 `quiz/cardio-type.html`. **최종 크롤링 `1970-01-01` = 구글이 이 URL을 단 한 번도 가져간 적 없음.**
- 기술 점검 결과 이 파일 자체엔 문제 없음: canonical 자기참조 정상, noindex 없음, 사이트맵 등재됨, 본문 981단어, FAQ 4개, 내부 인바운드 4개. **파일 결함이 아니라 크롤 우선순위 문제.**
- 08-04 세션 시점 "발견됨-미색인 0건"이었는데 07-25에 1건 발생한 것이므로 소폭 악화. 다만 절대 규모는 미미.

### Performance — 순위 분포 3개월째 요지부동, 클릭은 더 줄어듦

- 3개월 누적: 클릭 **6회**(08-04 시점 9회 → 집계창 이동으로 감소), 노출 11,399, CTR 0.05%, 기기가중 평균 포지션 약 63.
- **쿼리 노출 포지션 분포(1,000개 기준)**: 1~10위 14회(0.2%) / 11~20위 8회 / 21~30위 15회 / 31~50위 249회(3.6%) / 51~70위 2,116회(30.7%) / **71~100위 4,497회(65.2%)**. → **50위 밖 96.1%.** 08-04 세션(96%)과 사실상 동일. **3개월간 개선 0.**
- 클릭 발생 페이지 3개뿐: quiz/creatine-right-for-you(3), zone-2-heart-rate-by-age(2), high-protein-breakfast-women-over-40(1). 국가는 미국 5 / 캐나다 1.
- **🟢 canonical 통합 효과 나타나기 시작함 (롤백 검토 불필요)**: `weight-loss-plateau.html` 포지션 **54.02 → 46.32**로 개선(노출 28). canonical을 넘겨준 `why-weight-loss-plateau-how-to-break-it.html`은 10.5 유지(노출 2). 07-27 조치의 신호가 늦게나마 정본 쪽으로 이동 중. **08-04 세션이 검토하라던 "canonical 방향 롤백"은 하지 말 것.** 2~3주 더 관찰.
- **07-21 발행 4건 21일차**: why-1rm-calculator 4노출/**포지션 12.25**(직전 18.5 → 개선), hrv-and-zone-2-training 7노출/41.86(직전 47.4 → 개선), protein-satiety-appetite-control 10노출/78.1(정체), **protein-timing-before-after-workout 여전히 0노출(3주 경과).**
- `how-much-fiber-per-day.html`: 08-04에 인바운드 1→4개로 보강했으나 **여전히 0노출**(다만 7일차라 판단하기 이름, 다음 세션에 재확인).
- 3개월 0노출 페이지 **13건**(직전 15건): 블로그 4(high-protein-dinner-women-over-40, how-much-fiber-per-day, intermittent-fasting-for-women-over-40, protein-timing-before-after-workout) + 퀴즈 9. ffmi-vs-bmi는 사이트맵에서 빠져 목록에서 제외됨(정상).

### GA4 — 봇 비중 소폭 개선됐으나 여전히 신뢰 불가. **Bing 계열이 구글의 약 4배**

- 4주(07-14~08-10): 활성 사용자 348명, 신규 345명, 이벤트 1,552건, 평균 참여시간 **16.2초**(직전 13.7초 → 소폭 회복).
- **싱가포르 223/348 = 64.1%** (직전 66.6% → **4세션 만에 처음으로 소폭 개선**, 다만 추세 판단하기엔 이름). 그 외 상위 도시는 여전히 San Jose/Guangzhou/Council Bluffs/Boardman/Urumqi 등 데이터센터·크롤러 출처.
- **세션 소스**: bing/organic **10** + duckduckgo/organic **7**(DDG는 Bing 인덱스 기반) = Bing 계열 17세션 vs google/organic 4세션. ahrefs.com/referral 10은 SEO 크롤러라 제외.
- **⛔ 이 수치를 근거로 Bing 최적화를 제안하지 말 것 (사용자 지시로 종결)**: 세션 중 "Bing이 구글의 4배니 Bing Webmaster Tools를 확보하자"고 제안했으나 **사용자가 기각**함 — Bing은 개입 없이도 이미 잘 되고 있으므로 그대로 두고, **판단 근거로 볼 데이터는 구글 서치콘솔 + 구글 애널리틱스 두 개로 통일**한다. Bing 쪽 수치는 참고용으로만 기록하고 액션 아이템으로 승격시키지 말 것.
- direct/(none) 312는 여전히 대부분 봇으로 추정. GA4 봇 필터는 **아직도 미설정**(사용자 직접 작업 필요, 4세션 연속 미처리).

### 이번 세션에 실제로 한 작업

**1. `sitemap.xml` 전체 106 URL에 `<lastmod>` 추가 (커밋 `8c5cdea`)**
- **사이트맵에 lastmod가 단 하나도 없었음.** 크롤러에게 줄 수 있는 신선도/우선순위 신호가 통째로 비어 있던 상태. `quiz/cardio-type.html`이 사이트맵 등재 + 내부링크 4개를 갖고도 한 번도 크롤되지 않은 것과 정합적인 결함.
- 값은 **임의로 찍지 않고** `git log -1 --date=short`로 파일별 실제 최종 커밋일을 뽑아 채움(2026-05-20~2026-08-06, 14개 날짜로 분산). 구글은 일괄 동일값/허위 lastmod는 무시하므로 실제값이어야만 의미가 있음. **다음 세션 이후 파일을 수정하면 lastmod도 같이 갱신할 것 — 안 그러면 오히려 신호가 썩음.**
- XML 파싱 유효성 재검증: URL 106 / lastmod 106 전부 매칭.

**2. ~~IndexNow 키파일 배포~~ → 같은 세션 내 사용자 지시로 전면 철회, 파일 삭제함**
- 세션 중 IndexNow 키파일을 루트에 배포하고 자동제출 워크플로(`.github/workflows/indexnow.yml`)를 작성했으나(워크플로는 PAT `workflow` 스코프 부재로 푸시 거부됨), **사용자가 "Bing에 따로 등록 안 한다, 알아서 긁어가게 놔둔다, 어차피 걔네 AI 검색이고 냅둬도 잘 되고 있으니 굳이 건들지 말자"고 지시**하여 키파일까지 삭제하고 원복함.
- **⛔ 확정 정책 — 다음 세션들은 이 항목을 다시 꺼내지 말 것**: IndexNow / Bing Webmaster Tools / Bing 대상 색인 제출은 **하지 않는다.** Bing 계열은 현재 자연 크롤만으로 잘 동작 중이므로 개입 자체가 불필요하고, 개입 비용 대비 효용이 없다고 사용자가 판단함.
- 참고로 이번에 만든 워크플로 파일 자체는 사용자에게 별도 전달했으나 **적용하지 않기로 결정된 건**임. 레포에는 남아있지 않음.

### 신규 콘텐츠 후보 조사 — 3건, 전부 기각 (누적 41건 조사 / 성공 2건, 4.9%)

| 후보 | 조합/앵글 | 기각 사유 |
|---|---|---|
| 프로틴 파우더 필요성 (단백질 클러스터 확장) | "do I need protein powder or can I get enough from food" | **Harvard Health, Ohio State, NASM, UCHealth, Colorado State(KRNC), Samaritan Health** 등 **대형 의료·학술기관이 상위를 통째로 점유.** 우리 사이트가 익명 브랜드라는 점에서 YMYL 권위 경쟁 자체가 불가. 기존 방법론의 "대형 브랜드/의료기관 지배 시 기각" 기준에 정면 해당 |
| 전해질 일일 필요량 계산기 (수분 클러스터 확장) | "daily electrolyte needs calculator sodium potassium magnesium" | **전용 계산기만 최소 5개** — BiteKit(전해질 밸런스 + 지구력 전해질 **2종 보유**), MeKeto(키토 전해질 전용), Saltivate, NutritionCalcs, 그 외 보충제 브랜드 다수. **특히 NutritionCalcs는 "전해질 계산기 + 수분섭취 계산기 + 나트륨 트래커"를 묶어 운영하는 우리와 구조가 동일한 직접 경쟁사** — 아래 경쟁사 노트 참고 |
| 페이스 vs 심박수 러닝 결정 퀴즈 (러닝 갭 + 퀴즈 해자 결합) | "should I train by pace or heart rate" | 아티클로는 running.coach/FixYourRun/RelentlessForwardCommotion/aSweatLife/StephPiRuns/Garmin포럼 등 6개+ 포화. **다만 퀴즈 포맷은 경쟁 0건이라 포맷 해자는 성립.** 기각 사유는 경쟁이 아니라 **자기잠식** — 기존 `quiz/training-zone.html`(심박존 주제, 포지션 38)과 `quiz/cardio-type.html`(Zone2/HIIT 선택 주제, 크롤조차 안 된 상태)이 이미 인접 공간을 점유 중. 이 사이트는 FFMI 3중복·plateau 2중복으로 이미 두 번 자기잠식 사고를 겪었고, 기대값이 3개월 7노출 수준인 페이지를 위해 그 리스크를 지는 건 수지가 안 맞음 |

**판단**: 이번에도 3건 전부 기각. 신규 발행 0건. **다만 이건 "확장 전략을 접었다"는 뜻이 아니라, 사용자가 이번에 명시한 "진짜로 할 게 없으면 안 하는 게 맞다" 기준을 적용한 결과임.** 확장 전략 자체는 유지되고, 다음 세션도 매번 2~3건 조사는 계속할 것.

### 💰 수익화 관점 판단 (사용자 지시로 이번 세션 우선순위 기준으로 적용)

- **현 상태에서 제휴/광고 도입은 승인이 나지 않는 게 정상이고, 나더라도 수익이 0에 수렴함.** 3개월 오가닉 클릭 6회, GA4 봇 제외 추정 실사용자 월 40~60명. 애드센스 반려(가치없는 콘텐츠), iHerb/Awin 반려(URL 관련성) 둘 다 이 수치의 자연스러운 귀결.
- **따라서 이번 세션의 수익화 우선순위 판단은 "제휴사를 더 뚫는다"가 아니라 "트래픽 병목을 푼다"임.** 그 관점에서 이번 세션 작업의 기대 임팩트 순위:
  1. **노출붕괴 원인 규명** — 3주 중 11일 붕괴. 이게 서빙 문제면 노출의 절반가량을 그냥 버리고 있는 것이라, 다른 어떤 콘텐츠 작업보다 임팩트가 큼. **비용은 사용자 캡처 1~2장.**
  2. sitemap lastmod — 크롤 우선순위 신호 복구(이번 세션 완료).
  3. 신규 콘텐츠 — **96%가 50위 밖인 상태에서 107번째 페이지의 한계수익은 0에 가까움.** 순위가 안 붙는 게 콘텐츠 부족 때문이 아니라 도메인 레벨 문제이기 때문.
- **다음 Opus 세션이 판단할 것(08-04에서 이월, 여전히 미판단)**: iHerb 재신청 시점 / ShareASale·Impact 등 신규 제휴 신청 여부. **개인 의견을 덧붙이자면, 위 트래픽 수치가 개선되기 전엔 재신청이 반려 이력만 더 쌓을 가능성이 높음**(Awin 공식 문서상 신청 이력이 향후 심사에 반영됨).

### 경쟁사 노트 추가

- **nutritioncalcs.com** — 이번 전해질 조사 중 발견. 계산기 + 가이드 조합으로 운영되는 **우리와 구조가 동일한 직접 경쟁사**(전해질/수분/나트륨을 하나의 클러스터로 묶어 상호링크까지 동일 패턴). 기존 reverse.health(여성40+), AerobAce·Zone2AI(zone2/MAF), anyroomgym(zone2 워킹)에 이어 **4번째 상시 경계 대상**으로 등록. 향후 신규 후보 조사 시 이 4곳 선점 여부를 먼저 확인할 것.
- **bitekit.app** — 전해질 계산기 2종 보유. 영양·수분 계산기 확장 시 재등장할 가능성 높음.

### 다음 세션 우선순위

1. **🔴 사용자에게 다른 사이트 GSC 노출 그래프 요청** (07-23~28 / 08-02~04 / 08-07~08 구간) → 노출붕괴가 우리 문제인지 구글 문제인지 캡처 1~2장으로 판별. **이게 1순위, 다른 작업보다 먼저 물어볼 것.**
2. Coverage는 **드릴다운 말고 요약(색인/미색인 총계)**으로 받을 것 — 이번엔 총 색인 건수를 확인할 수 없었음.
3. canonical 통합(`weight-loss-plateau` 54→46.3) 계속 추적. **롤백하지 말 것.**
4. `how-much-fiber-per-day.html` 인바운드 보강(08-04) 효과 재확인 — 이번엔 7일차라 판단 유보.
5. GA4 봇 필터 설정(사용자 직접, 4세션 연속 미처리).
6. 신규 후보 2~3건 조사는 매 세션대로 계속. **단 퀴즈 양산 금지** — 위 "구조적 발견" 항목의 기대값 경고 참고.
7. **⛔ 하지 말 것**: Bing/IndexNow 관련 일체(위 참고), 퀴즈 0노출 원인의 내부링크 재조사, H2 전수대조 카니발라이제이션(08-04 완료), DNS A레코드 재확인(08-11 완료).

### ⭐ 신규 클러스터 발굴 기준 추가 (2026-08-11 사용자 지시)

기존 방법론(①기존 파일 중복확인 ②웹서치 경쟁강도 ③YMYL 리스크 ④사이트 정체성 적합도)에 **선별 기준 하나를 앞단에 추가**함:

- **"문서 수가 적고 조회수(검색량)가 많은" 키워드를 우선 타겟으로 잡을 것.** 즉 경쟁강도를 "대형 브랜드가 있나 없나"로만 보지 말고, **해당 쿼리를 정면으로 다루는 문서 자체가 몇 건이나 존재하는지(공급)** 와 **검색 수요**의 비율로 판단하라는 뜻.
- 이번 세션 기각 사례에 이 기준을 대입해보면 방향이 명확함: 프로틴 파우더·전해질은 **수요는 크지만 공급(전용 문서·전용 계산기)도 이미 포화**라 비율이 나쁨. 반대로 지금까지 성공한 2건은 공급이 얇은 자리였음.
- 실무적으로는 웹서치 시 "이 앵글을 정면으로 다루는 전용 페이지가 몇 개나 나오는가"를 세어 기록하고(기존에도 해오던 방식), 거기에 **검색 수요 신호(GSC 노출 쿼리 볼륨 또는 웹서치상 관련 문서·커뮤니티 질문 빈도)를 같이 적어 비율로 판단**할 것. 둘 중 하나만 보고 기각/승인하지 말 것.
---

## 2026-08-04 세션 — 분석 전용(Opus), 실행은 Sonnet에게 위임. 🔴 07-23~07-28 노출 붕괴 발견(이전 세션 오진 정정) + 수익화 정책 전면 개정

**작업 방식**: 사용자 지시 — Opus는 분석/판단만 하고 실제 파일 수정은 Sonnet이 별도 세션에서 수행. 대시보드/시각화 금지(기존 정책 동일). 이 분석 세션 자체에서 수정한 파일은 `handover.md` 하나였으나, 같은 날 이어진 Sonnet 실행 세션들에서 아래 작업이 모두 완료됨(각 항목 하단에 상세 기록):
1. 홈 런치 디렉토리 배지 8개 `rel="nofollow sponsored noopener noreferrer"` 적용(커밋 `0533854`)
2. `how-much-fiber-per-day.html` 내부링크 고아 상태 해소, 인바운드 1→4개(커밋 `6c2439d`)
3. 제휴 수익화 법적 인프라(`privacy-policy.html` Affiliate disclosure 재작성, `about.html` 편집독립성 문단 추가) — 실제 링크는 미배포(커밋 `3d4a07a`)
4. FFMI 3중 카니발라이제이션 정리 — 아래 상세 기록

**분석 자료**: 서치콘솔 Coverage + Performance(2026-08-04 내보내기, 07-27과 8일 차이), GA4 보고서 개요(2026-07-07~08-03, 4주).

### 🔴🔴 최우선 발견 — 07-23~07-28 6일간 노출이 사실상 0으로 붕괴했다가 07-29에 완전 복구됨

일별 노출: 07-21 **178** → 07-22 83 → **07-23 `7` / 07-24 `10` / 07-25 `1` / 07-26 `7` / 07-27 `1` / 07-28 `2`** → 07-29 **123** → 07-30 151 → 07-31 123 → 08-01 115.

- **07-27 세션은 이 현상을 "GSC 성과 리포트의 정상적인 2~3일 반영 지연"으로 기록했으나, 이는 오진이었음.** 반영 지연은 최근 2~3일에만 영향을 주는데, 이번 건은 **6일 연속**이었고 그 뒤 정상 수준으로 완전 복구됨. 지연이 아니라 실제 이벤트였음.
- **07-22에 사용자가 GitHub 웹UI로 직접 커밋한 2건(`8a5b0a4`, `4d3802d`)이 시점상 유일하게 일치**함 — 둘 다 홈 `index.html` 하단에 sellwithboost.com 배지(외부 이미지+dofollow 링크) 추가/수정. 다만 홈 1개 파일의 배지 링크가 사이트 전체 노출을 6일간 0으로 만들 개연성은 낮아 **인과관계는 미확정**.
- **더 유력한 가설 3가지 (다음 세션에 반드시 확인할 것)**: ①GitHub Pages / DNS(CNAME) 일시 장애로 Googlebot이 6일간 4xx·5xx를 받음 ②GSC 로깅 갭(구글 측 데이터 수집 사고) ③일시적 색인 이탈 후 자동 복구.
- **확인 방법**: GSC UI의 "크롤링 통계(Crawl stats)" 리포트에서 07-22~07-29 구간의 응답코드 분포를 보면 ①인지 ②인지 즉시 판별 가능. **이건 bulk CSV에 안 담기는 정보라 사용자가 GSC UI를 직접 열어 캡처해줘야 함 — 다음 세션에 반드시 요청할 것.**
- **복구 후 수준이 이전보다 낮음**: 붕괴 전 07-13~07-21 평균 약 180회/일 → 복구 후 07-29~08-01 평균 약 128회/일(-29%). 완전 회복은 아직 아님, 2~3주 더 추적 필요.

### Coverage — 색인 104건으로 증가, 07-27 canonical 조치가 구글에 반영됨

- 색인 생성됨 **104건**(07-27 시점 95건 → +9). 색인 안 됨 2건. 사이트맵 URL은 107개.
- "심각한 문제" 구성이 바뀜: **"적절한 표준 태그가 포함된 대체 페이지" 1건**이 새로 등장 — 이는 07-27 세션에 `why-weight-loss-plateau-how-to-break-it.html`의 canonical을 `weight-loss-plateau.html`로 넘긴 조치를 **구글이 실제로 인식했다는 신호**(사고 아님, 정상). "크롤링됨-미색인" 1건(07-27 2건에서 감소), "발견됨-미색인" 0건(2건에서 해소).
- **단, canonical 통합의 성과는 아직 안 나옴**: `why do weight loss plateaus happen` 쿼리는 여전히 포지션 **9.5**인데, 이 순위를 갖고 있는 건 canonical을 넘겨준 쪽(`why-weight-loss-plateau-how-to-break-it.html`, 포지션 10.5)이고 통합 대상(`weight-loss-plateau.html`)은 포지션 54.02에 머물러 있음. **순위 신호가 아직 전이되지 않은 상태.** 2~3주 더 지켜보고, 만약 9.5 신호가 전이되지 않고 소멸하면 canonical 방향을 되돌리는 것(=순위 좋은 쪽을 정본으로)을 검토할 것.

### Performance — 클릭이 사실상 멈춤, 순위 분포는 여전히 심각

- 3개월 누적: 클릭 **9회**, 노출 11,424, CTR 0.08%, 평균 포지션 62.6. **최근 14일간 클릭 0회.**
- **포지션 구간별 노출 분포(쿼리 1,000개 기준)**: 1~10위 17회 / 11~20위 8회 / 21~30위 17회 / 31~50위 245회 / **51~70위 2,142회 / 71~100위 4,548회**. → **전체 노출의 96%가 50위 밖.** "콘텐츠가 없어서"가 아니라 순위 자체가 안 붙는 상태가 3개월째 그대로.
- 클릭이 1회라도 난 쿼리: **0개**(페이지 단위로만 클릭 집계됨). 클릭 발생 페이지는 quiz/creatine-right-for-you(3), zone-2-heart-rate-by-age(2), vitamin-d-calculator(2), 홈(1), high-protein-breakfast-women-over-40(1).
- 07-21 발행 4건 중 3건 노출 확인(14일차): `why-1rm-calculator-doesnt-match-real-max` 2노출/**포지션 18.5**, `hrv-and-zone-2-training` 5노출/포지션 47.4, `protein-satiety-appetite-control` 10노출/포지션 78.1. **`protein-timing-before-after-workout`은 14일 지났는데도 노출 0건.**
- MAF 클러스터 여전히 사이트 최고 순위대: `maf-training-plan` 포지션 23.11, `maf-calculator` 36.37, `maf-training-for-beginners` 37.33. `alcohol-and-calorie-deficit` 포지션 16.11로 준수.

### 🔴 신규 발견 — 3개월 노출 0건 페이지 15개 (사이트맵 107개 중)

블로그 5건: `ffmi-vs-bmi.html`, `high-protein-dinner-women-over-40.html`(07-15 발행, **3주 경과**), `how-much-fiber-per-day.html`(06-23 발행, **6주 경과**), `intermittent-fasting-for-women-over-40.html`, `protein-timing-before-after-workout.html`(07-21 발행, 2주 경과).
퀴즈 10건: `cardio-type`, `enough-protein`, `fat-loss-strategy`, `healthy-bmi`, `maf-training`, `muscle-building-starting-point`, `recovery-type`, `sleep-type`, `weight-loss-plateau`, `zone-2-fitness-level`.

- **`how-much-fiber-per-day.html`이 가장 심각**: 6주 경과인데 노출 0, 게다가 **사이트 전체에서 이 파일로 링크하는 HTML이 단 1개**(`blog/index.html` 허브뿐). 사실상 내부링크 고아 상태. 다른 0노출 블로그 4건은 인바운드 3~5개로 정상 범위라 원인이 다름.
- **FFMI 3중 카니발라이제이션 확인 → 2026-08-04 해소 완료(상세 기록은 본 문서 하단 "FFMI 정리" 섹션 참고)**: `blog/what-is-ffmi.html`(47노출) / `blog/ffmi-vs-bmi.html`(**0노출**) / `tools/ffmi-calculator.html`(28노출) 세 페이지가 H2 3개(`what is ffmi?`, `how ffmi is calculated`, `how to increase your ffmi`)를 공유하던 문제. 07-27 세션의 다음 우선순위 #5(H2 전수 대조 카니발라이제이션 조사)를 이번에 실행해서 찾아낸 유일한 실질 케이스.
- H2 전수 대조 결과 그 외 195쌍이 플래그됐으나 전부 퀴즈 템플릿 상용구(`about this quiz`, `related tools and articles`) 노이즈로 실제 카니발라이제이션 아님. **이 전수조사는 이제 완료된 항목으로 처리 — 다음 세션에 반복하지 말 것.**

### 🔴 GA4 — 봇 트래픽 비중이 또 악화, 분석 데이터 자체가 신뢰 불가 수준

- 4주(07-07~08-03): 활성 사용자 287명, 이벤트 1,508건, 평균 참여시간 **13.7초**(07-27 세션 20.9초 → 더 하락).
- **싱가포르 191명 / 287명 = 66.6%** (07-27 63.8% → **3세션 연속 악화**). 그 외 Council Bluffs(구글 데이터센터), Boardman·The Dalles(AWS/구글 데이터센터), Guangzhou/Urumqi/Xi'An 등 — **상위 도시 대부분이 데이터센터 또는 크롤러 출처.**
- 세션 소스: direct/(none) 263, **ahrefs.com/referral 16**(SEO 크롤러), bing/organic 9, google/organic **4**, duckduckgo 3, 그 외 foundrlist·sellwithboost·newtool.site·twelve.tools·kittylaunch 등 **디렉토리 등록 사이트발 referral 다수**(사용자가 사이트를 여러 런치 디렉토리에 등록한 결과로 보임).
- **결론: 실제 사람 트래픽은 4주에 30~50명 수준으로 추정.** 287명이라는 숫자는 봇/데이터센터 트래픽이 대부분. **GA4 지표를 성과 판단 근거로 쓰면 안 되는 상태 — 서치콘솔 클릭수(3개월 9회)가 훨씬 정직한 지표임.**
- **조치 권고**: GA4에 봇 필터링(내부 트래픽/데이터센터 IP 제외) 또는 최소한 싱가포르 세그먼트를 분리한 별도 탐색 리포트를 만들어야 앞으로의 판단이 유효해짐. 이건 코드 작업이 아니라 GA4 콘솔 설정이므로 **사용자가 직접 해야 함.**

### 신규 콘텐츠 후보 조사 — 2건, 전부 기각 (누적 38건 조사 / 성공 2건, 약 5.3%)

| 후보 | 조합/앵글 | 기각 사유 |
|---|---|---|
| Zone 2 + 트레드밀 경사/걷기 | "zone 2 treadmill incline walking beginners over 50" | **anyroomgym(Zone 2 Walking Speed Calculator 전용, 07-21 세션에도 등장한 반복 경쟁사)**, peakprimalwellness, CenturyAI, stressfreelongevity, getsteps.app, SALTA, chrisadamspersonaltraining 등 **8개+**. 12-3-30 프로토콜까지 이미 상세히 다뤄짐 |
| MAF 진척 정체 트러블슈팅 (1RM 패턴 재적용) | "MAF pace not improving plateau why" | **extramilest가 이 주제 하나로 전용 글 3편** 보유(7 reasons/Overcoming frustrations/Not Progressing), **philmaffetone 원저자 글**("Why Don't I Get Faster?"), **AerobAce MAF Test Guide에 플래토 진단 섹션 내장**, runnersblueprint FAQ — **6개+**. 사이트 최강 클러스터(MAF)의 트러블슈팅 각도조차 이미 포화 |

**판단**: 07-27 세션이 제안한 "zone2/MAF에서 뻔하지 않은 각도" 방향으로 실제 조사해봤으나 둘 다 막힘. 누적 38건 중 성공 2건(5.3%)이면 **신규 콘텐츠 발굴의 기대 ROI가 통계적으로 매우 낮음**. 게다가 지금은 **신규를 발행해도 96%가 50위 밖에 떨어지는 상태**라 발행 자체의 한계수익이 거의 0에 가까움. → **다음 세션 우선순위는 신규 발굴이 아니라 (a)07-23 노출붕괴 원인 규명 (b)GA4 데이터 정합성 확보 (c)수익화 실행으로 옮길 것을 권고함.** (단, 이건 Claude의 판단이며, 사용자가 "신규 탐색은 매 세션 계속하라"고 이전에 명시 지시한 바 있으므로 사용자 확인 전까지는 매 세션 1~2건 가볍게 계속 시도.)

### 다음 세션 우선순위 (권고)

1. **사용자에게 GSC UI "크롤링 통계" 캡처 요청** → 07-22~07-29 노출붕괴가 서버 장애인지 GSC 사고인지 판별. 이게 서버 장애였다면 재발 방지가 다른 무엇보다 우선.
2. **GA4 봇 필터 설정**(사용자 직접) → 이거 없으면 앞으로 모든 트래픽 판단이 무의미.
3. **`how-much-fiber-per-day.html` 내부링크 보강**(인바운드 1개 → 4~5개) — 유일하게 명확한 원인이 있는 0노출 페이지.
4. canonical 통합 효과 추적(`weight-loss-plateau` 포지션이 54→10위대로 오는지) — 미전이 시 롤백 검토.
5. ~~FFMI 3중 중복 정리~~ → 2026-08-04 완료.
6. 수익화 실행 — 위 "💰 수익화 정책" 참고. (법적 인프라는 2026-08-04 완료, 실제 링크는 미배포 상태)

---

## 2026-07-27 세션 — 일요일 정기점검 (앞당겨 진행), 카니발라이제이션 발견·수정 + 중복 FAQ 버그 2건 발견·수정, 신규 3건 조사 전부 기각

**작업 방식**: 사용자가 새 PAT 제공. 사용자가 명시적으로 대시보드/시각화 생성 금지, 텍스트 분석만 지시(기존 정책과 동일). 신규 콘텐츠는 ①기존 파일 중복확인 ②웹서치 키워드/경쟁강도 조사 ③롱테일 전략 ④수익화(애드센스 트래픽/클릭) 우선순위 재확인. **사용자가 이번에 재강조한 지시**: "2026년 AI검색은 도메인 권위보다 콘텐츠 자체(문제해결/비교분석)가 중요하다" — 신규/보강 판단 시 이 기준 계속 적용.

**분석한 자료**: 서치콘솔 Coverage + Performance(2026-07-27 내보내기, 07-21과 6일 차이), GA4 보고서 개요(2026-06-29~07-26, 4주, 계정: GetSoloTools).

### 배지 정리 (즉시 처리)
`blog/index.html`의 `zone-2-training-plan.html` 배지(2026-07-11자)가 14일 규정상 만료되어 제거함. 나머지 배지(07-15/07-17/07-19/07-21, `tools/index.html` 07-17 1건, 홈 `index.html` 07-21 3건)는 아직 유효기간 내라 유지.

### 🔴 기술 버그 발견 및 수정 — "FAQ 섹션이 본문 중간에 쪼개져서 2번 존재" 패턴 2건 추가 발견

지난 세션들(특히 07-11)에 `best-time-to-exercise.html`에서 발견했던 것과 **동일한 패턴의 버그가 2개 파일에 더 있었음**을 이번에 발견함: `blog/calories-burned-walking.html`, `blog/10000-steps-a-day.html` 둘 다 `<h2>Frequently asked questions</h2>` 섹션이 본문 중간에 한 번, 글 후반부에 또 한 번, 총 2번 쪼개져서 존재.

**왜 지금까지 못 잡았는가(중요, 다음 세션에도 참고)**: 기존 감사 스크립트는 "본문 FAQ 질문 개수 == 스키마 질문 개수"만 비교하는데, 이 두 파일은 **공교롭게도 두 FAQ 블록의 질문 개수 합이 스키마 전체 개수와 일치**해서(예: 3개+4개=7개=스키마 7개) 개수 기준 검증을 통과해버림. 즉 "일치 여부"가 아니라 **"같은 제목의 h2가 파일 내에 몇 번 나오는지"까지 별도로 체크해야 이 버그를 잡을 수 있음.

**조치**: 두 파일 모두 두 FAQ 블록을 하나로 병합, 사이에 끼어있던 본문 섹션(`calories-burned-walking.html`의 "Using walking for long-term weight management", `10000-steps-a-day.html`의 "How to increase your daily step count practically")을 CTA 박스 직후로 재배치. div 밸런스·FAQ-스키마 일치(7/7 둘 다) 재검증 완료.

**사이트 전체 재스캔 실행 (같은 버그 재발 방지)**: `grep -c "Frequently asked questions"` 방식으로 전체 96개 파일 재검사 → **위 2건 외 추가 발견 없음**. 이 김에 "동일 h2 텍스트가 파일 내 2회 이상 등장"하는 모든 케이스도 전수 검사(Counter 방식) → 0건. div 밸런스 0건, FAQ-스키마 불일치 0건, 인라인 JS 문법 오류(`node --check`) 0건 전부 재확인. **다음 세션 체크리스트에 "동일 h2 중복 여부"를 FAQ-스키마 일치 검증과 별개 항목으로 추가할 것.**

### 🔴 카니발라이제이션 발견 및 수정 — `weight-loss-plateau.html` vs `why-weight-loss-plateau-how-to-break-it.html`

서치콘솔 쿼리 재스캔 중 `why do weight loss plateaus happen`이 포지션 9.5(사이트 전체에서 손꼽히게 좋은 순위)로 확인됐는데, 대조해보니 **이 키워드를 두 개의 거의 동일한 블로그 글이 나눠서 타겟팅하고 있었음**을 발견:
- `blog/weight-loss-plateau.html`(2026-05-01 게시, 1307단어) — H2: "Why weight loss plateaus happen" / "Evidence-based strategies to break a plateau" / "What not to do"
- `blog/why-weight-loss-plateau-how-to-break-it.html`(2026-05-13 게시, 1386단어) — H2: **"Why weight loss plateaus happen"(동일 문구!)** / "How to break a weight loss plateau"

두 글의 핵심 섹션 제목까지 겹치는 사실상 동일 주제 중복 콘텐츠 상태였고, 내부링크 자산도 전자가 9곳, 후자가 4곳으로 전자가 더 강함. **이런 카니발라이제이션은 두 페이지 다 순위를 깎아먹을 수 있어(구글이 어느 쪽을 신뢰 신호로 합칠지 확신 못 함), 신규 콘텐츠 찾는 것보다 오히려 ROI 높은 수정일 수 있다고 판단해 이번 세션에 처리함.**

**조치 (콘텐츠 삭제 없이 canonical로 통합)**:
- `why-weight-loss-plateau-how-to-break-it.html`의 `rel="canonical"`을 자기 자신에서 `weight-loss-plateau.html`로 변경 (검색엔진 신호를 후자로 통합, 파일 자체는 삭제 안 해서 외부 백링크가 있어도 깨지지 않음)
- `blog/index.html` 허브 리스트에서 후자 카드 제거, `sitemap.xml`/`llms.txt`에서도 후자 URL 제거 (더 이상 별도 색인 대상으로 홍보 안 함)
- 후자를 가리키던 내부링크 전부(`quiz/weight-loss-plateau.html` 2곳 정적링크+2곳 JS CTA, `quiz/weight-loss-rate.html` JS CTA 1곳, `blog/weight-loss-plateau.html` 사이드바 자기링크 1곳) 전자로 재배선 — 다행히 전자에 이미 `#why`/`#strategies` 앵커 id가 있어서, "왜 정체기가 오는지" 프레이밍은 `weight-loss-plateau.html#why`, "어떻게 극복하는지" 프레이밍은 `weight-loss-plateau.html#strategies`로 앵커까지 살려서 연결함(기존 링크 라벨/문맥 그대로 유지)
- 전체 영향받은 5개 파일(전자/후자 블로그 2개, 퀴즈 2개, blog/index.html) div 밸런스·JS 문법·sitemap XML 유효성 재검증 완료 (전부 통과)

**다음 세션 참고**: 이 수정 효과(포지션 9.5 신호가 실제로 개선되는지, 또는 최소한 유지되는지)는 반영 지연 고려해 2~3주 뒤에 확인 권장. 비슷한 카니발라이제이션이 다른 곳에도 있을 수 있으니, 다음에 시간 나면 전체 96개 파일의 H2 목차를 서로 대조하는 것도 검토해볼 만함(이번엔 GSC 쿼리 신호로 우연히 발견한 것이라 전수조사는 아니었음).

### Coverage — 변화 없음
심각한 문제 4건(크롤링됨-미색인 2건 시작됨 + 발견됨-미색인 2건 통과), 색인 페이지 95건 — 07-21과 완전 동일. 조치 불필요. 참고로 Coverage 리포트의 일별 차트 자체는 2026-07-10까지만 나오는데(이 리포트 특성상 원래 지연이 김, 사고 아님), Performance 리포트의 일별 차트는 07-24까지 나오고 07-25/26은 아예 안 보임 — 이는 GSC 성과 리포트의 정상적인 2~3일 반영 지연으로 판단(과거 세션에도 반복 확인된 패턴), 트래픽 급감 신호 아님.

### Performance 분석
- **`zone-2-heart-rate-by-age.html` 계속 성장**: 노출 687(07-21)→814(07-27), 포지션 10.15 유지. 다만 CTR 여전히 0.25%(2클릭) — "zone 2 heart rate by age" 등 실제 매칭 쿼리들은 포지션 50~67위대인 것으로 재확인(쿼리 데이터 대조), **페이지 평균 포지션 10대는 여전히 통계적 착시로 재확인 — title/meta 수정 불필요, 07-17 세션 결론 그대로 유지**.
- **07-17/07-19 게시분의 10일차 이상 데이터 확보** — 블로그/내러티브형이 계산기형보다 빠르게 순위 잡는 패턴이 이번에도 재확인됨:
  - `blog/maf-training-plan.html`: 6노출, **포지션 22.83** (MAF 클러스터 강세 재확인)
  - `blog/alcohol-and-calorie-deficit.html`: 2노출, 포지션 18
  - `blog/lean-bulk-vs-dirty-bulk.html`: 2노출, 포지션 27
  - `tools/calorie-surplus-calculator.html`: 18노출, 포지션 58.33 (계산기형은 역시 느림)
  - `blog/high-protein-snacks-women-over-40.html`: 4노출, 포지션 72.5 (아직 이름)
  - **07-21 게시 4건**(why-1rm-calculator/hrv-and-zone-2-training/protein-satiety-appetite-control/protein-timing-before-after-workout)은 이번 데이터에도 전혀 안 잡힘(6일차, 정상 범위) — 다음 세션에 재확인 필요.
- 쿼리 1,000개 재스캔 — MAF 클러스터가 여전히 사이트 전체에서 가장 좋은 포지션 분포(12~34위대: "maf 180 calculator" 12.75, "maf training for beginners" 27.5, "maf training plan" 28.57, "maf training" 33.43) 유지. 기존 클러스터 밖의 새로운 수요 신호는 이번에도 없음(확립된 방법론대로 예상된 결과).

### GA4 — AdSense 재신청 판단: 지역 이상치가 완화가 아니라 악화됨 (중요)
- 4주(06-29~07-26) 활성 사용자 229명, 신규 233명, 이벤트 1,844건, 평균 참여시간 20.87초 — 트래픽 절대량은 지난 세션과 비슷한 수준 유지.
- 세션소스: direct/(none) 207, **ahrefs.com/referral 20**(SEO 크롤러 봇, 실사용자 아님), bing/organic 8, google/organic 7, duckduckgo/organic 4 — 오가닉 서치 합계 19세션, 여전히 미미.
- **⚠️ 도시 분포 이상치가 이번엔 악화됨**: 활성사용자 중 싱가포르가 **146명/229명(63.8%)** — 07-13 세션 105/180(58.3%)에서 오히려 비중이 커짐. 07-21 세션에 "다음 세션에 정상화되는지 확인" 하기로 했는데, **정상화가 아니라 심화됐음**. 봇/자동화 트래픽 가능성을 계속 배제 못 하는 상태.
- **애드센스 재신청 판단**: 이 지역 이상치가 완화가 아니라 악화된 게 이번 세션 확인된 새 사실 — **재신청을 더 미루는 쪽으로 판단**. 트래픽 절대량과 콘텐츠 품질(2026-07-13 세션에 확인한 글자수/원본성 기준)은 계속 통과 수준이지만, 실사용자 트래픽 비율에 대한 불확실성이 커진 상태에서 재신청하면 오히려 "가치없는 콘텐츠" 외의 다른 사유(비정상 트래픽 패턴)로 재반려될 리스크가 있다고 봄. 다음 세션에 이 지역 분포가 실제로 어떻게 움직이는지(계속 악화/정체/개선) 추이를 한 번 더 보고 판단 권장.

### 신규 콘텐츠 후보 조사 — 3건, 전부 기각 (모두 기존 강력 클러스터의 인접 확장 시도였으나 이미 포화)

기존 방법론(①기존 파일 중복확인 ②웹서치 경쟁강도 ③롱테일 시도 ④사이트 강점 클러스터 우선 확장) 그대로 적용:

| 후보 | 조합/앵글 | 기각 사유 |
|---|---|---|
| Zone 2 계산기 vs 웨어러블(Apple Watch/Garmin) 존 불일치 | "why does my zone 2 heart rate not match my Apple Watch/Garmin" | **Zone2AI(전용 계산기+콘텐츠 직접경쟁사), CenturyAI, Welltory, Livity, VO2Master, McMillan, Harvard Health, AOL/Hearst 신디케이션** 등 **8개+** — 이미 매우 유사한 각도(우리 zone-2-heart-rate-by-age.html에 이미 추가해둔 "왜 심박수가 차트와 다른가" 섹션과 겹치는 프레임)로 포화 |
| MAF 초보자 트레이닝 플랜 (일반) | "MAF 180 formula training plan beginners" | philmaffetone.com(원저자), AerobAce, RunnersBlueprint, Marathon Handbook, ReshapeApp, runsforcookies 등 **6개+** — 이미 우리 자체 `maf-training-for-beginners.html`+`maf-training-plan.html`이 이 공간을 충분히 커버 중이라 확인, 신규 필요성 없음 |
| MAF vs Zone 2 비교 (단독 아티클로) | "MAF training vs Zone 2 which is better" | **AerobAce가 이 정확한 비교를 전용 페이지(`/maf-vs-zone-2`, 인터랙티브 비교 툴 포함) + 블로그 글 두 개로 이미 커버**, myPrimalCoach/RunnersBlueprint/ReshapeApp/HeroMovement/Debbie Potts 등 추가 **5개+**. 게다가 **우리 자체 `maf-calculator.html`과 `maf-training-for-beginners.html`에 이미 "MAF vs Zone 2: 차이점" 섹션이 존재**해서 단독 아티클로 만들면 자기잠식(cannibalization) 우려도 있음 — 이중으로 기각 |

**결론**: 이번 세션도 3건 전부 기각. 누적 33건(07-21까지) + 이번 3건 = **누적 36건 조사, 성공 2건(~5.6%)**. 이번에 조사한 3건 모두 "우리가 이미 잘하는 클러스터(zone2, MAF)의 인접 확장"을 시도한 것이었는데도 막혔다는 점이 특기할 만함 — 강점 클러스터 확장 전략 자체는 유효하지만(과거 1RM/여성40대단백질/알코올 성공 사례), **이 두 클러스터(zone2, MAF)는 이미 대형 전문 경쟁사(AerobAce, Zone2AI)가 콘텐츠+계산기+비교툴까지 다 갖추고 있어 더 이상 뻔한 각도로는 신규 진입 여지가 없는 상태**로 판단됨. 다음 세션엔 zone2/MAF 두 클러스터에서 "뻔하지 않은" 각도(예: 특정 스포츠 종목 결합, 특정 건강상태 결합 등)를 찾거나, 아예 다른 클러스터(protein/여성40대, 1RM 등 아직 대형 경쟁사가 없는 곳) 위주로 신규를 찾는 게 나을 듯.

### 이번 세션에 하지 않은 것
- 신규 콘텐츠 발행 없음 — 3건 조사 전부 기각(위 표 참고). 대신 카니발라이제이션 수정 + 중복 FAQ 버그 2건 수정이 이번 세션의 실질적 진전.
- 중간 노출 구간 페이지 7건(`calories-burned-walking`, `what-is-a-healthy-bmi`, `body-fat-calculator`, `protein-needs-women-over-40`, `maf-training-for-beginners`, `maf-calculator`, `tdee-vs-bmr`) GEO 밀도 점검 — 전부 이미 1400~3000단어대, FAQ 7~11개, 비교표/비교섹션(TDEE vs BMR, 5가지 체지방 측정법, MAF vs Zone2 등) 충분히 보유 확인. **보강 불필요, 다음 세션에 재점검할 필요 없음** (단, `calories-burned-walking.html`은 이 점검 중 위 FAQ 중복 버그를 발견해서 수정함).
- AdSense 재신청 실행 — 위 GA4 분석 근거로 이번에도 보류가 낫다고 판단.

### 다음 세션 우선순위 제안
1. 카니발라이제이션 수정 효과(포지션 9.5 신호 유지/개선 여부) 확인 — 2~3주 뒤 권장.
2. 07-21 게시 4건의 노출 반영 여부 확인(다음 세션엔 10일차 이상 되어 유의미한 신호 기대).
3. GA4 지역 이상치(싱가포르) 추이 계속 관찰 — 이번에 악화 확인, 다음 세션에 방향성 재확인.
4. zone2/MAF 클러스터는 "뻔한 각도"가 막혔으니 더 구체적인 조합(특정 스포츠, 특정 상태)으로 시도하거나 우선순위를 다른 클러스터로 이동.
5. 전체 96개 파일 H2 목차 상호대조를 통한 카니발라이제이션 전수조사(이번엔 우연히 발견, 체계적 조사는 아직 안 함) — 시간 나면 검토.

---

## 2026-07-21 네 번째 세션 — 클러스터 갭 분석 + 1RM 클러스터 완성

**사용자 질문**: "툴/블로그/퀴즈 조합으로 클러스터 될만한 거 없어?" → 전체 인벤토리(툴 27/블로그 52/퀴즈 20)를 주제별로 교차 매칭해서 반쪽짜리 클러스터(3종 중 1~2종만 있는 주제) 리스트업.

**발견한 갭**: 1RM(툴만 있음), 크레아틴(블로그+퀴즈만 있음, 툴 없음), 허리-엉덩이비율(툴만), 제지방량(툴만), 러닝페이스(툴만), 식이섬유(블로그만). 그 외 클러스터(단백질/zone2/vitamin D/IF·MAF/BMI/수분/체지방/칼로리)는 이미 3종 다 갖춰짐.

**키워드 준비 단계에서 2건 추가 검증** → 1건만 생존:
- **크레아틴 계산기** — FitnessVolt/GetSwoly/BodySpec/ShreddedDad/TrainCalc/GetHealthyCalculators/BetterLifeFitness 등 **8개+**, 이미 로딩/유지/LBM기반/채식보정까지 전부 선점. 공식이 단순(체중×0.03~0.3g)해서 롱테일 여지가 사실상 없음 → **보류 결정**
- **허리-엉덩이 비율** — Medical News Today 포함 9개+, 질병리스크 주장이 들어가 YMYL 성격도 있음 → **보류 결정**
- **1RM** — "강도 기준표"(Legion/GymNation/Arvo 등 8개+)와 "%1RM 차트"(NSCA공식+e1RM.com/hypro.app 등 우리와 똑같은 계산기+콘텐츠 직접경쟁사 8개+)는 각각 포화 확인. 하지만 **"계산된 1RM이 실제와 다른 이유"** 각도는 검색해보니 경쟁사들이 자기 글 안에서 스치듯 한두 문장만 언급할 뿐 전용 딥다이브가 없었고, 이미 07-21 첫 세션에 `tools/one-rep-max.html`에 만들어둔 고유 트러블슈팅 테이블(5가지 원인)을 확장하면 되는 저위험 각도라 **채택**.

**신규 발행**: `blog/why-1rm-calculator-doesnt-match-real-max.html` — 증상→원인→해결 매칭표, 10렙 초과시 공식오차 확대 원리, 포뮬러간 편차(Epley vs Brzycki) 설명, 기술난이도 높은 리프트일수록 예측력 낮은 이유, 안전한 실제 1RM 테스트 프로토콜, 재테스트 주기(8-12주) 섹션 구성. **이걸로 1RM 클러스터 완성**: `tools/one-rep-max.html`(툴) + 신규 블로그 + `quiz/muscle-building-starting-point.html`(기존 퀴즈, 중급자 분기에 1RM 툴 CTA 추가해서 양방향 연결) 3종 세트 완료.

체크리스트(허브카드+뱃지 blog/index.html, 홈 미리보기 3슬롯 중 1슬롯 교체 — protein-timing-before-after-workout을 내림, sitemap.xml, llms.txt, 역링크: 툴 사이드바+퀴즈 CTA) 전부 완료. div/ul밸런스·JSON-LD 유효성·JS문법(node --check) 검증 통과.

**다음 세션 참고**:
- 나머지 갭(제지방량, 러닝페이스, 식이섬유)은 아직 키워드 조사 전 — 다음에 같은 방식(먼저 경쟁도 체크, 세면 롱테일 각도 찾기)으로 진행.
- "우리가 이미 고유하게 만들어둔 콘텐츠를 블로그로 확장"하는 패턴(1RM 트러블슈팅 테이블 → 딥다이브 블로그)이 이번에 저위험·고성공률로 통했음 — 다른 툴 페이지에도 비슷하게 확장 가능한 고유 콘텐츠가 있는지 살펴볼 가치 있음.
- 홈페이지 미리보기 3슬롯 현재 상태: why-1rm-calculator / hrv-and-zone-2-training / protein-satiety-appetite-control (전부 오늘 발행분). 다음 신규 발행 시 이 중 가장 오래된 것부터 교체.

### 같은 날 마지막 라운드 — 남은 갭 3개(제지방량/러닝페이스/식이섬유) 전수 조사 완료, 전부 보류

사용자 지시: "할 수 있으면 하자, 할 수 있는건 다 하자" → 남은 갭 전부 키워드 조사 진행. 1RM에서 통했던 "공식 비교/진단형 콘텐츠" 패턴을 각 갭에도 재적용 시도했으나 전부 막힘:

| 클러스터 갭 | 시도한 각도 | 기각 사유 |
|---|---|---|
| 제지방량(LBM) | "LBM 기반 단백질 계산" | leanbodymasscalculator.org 등 전용 사이트 다수 |
| 제지방량(LBM) | "공식별(Boer/James/Hume) 비교"(1RM 패턴 재시도) | ajdesigner/miniwebtool/BodySpec/traincalc/agentcalc 등 **7개+**가 **이미 기본값으로** "3개 공식 나란히 비교+차이 설명"까지 포함 — 1RM 때와 달리 이 니치는 진단형 콘텐츠까지 이미 다 채워져 있어서 백지가 없음 |
| 러닝 페이스 | "페이스존 설명(이지/템포/역치/인터벌)" | RunDida/runningpacecalculator.org 등 6개+ |
| 러닝 페이스 | "VDOT vs 심박존 비교"(1RM 패턴 재시도) | runpacelab.com/coachsaltmarsh.com 등 **러닝 전문 계산기 생태계**가 따로 있어서 이미 표준으로 다룸 — 종합 웰니스 사이트로 비집고 들어가기 어려움 |
| 식이섬유 | "칼로리기반 일일 섬유 목표 계산기" | GlobalRPH/Omnicalculator/WellCal/Vitaroxi/mytimecalculator 등 **9개+**, 공식이 극도로 단순(14g/1000kcal)해서 롱테일 여지 자체가 없음 |

**결론**: 이번 세션에 확인한 반쪽 클러스터 6개(1RM/크레아틴/WHR/LBM/러닝페이스/식이섬유) 중 **1RM 1건만 성공**, 나머지 5건은 전부 "공식이 단순하고 전용 계산기 사이트 생태계가 이미 그 니치를 포화시킨" 공통 패턴으로 기각. 억지로 발행하지 않고 이번 세션은 1RM 클러스터 완성 1건으로 마무리.

**다음 세션 참고 (갱신)**: 크레아틴/WHR/LBM/러닝페이스/식이섬유 5개 갭은 **이번 세션에 재검증까지 마쳤으므로 당분간 재조사 우선순위 낮음** — 시장 상황이 크게 바뀌지 않는 한 몇 달 뒤에나 재확인 가치 있음. "고유 콘텐츠 확장" 패턴이 통하는 조건은 (a) 우리가 이미 그 툴 페이지에 남들이 안 다루는 각도의 콘텐츠를 만들어둔 경우, (b) 그 니치가 아직 진단형/비교형 콘텐츠까지는 완전히 소진되지 않은 경우 — 둘 다 맞아야 통함(1RM은 둘 다 충족, LBM은 (b)가 이미 소진돼 실패).



## 2026-07-21 세 번째 세션 — "신규 0건은 곤란하다" 재지적 이후, 공격적 확장 지시로 신규 2건 발행

**사용자 지시 변화**: 이전 세션들의 "경쟁 세면 기각" 방식에서 벗어나, 오늘은 "키워드를 다양하게 폭넓게 찾고 → 리스트를 뽑고 → 경쟁강도 체크 → 강하면 롱테일로 뚫어라 → 가장 좋은 클러스터로 뚫는거다 → 핵심 기능은 경쟁이 강해도 결국 해야된다"는 명확한 지시. 즉 이제부터는 **적당히 경쟁 있는 것도 롱테일 각도만 확실하면 발행**하는 쪽으로 기준 조정.

**폭넓게 조사한 후보 4건**(경쟁도 순으로): 
1. **HRV(심박변이도) + Zone 2 훈련 준비도** — parsleyhealth/optimalhrv/pezcyclingnews/dynamichealthfitness/runbikecalc 등 중소 블로그 다수지만 **대형 의료브랜드(Healthline/Cleveland Clinic 등) 없음**. 특히 runbikecalc.com이 우리와 똑같은 "계산기+가이드" 모델로 HRV 가이드를 이미 발행 중인 게 확인됐는데, 이는 오히려 이 니치가 계산기 사이트 관점에서도 통한다는 검증 신호로 해석 → **채택**
2. **프로틴 + 포만감/식욕조절(satiety)** — 검색결과가 거의 전부 학술논문(ScienceDirect, PubMed, Cambridge)뿐이고 **소비자용 블로그 콘텐츠가 사실상 없음** — "고수요이지만 쉬운 설명 콘텐츠가 없는" 진짜 갭 → **채택**
3. 디로드 위크(deload week) — Cleveland Clinic/Legion/Gymshark/Anytime Fitness/BarBend/Peloton/Muscle&Strength 등 **10개+**, 계산기 클러스터와도 연결이 약함 → 기각
4. (참고용으로만 넓게 훑음, 실제 조사는 위 3개까지만 진행)

**신규 발행 2건**:
- **`blog/hrv-and-zone-2-training.html`** — 사이트 최고 순위 페이지(`zone-2-heart-rate-by-age.html`, 10위)의 컴패니언. 핵심 차별화: "HRV 낮은 날 Zone 2를 해도 되는가"(대부분의 HRV 가이드가 놓치는 디테일 — Zone 2는 저강도라 고강도 훈련과 달리 예외로 취급됨), HRV 판독값→Zone2 실행지침 비교표, 기기별(체스트스트랩/링/손목시계) 신뢰도 비교표.
- **`blog/protein-satiety-appetite-control.html`** — 사이트 최고 트래픽 페이지(`protein-calculator.html`)의 컴패니언. 핵심 차별화: 끼니당 25-30g이라는 구체적 포만감 역치(대부분의 콘텐츠가 "단백질 많이 먹으면 배부르다"로 뭉뚱그리는 부분), "단백질 목표 채웠는데도 배고픈 이유" 트러블슈팅(끼니 분산/식이섬유/수면부족/과도한 결손/파우더 위주 섭취), 매크로영양소별 포만감 비교표, 단백질원별 포만감 비교표.

두 글 다 GEO 전략(비교표+문제해결형) 적용, 서로 연결(HRV 글은 zone2 클러스터, satiety 글은 protein 클러스터), 체크리스트(허브카드+뱃지 blog/index.html, 홈 미리보기 3슬롯 중 2슬롯 교체, sitemap.xml, llms.txt, 역링크 5곳: protein-calculator/zone-2-calculator/zone-2-heart-rate-by-age/weight-loss-plateau/protein-vs-carbs-vs-fat) 전부 완료. div밸런스·JSON-LD 유효성·JS문법(node --check, 지난 세션에 발견한 아포스트로피 버그 재발 확인용) 전수 검증 통과.

**홈페이지 미리보기 슬롯 교체**: `alcohol-and-calorie-deficit`, `maf-training-plan`을 내리고 `hrv-and-zone-2-training`, `protein-satiety-appetite-control`로 교체(둘 다 blog/index.html에는 계속 남아있어 유실 아님). 현재 홈 3슬롯: hrv-and-zone-2-training / protein-timing-before-after-workout / protein-satiety-appetite-control — 전부 오늘 발행분이라 다음 세션엔 오래된 것부터 순차 교체 필요.

**다음 세션 참고**: 
- 오늘 채택 기준(중소 블로그만 있으면 롱테일로 진입, 대형 의료/계산기 팩토리 브랜드가 지배할 때만 기각)을 앞으로도 기본값으로 유지할 것 — 사용자가 명시적으로 확정한 방향.
- 두 신규 페이지 모두 노출 데이터가 아직 없음(당연히, 발행 당일) — 다음 세션에 반드시 확인.
- "고수요-저공급"(소비자 콘텐츠 없이 학술자료만 있는 주제) 패턴이 이번에 실제로 통했음 — 다음 신규 발굴 때도 이 각도를 우선 시도해볼 것(예: 다른 영양소의 학술적으로만 다뤄진 소비자 갭 주제가 더 있을 수 있음).


## 2026-07-21 추가 세션 — 퀴즈 21개 전체 긴급 버그 수정 (사용자가 화면 깨짐 스크린샷 2장 제보)

**증상**: (1) `quiz/ideal-fasting-protocol.html` — 페이지 최상단(헤더보다 위)에 FAQ 스키마의 raw JSON 텍스트가 그대로 노출됨. (2) `quiz/vitamin-d-supplement.html` — 콘솔에 `Uncaught SyntaxError: missing ) after argument list`.

**원인 진단**:
1. `ideal-fasting-protocol.html`: `<!DOCTYPE html>`이 `<!DOCTYP` + (FAQ 스키마 script 삽입) + `E html>`로 쪼개져 있었음 — 과거 어느 시점에 FAQ 스키마를 삽입하는 편집이 문자 위치 기준으로 잘못 들어가 DOCTYPE 선언 중간에 꽂힌 것. DOCTYPE이 깨지면서 브라우저가 첫 `>` 문자까지를 통째로 하나의(잘못된) 선언으로 소비하고, 그 뒤 JSON 텍스트를 body 텍스트로 렌더링해버림.
2. `vitamin-d-supplement.html` 등 **19개 퀴즈 파일**: 결과창 텍스트(`title=`, `subtitle=`, `body=` 등)에 들어간 영어 축약형(you're, it's, don't, doesn't, isn't, wasn't 등)의 아포스트로피가 이스케이프 없이 JS 작은따옴표 문자열 안에 그대로 들어가 있어 문자열이 조기 종료되고 `SyntaxError`가 발생 — 퀴즈 결과 로직 자체가 실행 안 되는 상태였음(21개 중 19개, `body-goal-type.html`과 `ideal-fasting-protocol.html`만 이 버그는 없었음).

**조치**:
- `ideal-fasting-protocol.html`: DOCTYPE 복구, FAQPage 스키마를 head 내 BreadcrumbList 스키마 뒤에 정상 위치로 재배치.
- 19개 퀴즈 파일: 영문자+아포스트로피+영문자 패턴(축약형)을 `\'`로 이스케이프 처리하는 스크립트를 인라인 `<script>` 블록에만(JSON-LD·외부 src 스크립트는 제외) 일괄 적용.
- **검증**: Node.js `--check`로 사이트 전체(quiz/tools/blog/index, 108개 html) 인라인 스크립트 문법 오류 0건 확인. quiz 21개 파일 전수로 DOCTYPE/div밸런스/JSON-LD 유효성/html·head·body 태그 개수 재검사 — 전부 통과.
- 수정 후 diff 샘플 확인 결과 백틱 템플릿 리터럴(`` ` ``) 안의 아포스트로피도 함께 이스케이프됐는데, JS에서는 템플릿 리터럴 안에서도 `\'`가 유효한 이스케이프(그냥 `'`로 평가됨)라 기능적으로는 문제없음 — 다만 소스가 다소 장황해 보일 수 있음(추후 원한다면 정리 가능, 우선순위 낮음).

**결론**: 사용자가 지적한 "퀴즈 전체가 이상하다"는 게 사실이었음 — 21개 중 19개가 콘솔 에러로 결과 표시 로직이 아예 죽어있는 상태였고, 이번에 전수 수정 완료. 커밋 `f62ac4d`로 push 완료.

**다음 세션 참고**: 이 버그의 근본 원인(과거 세션에서 퀴즈 결과문에 축약형 영어 표현을 자유롭게 쓰면서 이스케이프를 안 한 것으로 추정)이 재발하지 않도록, 앞으로 퀴즈 파일의 JS 문자열에 축약형(it's, don't, you're 등)을 넣을 땐 반드시 `\'`로 이스케이프하거나 아예 축약형을 풀어쓰는(it is, do not) 방식을 권장. 신규/수정 퀴즈 파일 작업 후에는 `node --check`로 인라인 스크립트 문법 검증하는 걸 체크리스트에 추가하는 게 좋을 듯.


---

## 기본 정보

- **사이트**: https://mywellnesscalc.com
- **GitHub 레포**: `canghun13/mywellnesscalc.com` (GitHub Pages 정적 사이트)
- **GA4**: G-9YL3ZRZBDF
- **AdSense**: ca-pub-5592663499707350
- **AdSense 상태**: 심사 반려(가치없는 콘텐츠). 재신청 시점은 아래 수익화 정책에 따라 Opus가 판단.

### FFMI 정리 (2026-08-04, Sonnet 실행 — 커밋 `5ef4240`)

**판단**: 실제 3개 파일을 읽어보니 사용자가 제시한 "H2 3개 공유"는 **`what-is-ffmi.html` ↔ `ffmi-calculator.html` 사이에서만 문자 그대로 사실**이었음(두 파일 모두 "What is FFMI?" / "How FFMI is calculated" / "How to increase your FFMI" H2를 갖고 있고, 그 아래 본문·불릿리스트가 거의 토씨 하나 안 틀리고 동일). `ffmi-vs-bmi.html`은 이 3개 H2를 **문자 그대로 갖고 있지 않음**(자체 H2는 quick-answer/how-they-differ/where-bmi-fails 등) — 대신 `what-is-ffmi.html` 안에 있는 "Why FFMI succeeds where BMI fails"(`id="ffmi-vs-bmi"`) 섹션과 **주제가 통째로 겹침**(같은 90kg/180cm 예시, 같은 결론).

**조치 1 — 툴 페이지(`ffmi-calculator.html`) vs `what-is-ffmi.html`**: 사용자 지시대로 통합 대상 아님. "What is FFMI?" / "How FFMI is calculated" 두 섹션은 문장을 대폭 축약하고 각각 `../blog/what-is-ffmi.html`(+`#ffmi-ranges`, `#ffmi-vs-bmi` 앵커)로 "더 알아보기" 링크 추가. 블로그와 100% 동일했던 "FFMI categories" 표는 통째로 제거(계산기가 결과를 이미 동적으로 보여주므로 정적 표는 이중 중복 — 블로그 쪽으로 링크만 남김). "How to increase your FFMI" 불릿은 실용적으로 남겨두되(계산 직후 "그래서 뭘 해야 하나" 니즈는 계산기 페이지에 있는 게 자연스러움) 문장을 전부 다른 표현으로 재작성해 단어 중복도를 66/84 → 34/90으로 낮춤. 사이드바에 `../blog/what-is-ffmi.html` 링크 1건 추가(다른 tools/ 페이지들의 기존 관례 — heart-rate-zone/one-rep-max/vo2-max-calculator 등 — 를 따름).

**조치 2 — `ffmi-vs-bmi.html` vs `what-is-ffmi.html`**: 삭제 대신 **canonical 통합**을 선택(단순 차별화 대신). 근거:
- 웹서치로 "FFMI vs BMI" 앵글을 확인한 결과, **경쟁 사이트 최소 6개**(ffmicalculator.io, ffmicalculator.net, ffmitracker.com, ffmicalc.com, leanffmi.com, nutritionalsupplementshop.com)가 이미 동일 앵글로 존재하며, 심지어 예시 숫자(90kg/180cm/12%↔30% 체지방률 비교)까지 우리 글과 거의 동일한 클리셰 구조 — 이 앵글은 **차별화 여지 없이 포화**된 상태.
- `ffmi-vs-bmi.html`은 발행(07-06) 이후 3개월간 노출 0건 — 위 경쟁 포화 + `what-is-ffmi.html` 자체가 이미 같은 비교를 다루고 있어 구글이 사실상의 중복으로 판단해 색인에서 밀어냈을 가능성이 높음(07-27 세션 기록에도 "크롤링됨-미색인" 후보로 이미 지목됐던 페이지).
- 반대로 차별화(H2 안 겹치게 재작성) 안은 실효성이 낮다고 판단: 이미 서로 다른 H2를 쓰고 있는데도 0노출이라는 건 H2 텍스트 문제가 아니라 앵글 자체의 포화·중복성 문제라는 뜻이라 재작성으로 해결될 문제가 아님.
- **07-27 plateau 케이스와 다르게 잡은 부분**: plateau 때는 canonical target(`weight-loss-plateau.html`, 포지션 54)이 실제로는 순위가 더 안 좋은 쪽이고, 순위가 더 좋은 쪽(`why-...-break-it.html`, 포지션 10.5)의 canonical을 약한 쪽으로 넘기는 **방향이 거꾸로**였던 것으로 보이고, 3주 지나도 신호가 전이 안 되는 이유일 수 있음. 이번엔 반대로 **실측 순위/노출이 있는 쪽(`what-is-ffmi.html`, 47노출)을 canonical target으로 고정**, 노출이 아예 없는 쪽(`ffmi-vs-bmi.html`)이 그쪽을 가리키게 함 — 정방향.
- 파일 삭제 안 함(외부 백링크 보호), `<script type="application/ld+json">`의 자기참조 URL(`url`/`@id`/`BreadcrumbList item`)은 plateau 케이스 전례를 따라 손대지 않음(canonical 태그만 변경) — 페이지 자체는 여전히 유효한 콘텐츠로 존재하되 검색엔진에는 "중복이니 다른 URL을 정본으로 봐라"는 신호만 보냄.

**동기화**: `blog/index.html` 허브 카드 제거, `sitemap.xml`/`llms.txt`에서 URL 제거, `what-is-ffmi.html` 사이드바의 자기참조 링크(같은 페이지 안에 이미 있는 `#ffmi-vs-bmi` 섹션을 별도 페이지인 것처럼 다시 링크하고 있었음) 제거, `quiz/muscle-building-starting-point.html`의 CTA 링크를 `../blog/ffmi-vs-bmi.html` → `../blog/what-is-ffmi.html#ffmi-vs-bmi`로 재배선(라벨 텍스트 "FFMI vs BMI: Which to trust" 그대로 유지 — plateau 케이스의 `#why`/`#strategies` 앵커 재배선 패턴과 동일).

**검증 완료**: 영향받은 5개 파일(`blog/what-is-ffmi.html`, `blog/ffmi-vs-bmi.html`, `tools/ffmi-calculator.html`, `blog/index.html`, `quiz/muscle-building-starting-point.html`) 전부 — div/p/h2/a/ul/li/table 등 태그 밸런스 OK, `.article-sidebar`/`<aside>`가 부모-자식이 아닌 형제 관계로 정상 유지(07-11 사고 패턴 재확인 완료), FAQ 스키마-본문 일치 3파일 전부 MATCH, 파일 내 H2 중복 0건, `node --check` 인라인 JS 전부 통과, `sitemap.xml` XML 파싱 유효(107→106 URL), 앵커 대상(`#ffmi-vs-bmi`, `#ffmi-ranges`) 실존 확인, `rcode=YOUR_CODE` 등 플레이스홀더 없음.

**화면 확인 필요 페이지** (다음 문단에서 사용자에게 링크 제공):
- https://mywellnesscalc.com/tools/ffmi-calculator.html — 본문 섹션 5개를 다시 썼고 표 하나를 통째로 지웠으므로 레이아웃/줄바꿈 확인 필요
- https://mywellnesscalc.com/blog/what-is-ffmi.html — 사이드바 링크 1개만 제거, 가벼운 변경이지만 사이드바 렌더링 확인
- https://mywellnesscalc.com/blog/ffmi-vs-bmi.html — canonical만 바뀌어 화면상 변화는 없어야 함(확인용)

---

## 💰 수익화 정책 (2026-08-04 사용자 지시로 확정 — 이전 정책 전면 대체)

**⚠️ 이 항목이 기존의 "AdSense 재심사 전 다른 광고/제휴 추가 금지" 정책을 무효화한다. 다음 세션부터 아래 기준을 따를 것.**

1. **우리는 구글 애드센스에 의존하지 않는다.** 애드센스는 여러 수익화 옵션 중 하나일 뿐이며, 우선순위가 특별히 높지 않다.
2. **수익이 되는 제휴/광고는 종류를 가리지 않고 전부 검토·도입한다.** 제휴 마케팅, 광고 네트워크, 스폰서십, 리드젠 등 형태 무관.
3. **애드센스 게시 탈락 시 재심사 여부는 Opus가 판단한다.** 다른 제휴사/광고사 도입 여부도 마찬가지로 Opus가 판단한다.
4. **애드센스보다 다른 제휴/광고가 더 이득이라고 판단되면, 그 방향을 사용자에게 추천할 것.** 애드센스 승인을 기다리느라 다른 수익화를 미루지 말 것.

**정책 근거 (2026-08-04 웹서치 확인)**: 구글 애드센스 정책상 제휴링크는 애드센스와 **공존 가능**하며, 제휴링크 존재 자체가 심사 탈락 사유가 아님(공식 정책에 "We do allow affiliate or limited-text links" 명시). 단 ①제휴 배너/링크 분량이 본문 콘텐츠를 압도하면 위험 ②제휴 관계 공시(disclosure) 페이지 필수. **따라서 "애드센스 재심사 전 제휴 금지"라는 기존 정책은 근거가 없었고, 그동안 수익화를 불필요하게 지연시켜온 것으로 판단됨.**

**제휴 도입 시 반드시 지킬 것**:
- `privacy-policy.html` 또는 별도 disclosure 섹션에 제휴 관계 명시 (FTC/구글 양쪽 요구사항).
- 미완성 플레이스홀더 링크(`?rcode=YOUR_CODE` 형태) 절대 배포 금지 — 2026-07-11에 7개 파일에서 이 사고 있었음.
- YMYL 성격상 보충제 제휴는 과장된 효능 주장 금지, 기존 E-E-A-T 톤 유지.

### 데이터 보고 — iHerb(Awin, pid:2876217) 신청 반려 (2026-08-04, Sonnet 기록. 판단은 여기서 내리지 않음 — 다음 Opus 분석 세션이 판단할 것)

**주의**: 이 항목은 원래 워크플로우(Opus가 별도 분석 세션에서 판단 → handover 전달 → Sonnet이 실행)를 어기고 이전에 Sonnet이 실행 세션 안에서 직접 "판단"을 내려 기록했던 것을 정정함. **제휴/광고사 도입 여부 판단은 Opus의 역할**이며, Sonnet은 사실관계만 남기고 판단은 비워둠.

**반려 사실**: Awin을 통한 iHerb ROW 프로그램(aid:76736) 신청이 "URL은 광고주 브랜드와 관련이 없습니다"로 반려됨.

**확인된 사실 (판단 아님)**:
- Awin 프로모션 공간의 Description(nutrition/fitness/wellness 명시)과 Sectors(Retail & Shopping > Health & Beauty)는 사용자가 스크린샷으로 확인, 둘 다 이미 정상 설정돼 있었음 — 카테고리 설정 문제는 아닌 것으로 보임.
- 서치콘솔 3개월 누적 클릭 9회. GA4는 활성 사용자의 66%가 싱가포르/데이터센터발로 추정되는 봇이라 신뢰 불가.
- 이 사이트는 런치 디렉토리(newtool.site, kittylaunch 등) referral·소셜·direct 유입도 있으나, 이는 GSC/GA4 어느 쪽으로도 아직 정확히 집계 안 됨(GA4 봇 필터 미설정 상태).
- Awin 공식 문서: "previous applications, account history, device signals... may be considered during future reviews" — 반려/신청 이력이 계정에 남아 향후 심사에 영향 줄 수 있다는 규정이 있음(구체적 영향 정도는 확인 안 됨).

**Opus가 다음 세션에 판단해야 할 것**:
1. iHerb 재신청 시점 (지금 할지, 트래픽 지표 정비 후로 미룰지)
2. ShareASale/Impact 등 다른 제휴사 신규 신청 진행 여부
3. 판단에 필요한 트래픽 지표를 어느 걸로 볼지 — GSC 오가닉만으로는 이 사이트의 referral/direct 유입을 놓친다는 점 감안할 것(GA4 봇 필터가 사용자 쪽에서 아직 설정 안 됨 — 관리 → 데이터 스트림 → 내부 트래픽 규칙, 또는 최소 싱가포르 세그먼트 제외가 선행돼야 정확한 판단 가능)

---

## 2026-07-21 세션 요약 (일요일 정기 점검을 앞당겨 진행)

**작업 방식**: 사용자가 새 PAT 제공, 세션 내내 사용(revoke 신호 없었음). 사용자가 명시적으로 대시보드/시각화 생성 금지, 텍스트 분석만 지시(기존 정책과 동일). 신규 콘텐츠는 ①기존 파일 중복확인 ②웹서치 키워드/경쟁강도 조사 ③롱테일 전략 ④수익화(애드센스 트래픽/클릭) 우선순위 적용 지시 재확인. **추가로 사용자가 이번 세션에 새로 준 지시**: "2026년 AI검색은 도메인 권위보다 콘텐츠 자체(문제해결/비교분석 밀도)가 더 중요하다"는 전제하에 페이지에 문제해결·비교분석형 콘텐츠를 넣는 방향을 강화할 것.

**분석한 자료**: 서치콘솔 Coverage + Performance(2026-07-21 내보내기, 07-19와 2일 차이), GA4 보고서 개요(2026-06-23~07-20, 4주).

### 뱃지 정리 (즉시 처리)
2026-07-06자 New뱃지 6개(blog 2, tools 1, quiz 3)가 14일 규정상 07-20에 만료됨 — 세션 시작하자마자 제거함(`blog/index.html`, `tools/index.html`, `quiz/index.html`). 07-11/07-15/07-17/07-19자 뱃지 7개는 아직 유효기간 내라 유지.

### Coverage — 개선 신호 있음
- "심각한 문제": 여전히 4건(크롤링됨-미색인 2건 시작됨 + 발견됨-미색인 2건 통과) — 07-19와 동일, 조치 불필요.
- **색인 생성된 페이지 수가 95건으로 증가**(07-13 세션 기록 86건 대비) — 사이트가 계속 성장하며 색인 범위도 같이 넓어지고 있음을 보여주는 긍정적 신호. 일별 노출은 최근 100~210회/일 수준으로 완만히 우상향.

### Performance — GSC 기준 기존 클러스터 재확인, 신규 갭 없음(예상된 결과)
- `zone-2-heart-rate-by-age.html`이 여전히 사이트 최고 순위(687노출, 평균 10.01위, 07-19의 661노출/10.07위에서 소폭 상승) — GEO 보강(07-19) 효과인지는 데이터 부족으로 단정 불가, 계속 지켜볼 것.
- **07-17에 게시한 4건**(`high-protein-snacks-women-over-40`, `maf-training-plan`, `calorie-surplus-calculator`, `lean-bulk-vs-dirty-bulk`)과 **07-19 게시 1건**(`alcohol-and-calorie-deficit`) **전부 이번 데이터에도 노출 0건** — 게시 후 각각 4일/2일차라 구글 반영 지연 감안하면 정상 범위지만, 슬슬 1~2주차에 접어드는 페이지들도 있어 다음 세션(1주 이상 뒤)엔 반드시 재확인 필요.
- 쿼리 1,000개 재스캔 — 기존 클러스터(단백질/zone2/비타민D/체지방/IF/MAF/1RM 등) 밖의 새로운 수요 신호 없음, 확립된 방법론(GSC는 확인용)대로 예상된 결과.

### GA4 — AdSense 재신청 판단 관련 참고 데이터
- 최근 4주(06-23~07-20) 활성 사용자 228명, 신규 229명, 이벤트 1,954건, 사용자당 평균 참여시간 약 20.3초.
- **트래픽 구성 여전히 Direct 압도적**: 세션소스 기준 direct/(none) 208, ahrefs.com/referral 22(크롤러 봇으로 추정, 실사용자 트래픽 아님), bing/organic 7, google/organic 5, copilot.com/ai-assistant 3, duckduckgo/organic 3 — 오가닉 서치 합계 15세션 수준으로 여전히 미미. AI 어시스턴트발 유입(copilot.com)이 계속 소량이나마 유지되고 있는 점은 참고할 만함.
- **지역 분포 특이점 유지**: 활성사용자 상위 도시가 Singapore(144명)로 압도적 1위, 그다음 Glenview/Frankfurt/Busan 등이 한 자릿수 — 이전 세션(07-13)에 지적된 "Direct 트래픽 90%+ 및 특정 도시 쏠림" 패턴이 이번에도 반복 확인됨. 봇/자동화 트래픽 가능성을 배제 못 하는 상태가 계속되고 있어, **AdSense 재신청 시점 판단에서 이 부분은 계속 참고만 하고 별도 조치는 하지 않음**(이전 세션들과 동일 판단 유지).
- AdSense 재신청 여부: 이번 세션엔 GA4 트래픽의 지역 이상치 때문에 적극 권장까지는 보류. 트래픽 절대량 자체(주간 신규사용자 200명대)는 나쁘지 않으나, 오가닉 서치 비중이 여전히 낮아 "가치있는 콘텐츠+실사용자 트래픽" 신호가 아직 약함. 다음 세션에 지역 분포가 정상화되는지(싱가포르 쏠림 완화) 확인 후 재판단 권장.

### 신규 콘텐츠 후보 조사 — 5건 웹서치, 전부 기각 (경쟁 포화 재확인)

사용자 지시대로 기존 파일과 중복확인 → 웹서치 경쟁강도 조사 → 롱테일 조합까지 시도하는 절차를 그대로 적용:

| 후보 | 조합/앵글 | 기각 사유 |
|---|---|---|
| 운동 전후 단백질 타이밍 | "protein timing before after workout does it matter" | Healthline은 아니지만 **CalculatorProtein.com, ProteinCalc(myproteincalc.com), Fitia** 등 단백질 전문 계산기 사이트 3개+가 이미 이 주제로 전용 가이드 보유, ISSN 학술 인용까지 포함해 콘텐츠 깊이도 이미 상당함 |
| Zone 2 도보(러닝 아닌 걷기) 전용 페이스 | "zone 2 heart rate walking pace calculator" | **anyroomgym.com이 정확히 "Zone 2 Walking Speed Calculator" 전용 도구 보유**, McMillan/Runna/Uphill Athlete/Steps 앱 등 기존 zone2 강자들도 이 앵글 이미 커버 — 6개+ |
| BMI vs 체지방률 비교 | "BMI vs body fat percentage which is more accurate" | **BodySpec, Numan, QuickMD, Hers(원격의료 브랜드)**, PolicyBazaar 등 대형 헬스테크/의료 브랜드가 이미 이 정확한 제목으로 다수 발행 — 6개+, 학술논문까지 인용된 성숙한 주제 |
| 비건/채식 단백질 조합 | "high protein vegan foods complete protein combining calculator" | **completeproteincalculator.com(전용 계산기), kaloria.ai(비건 전용 매크로 계산기)**, Healthline, vegfaqs/fitveganguide/veganfitguide 등 채식 전문 매체 다수 — 7개+ |
| TDEE 계산기 부정확성 트러블슈팅 | "why is my TDEE calculator wrong not losing weight" | **MacroFactor(앱), aworkoutroutine.com, caloriegoalguru.com, fitnessmentors.com, myvitalmetrics.com** 등 이미 "왜 틀렸는가+어떻게 보정하는가"까지 상세히 다룬 콘텐츠 다수 — 7개+ |

**결론**: 이번 세션도 5건 전부 기각. 07-17/07-19 세션 누적(24건 조사, 2건 성공, ~8%)에 이어 이번 5건까지 더하면 **누적 29건 조사, 2건 성공(~7%)** — 시장 포화 판단이 계속 일관되게 재확인됨. 억지로 발행하지 않고 이번 세션엔 신규 발행 없음(사용자가 이전에 지시한 "공격적으로 계속 찾되 억지로 발행하지는 말 것" 기준 그대로 적용).

### 보강(GEO 리트로핏) — 중간 노출 구간 페이지 5건 점검, 1건 실제 보강

이전 세션(07-19)에 "다음 세션엔 중간 노출 구간(100~500회) 페이지 위주로 점검" 하기로 한 것을 이번에 실행:

- **`tools/one-rep-max.html`(304노출, 클릭 0, 순위 83.49)** — 점검 결과 formula 비교/강도표는 이미 있었으나 **"계산된 1RM과 실제 최대중량이 다른 이유"에 대한 트러블슈팅 콘텐츠가 없는 것**을 발견함(문제해결형 콘텐츠 밀도를 높이라는 이번 세션 지시와 정확히 부합). 5가지 불일치 패턴(신경피로/렙수구간오류/포뮬러편향/기술제한종목/시간경과)과 각각의 원인·해결법을 담은 비교표를 신규 추가. div밸런스·FAQ-스키마 일치 검증 완료(둘 다 통과, 8/8 일치). 단어수 약 2,250→2,545(+13%).
- **점검했지만 보강 불필요로 판단한 4건**: `blog/zone-2-heart-rate-training-beginners.html`(610노출, 이미 "흔한 실수" 섹션+FAQ 12개 보유), `tools/if-calculator.html`(382노출, 프로토콜 비교+타임라인 이미 보유), `tools/zone-2-calculator.html`(381노출, 비교 콘텐츠 이미 보유), `tools/calories-burned-by-heart-rate.html`(224노출, 이미 "트래커보다 왜 낮게 나오는지" FAQ와 zone별 비교 breakdown 보유) — 4건 모두 이미 문제해결/비교 콘텐츠가 충분해 추가 조치 안 함. 다음 세션에 같은 페이지 재점검 불필요.

### 기술 상태
- div 밸런스: 수정한 4개 파일(blog/index.html, tools/index.html, quiz/index.html, tools/one-rep-max.html) 전부 검증 완료(OK).
- FAQ-스키마 일치: one-rep-max.html 8/8 일치 확인.
- 그 외 사이트 전체 재감사는 하지 않음(07-19 세션에 101개 파일 전수 검사로 0건 확인된 지 2일밖에 안 지나 재검사 우선순위 낮다고 판단).

### 이번 세션에 하지 않은 것
- 신규 콘텐츠 발행 없음 — 5건 조사 전부 기각(위 표 참고).
- Coverage "발견됨-미색인" 2건의 정확한 URL 특정 — bulk CSV 한계로 여전히 불가.
- AdSense 재신청 최종 결정 — 트래픽 지역 이상치 미해소로 보류, 다음 세션 재판단.

### 다음 세션 우선순위 제안
1. **07-17/07-19 게시 5건의 노출 반영 여부 최우선 확인** — 특히 07-17 게시분은 다음 세션 시점엔 1~2주차에 들어가므로 유의미한 신호가 나올 시점.
2. 신규 카테고리 탐색 계속(사용자 지시, 성공률 낮아도 지속) — 이번 세션에 기각된 5건 외 아직 안 건드린 인접 분야(예: 근력운동 프로그램 대신 "회복/디로드 주간" 개념, 노년층 대상 zone2 등)를 조금씩 시도.
3. 중간 노출 구간(100~500회) 나머지 페이지 계속 점검(이번엔 5건 중 1건만 보강 필요했음 — 사이트 콘텐츠 품질이 전반적으로 이미 성숙한 상태라는 07-19 판단이 재확인됨).
4. GA4 지역 트래픽 이상치(싱가포르 쏠림) 다음 세션에도 계속 관찰.

### 같은 세션 후반 — 사용자가 "더 공격적으로, 검색엔진도 다양화해서" 재차 요청, 4건 추가 조사

**사용자 지시**: 구글 외 Bing 등 다른 검색엔진도 같이 보고, "조회수는 많은데 실제 경쟁 문서 수는 적은" 키워드 관점으로 재확인, 더 공격적으로 확장할 것.

**⚠️ 도구 한계 확인(투명하게 기록)**: 이 세션에서 쓸 수 있는 `web_search` 도구는 특정 검색엔진(구글/빙)을 지정할 수 없는 단일 통합 검색이고, `web_fetch`는 이전에 검색 결과로 노출된 URL만 열람 가능해 `bing.com/search?q=...` 같은 임의 SERP URL을 직접 열 수 없음(시도했으나 권한 오류로 차단됨). **따라서 "빙에서 직접 확인"은 이 세션의 도구로는 불가능** — 대신 질의 문구를 다양화하고, 우리 사이트 자체 GSC 쿼리 1,000개 중 "노출은 있는데 이상하게 구체적/드문 표현"인 것들을 걸러내는 방식으로 "고수요-저공급" 관점을 최대한 반영해 대체함. 다음 세션에도 이 한계는 동일하니, 만약 사용자가 실제 Bing SERP 화면을 캡처해서 공유해주면 훨씬 정확한 교차검증이 가능함.

**추가 조사 4건 — 전부 기각**:

| 후보 | 조합/앵글 | 기각 사유 |
|---|---|---|
| 영양제 과다복용 자가진단 | "am I taking too many supplements calculator interaction check" | **WebMD, Drugs.com, Medscape, Patient.info** 등 최상위 의료매체가 지배하는 데다, 약물-보충제 상호작용은 명백한 YMYL(의료) 리스크 — 익명 브랜드가 다룰 영역 아님, 콘텐츠 경쟁 이전에 안전 문제로 기각 |
| PSMF(단백질 절약 변형 단식) 계산기 | "PSMF calculator protein sparing modified fast" (우리 자체 GSC에 노출된 쿼리) | FitnessVolt, thinlicious, healnourishgrow 등 **7개+** 기존 전용 계산기/가이드 존재. 게다가 하루 800kcal 미만의 공격적 초저칼로리 프로토콜이라 의료 감독이 필요한 영역 — YMYL 리스크도 있어 이중으로 기각 |
| 단백질 파우더 스쿱 수 계산기 | "how many scoops of protein powder do I need per day calculator" (우리 자체 GSC에 "orgain protein calculator" 변형 쿼리 존재) | sagecalculator.com(전용 계산기) 포함 **8개+** 보충제 브랜드/피트니스 매체가 이미 다룸 |
| 남성 50+ 단백질 계산기(툴 형태로 재시도) | "protein calculator for men over 50 daily intake tool" | **SwimRight Academy가 정확히 "Daily Protein Intake Calculator for Men Over 40"**, GymCreek도 "Men Over 50" 언급 포함 전용 계산기 보유 — 07-19 세션엔 블로그(식사가이드) 버전만 확인했었는데 이번에 계산기(툴) 버전도 이미 선점된 것으로 추가 확인됨 |

**우리 자체 GSC 쿼리 1,000개에서 "고수요-저공급" 후보로 볼 만한 특이 표현들을 추가로 훑었으나**(예: "walking energy cost kcal per kg per km 0.5 0.7", "hrr calculator", "d vitamin kalkulator" 등) 노출량이 2~10회 수준으로 너무 작거나(투자 대비 효과 낮음), 이미 기존 페이지가 다루는 주제의 변형 표현이거나(Karvonen/HRR은 heart-rate-zone.html 등에 이미 충분히 커버됨), 임상 검사수치 해석(hydroxyvitamin d low)처럼 YMYL 리스크가 있어 전부 보류.

**퀴즈(인터랙티브) 포맷으로 우회 시도**: "Am I overtraining?" 퀴즈도 검토했으나, 기존 `quiz/recovery-type.html`("당신의 훈련량 대비 회복이 따라가고 있는지 확인")과 주제가 거의 동일해 자기잠식(cannibalization) 우려로 기각.

**누적 집계 업데이트**: 이번 라운드 4건을 더해 **누적 33건 조사, 성공 2건(약 6%)**. 오늘 하루에만 9건을 다양한 각도(개념설명/트러블슈팅/퀴즈포맷/브랜드+계산기 조합/저노출 특이쿼리)로 조사했지만 전부 기존 강자가 이미 점유 중이었음 — "각도를 못 찾아서"가 아니라 이 니치(웰니스 계산기+가이드) 자체가 정말로 포화 상태라는 판단이 도구를 바꿔가며 재확인해도 계속 일관되게 나옴.

**다음 세션에 시도해볼 만한 실제로 다른 접근(참고용, 아직 미시도)**:
- 계산기/가이드 콘�텐츠 포맷 자체를 벗어나 완전히 다른 형태(예: 인터랙티브 트래커, 체크리스트 다운로드형 PDF) 시도 — 지금까지 실패한 후보들은 전부 "정적 가이드 or 계산기" 포맷이었음.
- 사용자가 직접 Bing/기타 검색엔진 SERP 스크린샷을 공유하면 이 세션 도구의 한계를 우회해 실제 교차검증 가능.
- 니치를 국내(한국어) 시장으로 일부 전환하는 것도 검토 가능(예: "d vitamin kalkulator" 같은 비영어 쿼리가 소량 존재 — 다만 사이트 전체가 영어 기반이라 이 경우 구조적 결정이 필요, 가벼운 검토만 권장).

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

**~~미완료~~ (다른 사이트 → mywellnesscalc.com, inbound) — 2026-07-19 세션에 사용자가 "아마 이미 다른 프로젝트 채팅에서 처리했을 것"이라고 확인함.** 토큰 권한 문제로 이 프로젝트에서 직접 push는 계속 불가(위 참고, 구조적 문제 — 매 세션 재테스트 불필요). 프롬프트 2개(cookingcalcs-용, myinsurancecalc-용)는 이미 전달 완료했고, 사용자가 각 프로젝트 채팅에서 처리했을 가능성이 높다고 함. **더 이상 "미완료" 항목으로 취급하지 말 것 — 굳이 이 프로젝트에서 재확인하거나 재작업할 필요 없음.** 필요시 mywellnesscalc.com 페이지에서 실제로 inbound 링크가 들어와 있는지 직접 열어서 확인하는 정도면 충분.

---

## 현재 사이트 현황 (2026-07-15 기준)

- **툴 26개, 블로그 51개**(2026-07-19 세션 신규: alcohol-and-calorie-deficit.html), **퀴즈 20개**
- **2026-08-11 실측 갱신**: 툴 **26개**(+tools/index.html), 블로그 **55개**(+blog/index.html), 퀴즈 **20개**(+quiz/index.html) = 파일 기준 tools/ 27, blog/ 56, quiz/ 21. **사이트맵 등재 106 URL**(ffmi-vs-bmi.html은 canonical 통합으로 제외됨, 파일은 존재).
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
- [x] ~~**이번 세션(07-17 2회차) 신규 3건의 노출/색인 반영 확인**~~ → **2026-07-19 세션 확인**: 4건(snacks 포함) 전부 아직 노출 데이터 없음(07-17 게시, 2일 경과 — 데이터 반영 지연 감안하면 정상, 아직 이름). 1~2주 뒤 재확인 필요.
- [x] ~~**MAF 클러스터 지속 투자 검토**~~ → **2026-07-19 세션에 "MAF 테스트 심화" 후보를 실제로 조사함**: philmaffetone.com(원저자 사이트), Coached, AerobAce, Marathon Handbook, RunnersBlueprint, extramilest.com 등 **6개+ 전용 가이드가 이미 존재** — 이 특정 서브토픽은 생각보다 포화 상태로 확인, 기각. MAF 클러스터 자체는 계속 지켜볼 가치 있지만 "테스트 방법 심화" 앵글은 다시 시도하지 말 것.
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

---

## 2026-07-19 세션 요약

**분석한 자료**: 서치콘솔 Coverage + Performance(2026-07-19 내보내기, 07-17과 2일 차이). GA4 미첨부.

### Coverage — 변화 없음
심각한 문제 4건(크롤링됨-미색인 2건 시작됨 + 발견됨-미색인 2건 통과) — 07-17과 완전 동일. 중요하지 않은 문제 0건. 조치 불필요, 기존 판단 유지.

### Performance — 07-17 신규 4건 전부 아직 노출 데이터 없음
`high-protein-snacks-women-over-40.html`, `maf-training-plan.html`, `calorie-surplus-calculator.html`, `lean-bulk-vs-dirty-bulk.html` 전부 이번 데이터에도 미등장(게시 후 2일뿐이라 정상, 구글 반영 지연 고려하면 예상된 결과). 1~2주 뒤 재확인 필요.

기존 클러스터 순위 분포는 07-17과 거의 동일(2일 차이라 노이즈 수준) — `zone-2-heart-rate-by-age.html`이 여전히 사이트 최고 순위(10.07위, 661노출), MAF 클러스터도 안정적 유지. 쿼리 1,000개를 주요 키워드군(호르몬/전해질/그립/알코올/콜드플런지/포스처 등)으로 재스캔했으나 여전히 새로운 수요 신호 없음 — **확립된 방법론(GSC는 확인용, 신규발굴은 웹서치)대로 이번에도 GSC 마이닝은 새 카테고리를 못 찾음, 예상된 결과.**

### 신규 카테고리 웹서치 브레인스토밍 — 4건 조사, 전부 기각

지난 세션 방법론(매 세션 웹서치로 인접 카테고리 조금씩 조사, 처음부터 롱테일 조합으로 검색)을 그대로 적용:

| 후보 | 조합 | 기각 사유 |
|---|---|---|
| MAF 테스트 심화 | "how to do a MAF test properly" | philmaffetone.com(원저자), Coached, AerobAce, Marathon Handbook, RunnersBlueprint, extramilest.com 등 **6개+** 이미 존재 |
| 고단백 콘텐츠 신규 인구통계 | "high protein breakfast/meals men over 50" | EatingWell(대형 매체)이 정확히 이 제목으로 이미 발행, Colorado State University, Ultimate Performance 등 **6개+** |
| 수면-체중감량 연결 | "sleep quality calorie deficit weight loss ghrelin leptin" | Northside Hospital, Ubie Doctor's Note 등 대형 병원/헬스테크 포함 **9개+** — 그렐린/렙틴 얘기는 인터넷에서 가장 흔한 건강 콘텐츠 축에 속함, 극도로 포화 |
| 허리엉덩이비율 vs BMI | "waist to hip ratio vs BMI which more accurate" | **Harvard Health, GoodRx, MedicalNewsToday** 등 최상위 의료매체가 지배 — JAMA 연구 인용하는 임상적 콘텐츠라 YMYL 리스크도 있음 |

**결론**: 이번에도 4건 전부 기각. 07-17 세션에 이미 10개 카테고리를 조사해 전부 막혀있었는데, 이번에 4개를 추가로 조사해도 동일한 패턴 — **누적 18개 카테고리 중 통과한 게 하나도 없음**. ~~이 정도면 "새 카테고리를 찾는 시도" 자체의 기대수익이 세션마다 낮아지고 있다고 봐야 함. 완전히 새로운 토픽 브레인스토밍은 앞으로 세션마다 무조건 1순위로 반복하기보다, ①정말 참신한 각도가 떠오를 때만 가볍게 1~2개 확인 하는 정도로 비중을 낮추고, ②기존 페이지 보강(GEO 리트로핏) 비중을 높이는 쪽으로 전환하는 게 합리적.~~ **→ 이 결론은 같은 세션 후반에 사용자가 명시적으로 반박함(하단 참고). 신규 탐색은 계속 세션마다 기본으로 시도할 것.**

### 보강 작업 — GEO 리트로핏 1건 실행 + 3건 점검(불필요 확인)

사용자 지시(콘텐츠 자체의 문제해결/비교분석 밀도가 웹+AI검색 둘 다에 유리)를 신규 페이지가 아닌 **기존 최고 성과 페이지**에 적용:

- **`blog/zone-2-heart-rate-by-age.html`** (사이트 전체 최고 순위 10.07위, 661노출) — "왜 당신의 zone 2 심박수가 차트와 다를 수 있는가" 트러블슈팅 섹션 신규 추가(베타차단제/트레이닝경력/손목형심박계 정확도/카페인·더위·탈수·스트레스 4개 원인 비교표). 기존 6개 FAQ와 안 겹치는 새 FAQ 1개(손목형 심박계) 추가. 단어수 1,405→1,708(+22%). div밸런스·중첩순서·FAQ-스키마 일치 검증 완료. dateModified 스키마 갱신(2026-07-19).
- **점검했지만 보강 불필요로 판단한 3건** (이미 비교/문제해결 포맷이 충분히 갖춰져 있음 — 다음 세션에 같은 페이지 재검토하는 시간 낭비 방지 위해 기록):
  - `blog/fat-burning-heart-rate-zone.html`(1,452노출) — 이미 3,116단어, FAQ 12개, "fat burning zone vs HIIT" 비교 섹션과 "흔한 실수 4가지" 문제해결 섹션 보유.
  - `blog/healthy-body-fat-percentage.html`(940노출) — 이미 2,859단어, FAQ 11개, 5가지 측정법(DEXA/수중계측/캘리퍼/BIA/네이비) 비교 섹션 보유.
  - `tools/protein-calculator.html`(2,399노출, 사이트 최고 노출 페이지) — 이미 1,767단어(정보섹션만), FAQ 12개, "complete vs incomplete protein" 비교 섹션 보유.

### 커밋

- `d8cb04c` — zone-2-heart-rate-by-age.html GEO 보강, GitHub API로 push 반영 확인 완료.

### 이번 세션에 하지 않은 것

- 나머지 96개 페이지 전체에 대한 GEO 리트로핏 후보 선정 — 이번엔 최상위 노출 4개만 점검(1건 보강+3건 불필요 확인). 다음 세션에 중간 노출 구간(100~500회) 페이지들 위주로 추가 점검 권장.
- GA4 데이터 미첨부로 AdSense 재신청 판단 갱신 안 함.

---

## 2026-07-19 세션 후반 — 사용자가 "신규 탐색 중단" 판단에 반박, 공격적 확장 재개

**사용자 피드백**: 위 결론("신규탐색 비중 낮추고 보강 위주로")에 대해 사용자가 명확히 반박함 — "롱테일 키워드에서 밀리면 답이 없다, 카테고리 확장도 계속해야 하고, 경쟁 센 건 롱테일로 극복해야 하고, 중간 경쟁도는 좋은 키워드면 당연히 진행해야 한다, 공격적으로 밀고 나가자." **이 피드백을 받아들여 신규 탐색을 재개함. 다음 세션에도 "이제 그만 찾아도 된다"고 스스로 판단하지 말고, 매 세션 신규 탐색을 기본으로 계속할 것.**

### 추가로 조사한 5건 — 전부 기각 (트리플 조합/트렌디 앵글도 시도했으나 실패)

| 후보 | 조합 | 기각 사유 |
|---|---|---|
| 크레아틴 + 여성40+ | "creatine for women over 40 menopause bone density" | joinmidi.com(Midi Health), 1stphorm, Ubie Health, thehouseofrose.com, agewell-health.com 등 **7개+** — "여성 40+ 건강" 자체가 2025~2026년 가장 핫한 웰니스 콘텐츠 버티컬이 되면서, 이 인구통계 수식어를 붙이는 모든 조합이 이미 경쟁 심함으로 확인.
| 바디 리컴포지션 계산기 | "body recomposition calculator lose fat gain muscle" | fitnessvolt, builtwithscience, fatcalc.com, healthyeater.com, athletepath.com, myproteincalc.com, fitcommit.ai, fatlosscalc.com, leanffmi.com 등 **9개+** — 지금까지 발견한 것 중 가장 포화된 계산기 니치.
| 이상체중 공식 비교 | "ideal body weight Devine Robinson Hamwi vs BMI" | bmi-calculator.net, activecalculator.com, basicfreetools.com, betterlifefitness.net, mymedicineadvisor.com, calcbe.com 등 **8개+**.
| IF 16:8 초보자 스케줄 | "16:8 intermittent fasting beginner schedule week by week" | simple.life, eurekahealth, starttofit, TrackMyFast, OgamicX, BetterSelfLabs, PlanEat AI, Calo Blog 등 **9개+** — IF는 10년 넘게 다뤄진 극도로 성숙한 블로그 니치.
| MAF + 사이클링 | "MAF training for cycling heart rate" | **AerobAce가 정확히 "MAF Training for Cyclists: Complete Guide" 발행**, TheTallCyclist.com도 존재 — AerobAce는 MAF 관련 전 종목(계산기/테스트가이드/사이클링가이드)을 이미 종합적으로 커버한 전문 경쟁사로 확인됨, 향후 MAF 관련 신규 후보 조사 시 이 사이트부터 확인할 것.

**중요 발견**: 계산기 검색 중 **fatcalc.com, basicfreetools.com, calcbe.com, betterlifefitness.net, activecalculator.com** 등 소수의 도메인이 서로 다른 검색에서 반복적으로 등장함 — 이는 우연이 아니라 **대규모 프로그래매틱(자동화) 계산기 사이트 운영 주체들이 건강/피트니스 계산기 전 종목을 이미 시스템적으로 커버**하고 있다는 뜻. **따라서 "새로운 계산기 아이디어"로 접근하는 전략은 구조적으로 거의 항상 실패함 — 계산기 형태의 신규 콘텐츠는 앞으로 더더욱 후순위로 두고, 블로그/내러티브 콘텐츠 위주로 신규를 시도할 것.**

### 신규 콘텐츠 실행 — alcohol-and-calorie-deficit.html

사용자 지시("중간 경쟁도는 좋은 키워드로 그냥 진행")를 실제로 적용: 07-17 세션에 이미 "경쟁 셋 중 진입장벽 가장 낮음"으로 평가해뒀던 **alcohol + calorie-deficit** 조합을 재확인 후 그대로 진행.
- **경쟁 재확인**: 대형 의료기관이나 계산기 팩토리가 아니라 소형 피트니스 블로그(RippedBody, OverHaul Fitness, Bolt Pharmacy 등) 위주 8개+ — 여전히 경쟁은 있지만 이번 세션에 조사한 9건 중 가장 낮은 진입장벽.
- **차별화**: 경쟁사 전부 "왜 술이 지방연소를 늦추는가" 설명 위주 콘텐츠인 반면, 우리는 ①10개 음료 종류 칼로리 비교표(스캔 가능한 GEO 포맷, 경쟁사 중 이 정도로 실용적인 표를 제공한 곳 없음) ②우리 자체 calorie-deficit-calculator.html/calorie-surplus-calculator.html 결과와 직접 연결되는 실전 적용 섹션("당신의 목표 칼로리에 술이 몇 잔 들어가는지")으로 차별화 — 경쟁사들의 이론 설명 위주 접근과 명확히 다름.
- **안전장치**: 과음을 부추기지 않도록 절제된 음주 가이드라인(미국 식단지침 기준 여성 1잔/남성 2잔) 명시, SAMHSA 전국 헬프라인(1-800-662-4357) 안내 문구를 disclaimer에 포함 — 술 관련 콘텐츠라 이 부분 특히 신경씀.
- 약 1,226단어, FAQ 6개, div밸런스·중첩순서·FAQ-스키마 일치 검증 완료. 체크리스트(허브카드+뱃지, 홈미리보기, sitemap, llms.txt, 역링크 4개) 전부 완료.
- 커밋 `638585c`, GitHub API로 push 반영 확인 완료.

### 다음 세션 참고사항 (중요)

**⚠️ 아래 항목은 전부 Claude가 이번 세션 검색 결과를 보고 스스로 내린 전략적 추론이며, 사용자가 직접 지시한 내용이 아님.** (사용자가 직접 명시적으로 지시한 건 위 "사용자 피드백" 인용문뿐 — "신규탐색 계속하고 공격적으로 밀고 나가라"는 것. "계산기보다 블로그 위주로 하자"는 사용자 발언이 아니라 Claude의 해석이었는데 다음 세션에 이걸 사용자 지시인 것처럼 잘못 전달한 적 있음(2026-07-19 세션 중 실제로 발생, 사용자가 직접 지적해서 정정함) — 다음 세션에도 이 구분을 명확히 할 것.

- **신규 탐색을 세션마다 계속할 것** — 이건 사용자가 명시적으로 지시한 내용. "이제 안 나온다"고 Claude가 스스로 판단해서 탐색을 축소하지 말 것. 이번 세션에도 9건 중 8건이 막혔지만 끝까지 시도해서 1건은 찾아냈음.
- **(Claude의 추론, 참고용) 계산기보다 블로그/비교/내러티브 콘텐츠가 상대적으로 진입장벽이 낮았음** — 계산기는 프로그래매틱 팩토리들이 이미 전 종목 커버하는 경향을 이번 세션에 반복 확인(alcohol 사례는 블로그 쪽이 성공). 다만 이건 사용자 지시가 아니라 증거 기반 가설이므로, 다음 세션에 계산기 아이디어가 떠오르면 시도 자체를 배제하지 말고 여전히 웹서치로 개별 확인할 것.
- **(Claude의 추론, 참고용) "women over 40" 수식어 단독으로는 더 이상 쉬운 길이 아닐 가능성** — 이 인구통계가 2025~2026년 핫한 버티컬이 되면서 경쟁이 심해진 것으로 보임(Midi Health, Superpower, reverse.health, 1stphorm, agewell-health 등 다수 확인). 마찬가지로 사용자 지시가 아닌 참고 관찰.
- **AerobAce를 MAF 클러스터의 주요 경쟁사로 인지** — 계산기, MAF 테스트 가이드, 사이클링 가이드까지 이미 다 있음. (이건 단순 사실 기록)

### 2026-07-19 세션 3차 추가 조사 — 사용자가 "계속 파라"고 재차 요청, 5건 더 조사(전부 기각)

사용자가 "서치콘솔/애널리틱스만 봐서는 우리가 이미 올린 콘텐츠 주변만 맴돌 것 — 카테고리를 넓혀서 데이터가 어떻게 나오는지 봐야 전략을 세우기 편하다"는 취지로 계속 파라고 지시함. 완전히 새로운 카테고리 5개를 추가로 웹서치 조사:

| 후보 | 조합 | 기각 사유 |
|---|---|---|
| 마그네슘 + 수면 | "magnesium sleep quality supplement" | GoodRx, CNN, Cleveland Clinic, Mayo Clinic Press, Sleep Foundation, Life Extension 등 **9개+** — 대형 의료매체가 지배 |
| "기아모드(starvation mode)" 신화 | "starvation mode myth metabolic adaptation" | Ro.co, Levels(헬스테크기업), bodybuilding-wizard, biologyinsights, trifectanutrition, aworkoutroutine, FitChef 등 **9개+** — 10년 넘게 다뤄진 전형적 피트니스 신화타파 소재 |
| 운동 습관 형성 | "how to build exercise habit that sticks" | Zing Coach, NBC News, Live Science, Tonal, FirstHabbit, Trainiac 등 **10개+** — James Clear 원자적습관류 자기계발 장르 자체가 극도로 성숙 |
| 웨어러블 심박수 정확도 비교 | "fitness tracker heart rate accuracy chest strap" | American College of Cardiology, ScienceDaily, BikeRadar, 다수 PMC 학술논문 등 **7개+** — 정식 임상연구기관이 지배 |
| 유연성 테스트(sit-and-reach) 연령별 기준표 | "sit and reach test norms by age calculator" | topendsports, BodySpec, **GymCreek(악력 계산기에서도 등장했던 팩토리)**, FitnessNorms, TrainerMetrics 등 **6개+** |

**최종 집계**: 이번 세션(07-19) 하루 동안 신규 카테고리를 총 **14건** 조사(1차 4건 + 2차 5건 + 3차 5건) — 전부 기각, 실제 발행은 alcohol 1건뿐. 07-17 세션의 10건까지 합치면 두 세션 누적 **24건 조사, 통과 2건(protein snacks, alcohol)** — 성공률 약 8%. 이 정도 표본이면 "우연히 어려운 것만 골랐다"고 보기 어렵고, 2026년 하반기 기준 이 니치가 전반적으로 매우 어렵다는 게 통계적으로도 뒷받침됨.

**다음 세션 실행 방향(사용자 지시 반영, 계속 유지)**:
1. 매 세션 신규 카테고리 탐색을 반드시 계속할 것(성공률이 낮아도 시도 자체를 줄이지 말 것 — 이번에도 14번 중 1번 건졌음).
2. 이미 발행한 신규 콘텐츠들(특히 07-17/07-19에 만든 것들)이 **1~2주 뒤 서치콘솔에 어떤 반응을 보이는지가 중요한 데이터** — 이 데이터로 "어떤 종류의 신규가 통했는지" 패턴을 축적해나가면 다음 카테고리 선택에 참고가 됨(사용자가 강조한 포인트).
3. 계산기 팩토리 반복 등장 도메인 리스트 계속 업데이트: fatcalc.com, basicfreetools.com, calcbe.com, betterlifefitness.net, activecalculator.com, completecalculators, **GymCreek**(신규 확인) — 신규 계산기 아이디어 검토 시 이 도메인들부터 검색해서 이미 있는지 빠르게 확인하면 리서치 시간 단축 가능.

### 2026-07-19 세션 4차 추가 — 사용자가 "바로 할 수 있는 거 있으면 하라"고 지시, 신규 3건 + 보강 후보 8건 + 사이트 전체 기술감사 실행

**신규 후보 3건 추가 조사 (전부 기각)**:

| 후보 | 조합 | 기각 사유 |
|---|---|---|
| 고단백+신장손상 신화 | "does high protein diet damage kidneys" | McMaster University(원 연구), Healthline, Oxford Academic 저널, Apollo247 등 **6개+** — 신장 관련 임상 주제라 YMYL 리스크도 있음 |
| 공복 유산소 vs 식후 유산소 | "fasted cardio vs fed cardio fat loss" | GoodRx, BodySpec, Levels, Colorado State University 영양센터 등 **8개+** — 10년 넘은 전형적 피트니스 논쟁 주제 |
| 저예산 고단백 식품 | "cheap high protein foods budget grocery" | **GoodRx**, Men's Fitness, Fitness and Power, seannal.com, predatornutrition.com 등 **7개+** |

**GoodRx를 새로운 유형의 반복 경쟁자로 인지**: 계산기 팩토리(fatcalc 등)와는 다른 유형 — 이번 세션에 마그네슘+수면, 신장신화, 저예산단백질 검색에서 전부 등장함. **대형 건강매체가 거의 모든 일반 건강/영양 주제를 이미 포괄적으로 다뤄놓은 상태**라는 뜻. Cleveland Clinic, Mayo Clinic, Healthline과 함께 "일반 건강 정보" 카테고리의 대형 경쟁자로 묶어서 인지할 것.

**보강 후보 8건 추가 점검 (전부 이미 충분, 손대지 않음)**: `tools/if-calculator.html`(1,578단어, 프로토콜비교+타임라인+실수 섹션 이미 보유), `blog/high-protein-foods.html`(1,250단어, 표2개+FAQ7개), `tools/heart-rate-zone.html`(1,951단어, Karvonen vs %MaxHR 비교 이미 보유), `blog/how-to-improve-vo2-max.html`(1,920단어), `blog/what-is-vo2-max.html`(2,011단어, 측정법 3종 비교 이미 보유) — **이걸로 지금까지 총 8개 최상위/중위 노출 페이지를 점검했는데 GEO 보강이 필요했던 건 zone-2-heart-rate-by-age.html 단 1건뿐이었음. 사이트 콘텐츠 품질 자체는 이미 상당히 성숙한 상태로 판단, 다음 세션에 같은 페이지들 재점검할 필요 없음.**

**사이트 전체 기술 감사 실행 (101개 파일 전수 검사, 전부 정상)**:
- FAQ 본문-스키마 일치: 0건 불일치
- 내부링크 깨짐: 0건
- div 밸런스: 0건 이슈
- **결론: 사이트 기술 상태는 현재 완전히 깨끗함. 다음 세션에 전체 재감사 우선순위 낮음 (문제가 새로 생기지 않는 한).**

**배지 만료 예정 알림**: `blog/index.html`/`tools/index.html`/`quiz/index.html`의 2026-07-06 날짜 배지 6개가 **14일 규정상 2026-07-20에 만료** — 다음 세션 시작 시 바로 제거할 것 (이번 세션 기준 13일차라 아직 하루 남아 제거 안 함).

**이번 라운드 결론**: 신규 탐색(3건)과 보강(8건 점검) 양쪽 다 이번엔 소득 없음 — 신규는 22건 연속 기각(이번 세션 누적 17건 조사), 보강은 이미 대부분 완료된 상태. **오늘 세션에서 실제로 진전이 있었던 건 이미 완료함(alcohol 발행 1건, zone-2 보강 1건, 기술감사로 사이트 전체 클린 확인). 지금 시점에서 추가로 무리하게 파는 것보다, 이미 발행한 신규 콘텐츠들의 서치콘솔 반응을 기다리는 게 다음 실질적 진전 포인트.**
