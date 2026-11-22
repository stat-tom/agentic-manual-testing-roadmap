# BookNow — Prompt Log

**Project:** BookNow Testing (Jira key `BOOK`) — hotel room booking web app
**Sprint:** BOOK Sprint 1
**Spec:** `booknow-sprint-requirements.md`

Every prompt used in the project, grouped by testing stage. Stages follow the order of the work: spec → test cases → exploratory session → bugs → fixes → verification → report.

To add a prompt, copy the block below into the right stage and fill it in:

```text
Prompt N — <short title>
Tool:
Date/time:

<paste the prompt here>
```

Result / notes: <what it produced, link or Jira keys>

---

## Stage 1 — Requirements analysis

**Goal:** understand the spec and the app before designing any tests.
**Tool:** Claude
**Inputs:** `booknow-sprint-requirements.md`, `index.html`, `app.js`
**Spec areas:** §1.1 Login, §1.2 Rooms, §1.3 Booking, §1.4 Confirmation, §1.5 General

### Prompt 1

```text
Prompt 1 — Describe app features and expected validations
Tool: Claude
Date/time: 2026-11-22 21:30

Based on this HTML and JavaScript, describe all the features and
user interactions on this page. Also list any validations you would
expect a well-built version of this app to have.
```

Result / notes:

### Prompt 2

```text
Prompt 2 — Sprint test plan
Tool: Claude
Date/time: 2026-11-22 21:32

Based on the requirements document I attached, write a concise test plan
for the current sprint.
Features in scope: Login, Rooms, Booking, Confirmation, browser title tab.
Out of scope: Real payment processing, live availability/inventory, user registration and password reset,
  account/profile pages, email confirmations, multi-currency, and search/filtering.
Tester: one QA, 3 days, Chrome on staging.
Include: scope, approach, entry criteria, exit criteria, prioritisation, risks.
Exit criteria must be specific — all High tests executed, zero Priority 1 bugs
open, max two Priority 2 bugs open with developer acknowledgement.
```

Result / notes:

### Prompt 3

```text
Prompt 3 — Rewrite risks section
Tool: Claude
Date/time: 2026-11-22 21:33

Rewrite the risks section with three specific risks.
First: total ignores the number of nights — may block booking tests until resolved.
Second: no staging, all tests run on local file.
Third: booking state not persisted across sessions.
```

Result / notes:

---

## Stage 2 — Test case design

**Goal:** design positive, negative and edge test cases from the spec.
**Tool:** Claude
**Outcome in Jira:** 52 test cases — Login 8, Rooms 14, Booking 19, Confirmation 8, Browser tab title 3

### Prompt 1

```text
Prompt 1 — Positive test scenarios
Tool: Claude
Date/time: 2026-11-22 21:34

You are a QA engineer testing BookNow, a room booking application.
Based on the requirements and app code I have attached, generate all positive
test scenarios for each of these features: Login, Rooms, Booking, Confirmation, browser title tab.
List every scenario where the application should work correctly when used as intended.
Present as a numbered list grouped by feature — scenario titles only, no steps yet.
```

Result / notes:

### Prompt 2

```text
Prompt 2 — Full test cases from scenarios
Tool: Claude
Date/time: 2026-11-22 21:35

Turn scenarios from each section into full test cases.
Format each as: TC ID, Title, Preconditions, Steps numbered one per line,
Expected Result, Priority. Group by feature.
```

Result / notes:

---

## Stage 3 — Test case creation in Jira

**Goal:** put the designed test cases into Jira project `BOOK`.
**Tool:** Claude
**Outcome in Jira:** BOOK-1 … BOOK-52, named `TC-<AREA>-<nn>`

### Prompt 1

```text
Prompt 3 — Jira tasks from scenarios
Tool: Claude
Date/time: 2026-11-22 21:36

Turn scenarios from each section into Jira Tasks in project BOOK.
Each task: summary, preconditions, numbered steps, expected result,
label by feature name, priority High.
Assign to the current sprint.
```

Result / notes:

---

## Stage 4 — Exploratory testing session (Antigravity)

**Goal:** explore the buggy app against the spec and find defects.
**Tool:** Antigravity
**Status:** to be added manually

### Prompt 1

```text
<paste Antigravity prompt here>
```

Result / notes:

### Prompt 2

```text
<paste Antigravity prompt here>
```

Result / notes:

---

## Stage 5 — Test execution and bug reporting

**Goal:** execute the test cases against the app and write bug reports for what fails.
**Tool:** Claude
**Outcome in Jira:** 14 bugs, BOOK-53 … BOOK-66 (1 Critical, 6 High, 5 Medium, 2 Low)

### Prompt 1

```text
<paste prompt here>
```

Result / notes:

---

## Stage 6 — Bug fixing (Copilot)

**Goal:** fix the reported bugs in `app.js`, `index.html` and `style.css`.
**Tool:** GitHub Copilot
**Status:** to be added manually

### Prompt 1

```text
<paste Copilot prompt here>
```

Result / notes:

### Prompt 2

```text
<paste Copilot prompt here>
```

Result / notes:

---

## Stage 7 — Fix verification and retest

**Goal:** verify each fix on the fixed build and close the related bugs and test cases.
**Tool:** Claude

### Prompt 1

```text
<paste prompt here>
```

Result / notes:

---

## Stage 8 — Test reporting

**Goal:** summarise Sprint 1 results and give a Go / No-Go recommendation.
**Tool:** Claude
**Outcome:** `test-report-sprint-1.md`

### Prompt 1

```text
<paste prompt here>
```

Result / notes:
