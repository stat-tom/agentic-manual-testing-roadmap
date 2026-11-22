# BookNow — Prompt Log

**Project:** BookNow Testing (Jira key `BOOK`) — hotel room booking web app
**Sprint:** BOOK Sprint 1
**Spec:** `booknow-sprint-requirements.md`

Every prompt used in the project, grouped by testing stage. Stages follow the order of the work: spec → test cases → exploratory session → bugs → fixes → verification → report.

To add a prompt, copy the block below into the right stage and fill it in:

```text
Prompt N — <short title>
Tool:

<paste the prompt here>
```

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

Based on this HTML and JavaScript, describe all the features and
user interactions on this page. Also list any validations you would
expect a well-built version of this app to have.
```

### Prompt 2

```text
Prompt 2 — Sprint test plan
Tool: Claude

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

### Prompt 3

```text
Prompt 3 — Rewrite risks section
Tool: Claude

Rewrite the risks section with three specific risks.
First: total ignores the number of nights — may block booking tests until resolved.
Second: no staging, all tests run on local file.
Third: booking state not persisted across sessions.
```

---

## Stage 2 — Test case design

**Goal:** design positive, negative and edge test cases from the spec.
**Tool:** Claude
**Outcome in Jira:** 52 test cases — Login 8, Rooms 14, Booking 19, Confirmation 8, Browser tab title 3

### Prompt 1

```text
Prompt 1 — Positive test scenarios
Tool: Claude

You are a QA engineer testing BookNow, a room booking application.
Based on the requirements and app code I have attached, generate all positive
test scenarios for each of these features: Login, Rooms, Booking, Confirmation, browser title tab.
List every scenario where the application should work correctly when used as intended.
Present as a numbered list grouped by feature — scenario titles only, no steps yet.
```

### Prompt 2

```text
Prompt 2 — Full test cases from scenarios
Tool: Claude

Turn scenarios from each section into full test cases.
Format each as: TC ID, Title, Preconditions, Steps numbered one per line,
Expected Result, Priority. Group by feature.
```

---

## Stage 3 — Test case creation in Jira

**Goal:** put the designed test cases into Jira project `BOOK`.
**Tool:** Claude
**Outcome in Jira:** BOOK-1 … BOOK-52, named `TC-<AREA>-<nn>`

### Prompt 1

```text
Prompt 3 — Jira tasks from scenarios
Tool: Claude

Turn scenarios from each section into Jira Tasks in project BOOK.
Each task: summary, preconditions, numbered steps, expected result,
label by feature name, priority High.
Assign to the current sprint.
```

---

## Stage 4 — Exploratory testing session (Antigravity)

**Goal:** explore the buggy app against the spec and find defects.
**Tool:** Antigravity
**Status:** to be added manually

### Prompt 1

```text
Prompt 1 — Playwright MCP setup and exploratory session
Tool: Antigravity

First set up the Playwright MCP server (if not yet done) so you can drive a real browser, then run an
exploratory testing session.

SETUP (do this before exploring):
1. Add the Playwright MCP server to my MCP configuration:
   "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] }
2. Install the Playwright browsers: npx playwright install
3. Confirm the Playwright MCP tools are now available to you. If they are NOT available,
   tell me to restart Antigravity so it picks up the newly added Playwright MCP server,
   and wait until the tools appear before continuing.

EXPLORE (once the Playwright MCP is running):
4. Using the Playwright MCP, open the BookNow application  in the
   browser. Explore all user-facing features — Login, Rooms, Booking, Confirmation, browser title tab. Test interactions, check
   validations, probe edge cases, and surface any bugs, missing functionality, or unexpected
   behaviour you find.
5. Report each finding as a short title and one-sentence description.
```

---

## Stage 5 — Linking bugs to test tasks in Jira

**Goal:** link each reported bug to the test case task it relates to, so tasks and bugs are traceable.
**Tool:** Claude
**Outcome in Jira:** each bug linked to its matching `BOOK` task as related work

### Prompt 1

```text
Prompt 1 — Link bugs to test tasks
Tool: Claude

Go to the Jira BOOK project. Match each bug that was created to its corresponding existing task,
and link the two as related work so the relationship is clear on both issues.
If you are unsure about a match, ask me before linking.

Example of a pair that should be linked:
https://web-ai-testing.atlassian.net/browse/BOOK-51
and
https://web-ai-testing.atlassian.net/browse/BOOK-53
```

---

## Stage 6 — Bug fixing and PR (Copilot)

**Goal:** fix the bugs reported in Jira project `BOOK`, deliver the fixes in a pull request and move the bugs to In progress.
**Tool:** Copilot
**Outcome:** fixes on a new branch, pull request opened, bugs set to `In progress` / `W toku` in Jira

### Prompt 1

```text
Prompt 1 — Fix Jira bugs and open PR
Tool: Copilot

Fix the bugs created in Jira project BOOK one by one. 
Apply the fixes in a new branch and create a PR when done. 
Change Jira statuses of each bug to 'In progress'/'W toku' after that.
```

---

## Stage 7 — Test execution and bug reporting

**Goal:** execute the test cases against the app and write bug reports for what fails.
**Tool:** Claude
**Outcome in Jira:** 14 bugs, BOOK-53 … BOOK-66 (1 Critical, 6 High, 5 Medium, 2 Low)

### Prompt 1

```text
Prompt 1 — Verification procedures for fixed bugs
Tool: Claude

Go to project BOOK in Jira for the list of bugs that were fixed for BookNow app.
For each bug, write a three-step verification procedure.
```

### Prompt 2

```text
Prompt 2 — Regression areas after fixes
Tool: Claude

What other areas of the app should I regression test to make sure the fixes
did not introduce new problems?
```

### Prompt 3

```text
Prompt 3 — Highest-risk regression areas
Tool: Claude

From this regression list, which 5 areas are highest risk given the implemented fixes?
Explain your reasoning.
```

---

## Stage 8 — Fix verification and retest

**Goal:** verify each fix on the fixed build and close the related bugs and test cases.
**Tool:** Antigravity (optional support)
**Note:** this stage is manual work; Antigravity can be used to support the retest session.

### Prompt 1

```text
Prompt 1 — Retest session on fixed bugs
Tool: Antigravity

Run testing session again and check if the bugs listed in Jira project BOOK are fixed. Create a concise session summary after.
```

---

## Stage 9 — Test reporting

**Goal:** summarise Sprint 1 results and give a Go / No-Go recommendation.
**Tool:** Claude
**Outcome:** `test-report-sprint-1.md`

### Prompt 1

```text
Prompt 1 — Sprint 1 test summary report
Tool: Claude

Read all issues in Jira project BOOK for BOOK Sprint 1.
Count test case Tasks by label status — how many passed, failed, blocked, not executed.
Count Bug issues by priority — Critical, High, Medium, Low.
List which bugs are resolved and which are still open with their ticket numbers.
Then generate a professional test summary report including: executive summary,
execution summary with pass rate, defect summary by severity, outstanding risks
from open bugs, and a go/no-go recommendation with rationale.
Save the report as test-report-sprint-1.md in my project folder.
```
