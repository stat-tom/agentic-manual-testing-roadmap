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
<paste prompt here>
```

Result / notes:

---

## Stage 2 — Test case design

**Goal:** design positive, negative and edge test cases from the spec.
**Tool:** Claude
**Outcome in Jira:** 52 test cases — Login 8, Rooms 14, Booking 19, Confirmation 8, Browser tab title 3

### Prompt 1

```text
<paste prompt here>
```

Result / notes:

---

## Stage 3 — Test case creation in Jira

**Goal:** put the designed test cases into Jira project `BOOK`.
**Tool:** Claude
**Outcome in Jira:** BOOK-1 … BOOK-52, named `TC-<AREA>-<nn>`

### Prompt 1

```text
<paste prompt here>
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
