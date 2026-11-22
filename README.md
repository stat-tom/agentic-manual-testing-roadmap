# Agentic Manual Testing Roadmap

**From project requirements to a Go/No-Go test report — using AI agents for every stage of manual testing.**

This repository documents a repeatable, end-to-end manual-testing workflow in which AI agents (Claude, Antigravity, Cursor, GitHub Copilot) do the heavy lifting while a human tester stays in control of every decision. It is demonstrated on **BookNow**, a small hotel room-booking web app, but the process is project-agnostic and meant to be reused.

- **Jira project:** [BOOK — BookNow Testing](https://web-ai-testing.atlassian.net/jira/software/projects/BOOK/summary)
- **Sprint:** BOOK Sprint 1
- **Final report:** [resources/test-report-sprint-1.md](resources/test-report-sprint-1.md)

---

## Table of contents

1. [Principles](#principles)
2. [Workflow at a glance](#workflow-at-a-glance)
3. [Stage-by-stage guide](#stage-by-stage-guide)
4. [Repository structure](#repository-structure)
5. [Tooling and setup](#tooling-and-setup)
6. [Reusing this process on another project](#reusing-this-process-on-another-project)
7. [BookNow Sprint 1 results](#booknow-sprint-1-results)
8. [Conventions](#conventions)
9. [License](#license)

---

## Principles

- **Human in the loop.** Agents propose; the tester reviews, confirms, filters noise and makes the final Go/No-Go call.
- **Spec first.** Every test, finding and bug traces back to a section of the requirements document.
- **Jira is the source of truth.** Test cases, bugs and statuses live in Jira; the final report is built from live Jira data, not from memory.
- **Everything is logged.** Every prompt is recorded per stage in [resources/Prompts.md](resources/Prompts.md) so the run can be audited and replayed.
- **Right tool for each stage.** Different agents are used where they are strongest (reasoning, browser automation, code-aware editing).

---

## Workflow at a glance

```text
Requirements ─► 1 Requirements analysis ─► 2 Test case design ─► 3 Test cases (Jira)
                                                                        │
                                                                        ▼
                     6 Bug fixing and PR ◄─ 5 Bug reports and linking ◄─ 4 Exploratory session
                              │
                              ▼
Go/No-Go ◄─ 9 Test report ◄─ 8 Fix verification and retest ◄─ 7 Verification and regression planning
```

| # | Stage | Agent / tool | Input | Output |
|---|-------|--------------|-------|--------|
| 1 | Requirements analysis | Claude | Requirements doc, app HTML/JS | Feature list with validations, test plan (scope, approach, criteria, risks) |
| 2 | Test case design | Claude | Spec, app code | Scenarios, then full test cases |
| 3 | Test case creation in Jira | Claude with Jira MCP | Selected test cases | Jira Tasks `TC-<AREA>-<nn>` |
| 4 | Exploratory session | Antigravity (Playwright MCP) | Running app, spec | Reviewed list of confirmed findings |
| 5 | Bug reports and linking in Jira | Cursor + Jira MCP, Claude | Confirmed findings, code | Jira Bugs with code references, linked to test Tasks |
| 6 | Bug fixing and PR | GitHub Copilot | Jira Bugs | Fix branch, pull request, bugs set to In progress |
| 7 | Verification and regression planning | Claude | Fixed bugs | Verification steps per bug, regression and highest-risk areas |
| 8 | Fix verification and retest | Manual, Antigravity (optional) | Fixed bugs, verification steps | Confirmed fixes, retest results, updated ticket statuses |
| 9 | Test report | Claude Desktop + Jira MCP | Live Jira data | Test summary report, Go/No-Go |

---

## Stage-by-stage guide

Each stage lists its **goal**, **how to run it**, the **human checkpoint** and its **exit criteria**. Record the prompts you use in [resources/Prompts.md](resources/Prompts.md).

### Stage 1 — Requirements analysis

- **Goal:** understand the spec and what the app actually does, then define how testing will be done.
- **How:** give Claude the requirements and the app source (`index.html`, `app.js`, `style.css`). First ask for a complete list of features, fields, validations, business rules (e.g. pricing/discount math) and edge cases. Then ask for a test plan: scope (in/out), approach, entry/exit criteria, risks, environments and deliverables. Save the plan locally (see `resources/BookNow Test Plan — Current Sprint.docx`).
- **Human checkpoint:** compare the inventory with the spec and flag behaviours present in code but missing from the spec, and vice versa; confirm scope, risks and exit criteria match the sprint.
- **Exit criteria:** an agreed feature list grouped by spec area (Login, Rooms, Booking, Confirmation, General) and an approved test plan stored in the repository.

### Stage 2 — Test case design

- **Goal:** design reviewable, traceable test cases from the spec.
- **How (two-step):**
  1. **Scenarios first** — ask Claude for a list of scenarios per spec area, titles only. Request positive, negative and edge scenarios; Sprint 1 started with positive ones only, which left a negative-path gap (see risk R2 in the [report](resources/test-report-sprint-1.md)).
  2. **Full test cases** — turn the selected scenarios into test cases with ID, title, preconditions, numbered steps, expected result and priority.
- **Human checkpoint:** remove duplicates and low-value scenarios before anything is written to Jira.
- **Exit criteria:** an agreed set of test cases grouped by feature area.

### Stage 3 — Test case creation in Jira

- **Goal:** put the designed test cases into the Jira project.
- **How:** use Claude with the Jira MCP server to create the test cases as Jira **Tasks** in the current sprint, with preconditions, steps, expected result, a feature-area label and priority.
- **Naming:** `TC-<AREA>-<nn>` (e.g. `TC-LOG-06`), labelled by feature area.
- **Human checkpoint:** check the created Tasks against the approved set.
- **Exit criteria:** all selected test cases exist in Jira (BOOK-1 … BOOK-52 in Sprint 1).

### Stage 4 — Exploratory session

- **Goal:** let an autonomous agent explore the app against the spec and surface defects.
- **How:** run Antigravity with the Playwright MCP server against the app; it navigates, fills forms, inspects the DOM and reports each finding as a short title and one-sentence description.
- **Human checkpoint:** for every finding **confirm** it by reproducing it, **verify** it against the spec, and **filter out noise** (false positives, out-of-scope items).
- **Exit criteria:** a curated list of confirmed findings with steps and expected vs. actual results.

### Stage 5 — Bug reports and linking in Jira

- **Goal:** turn confirmed findings into developer-ready bugs and keep them traceable to the test cases.
- **How:** in Cursor with the Jira MCP server, create **Bug** tickets that include reproduction steps, expected/actual behaviour, severity (as a `severity-*` label) and **references to the offending code** (file and line). Then ask Claude to link each bug to its matching test Task as related work, and to ask you when a match is unclear.
- **Human checkpoint:** review severity and wording before tickets are created; review the proposed links.
- **Exit criteria:** every confirmed finding has a Jira Bug (BOOK-53 … BOOK-66 in Sprint 1), linked to the test case it relates to.

### Stage 6 — Bug fixing and PR

- **Goal:** fix the reported bugs and deliver the fixes for review.
- **How:** use GitHub Copilot to fix the Jira bugs one by one on a new branch, open a pull request and set each bug to *In progress* (*W toku*).
- **Human checkpoint:** review the PR; make sure each fix matches its bug.
- **Exit criteria:** pull request opened and bug statuses updated.

### Stage 7 — Verification and regression planning

- **Goal:** prepare how the fixes will be verified and what could have regressed.
- **How:** ask Claude to read the fixed bugs in Jira and write a short verification procedure for each, then to list other areas that need regression testing and which of them are highest risk given the implemented fixes.
- **Human checkpoint:** challenge the reasoning behind the highest-risk areas.
- **Exit criteria:** a verification procedure per fixed bug and a prioritised regression list.

### Stage 8 — Fix verification and retest

- **Goal:** prove the fixes work in the running app and did not introduce regressions.
- **How:** verify each fix manually using the Stage 7 procedures. Optionally start a new Antigravity session driven by the list of fixed bugs; it re-checks them on the fixed build and writes a concise session summary. Then update the status of every related bug and test case.
- **Human checkpoint:** a fix is only "verified" after you have seen it behave correctly; reopen any bug that still reproduces.
- **Exit criteria:** every fixed bug is retested and closed, or reopened with evidence; all bug and test-case statuses reflect reality.

### Stage 9 — Test report

- **Goal:** summarise results and give a release recommendation.
- **How:** in Claude Desktop with the Jira MCP server, read the **live** Jira project and generate the report: executive summary, scope and method, execution summary by area, defect analysis, risks and a recommendation.
- **Human checkpoint:** **the Go/No-Go decision is yours.** Challenge assumptions the agent lists (e.g. how Jira statuses were mapped to Passed/Failed).
- **Exit criteria:** report saved as `resources/test-report-<sprint>.md` ([example](resources/test-report-sprint-1.md)).

---

## Repository structure

```text
.
├── booknow/                          # System under test (static web app)
│   ├── index.html
│   ├── app.js
│   └── style.css
├── resources/
│   ├── Roadmap.md                    # Task checklist for the 9 stages
│   ├── Prompts.md                    # Prompt log, grouped by stage
│   ├── booknow-sprint-requirements.md# Specification used as the test basis
│   ├── BookNow Test Plan — Current Sprint.docx
│   └── test-report-sprint-1.md       # Sprint 1 test summary report
├── mcp_config.json                   # Local MCP server config (git-ignored)
├── LICENSE
└── README.md
```

---

## Tooling and setup

| Tool | Purpose |
|------|---------|
| [Jira](https://web-ai-testing.atlassian.net/jira/software/projects/BOOK/summary) (project `BOOK`) | Test cases, bugs, statuses |
| Claude (web / Desktop) | Analysis, test planning, test-case design, Jira creation and linking, verification planning, reporting |
| Antigravity | Autonomous exploratory sessions and optional retest |
| Cursor | Bug reporting with code references |
| GitHub Copilot | Bug fixing and pull request |
| [Playwright MCP](https://github.com/microsoft/playwright-mcp) | Browser automation for agents |
| [mcp-atlassian](https://github.com/sooperset/mcp-atlassian) | Jira access for agents |

### MCP configuration

Create a local `mcp_config.json` (already in `.gitignore`) and **never commit it**:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "jira": {
      "command": "uvx",
      "args": ["mcp-atlassian"],
      "env": {
        "JIRA_URL": "https://<your-site>.atlassian.net",
        "JIRA_USERNAME": "<your-email>",
        "JIRA_API_TOKEN": "<your-api-token>"
      }
    }
  }
}
```

Create an API token at <https://id.atlassian.com/manage-profile/security/api-tokens>. Requirements: Node.js (for `npx`) and [`uv`](https://docs.astral.sh/uv/) (for `uvx`).

### Running the app

BookNow is a static app and needs no build step. Open [booknow/index.html](booknow/index.html) in a browser, or serve it locally:

```bash
cd booknow && python3 -m http.server 8000
```

Test credentials: `guest@booknow.com` / `stay2026`.

---

## Reusing this process on another project

1. **Prepare inputs** — a requirements document (with numbered sections, so tests can trace to them) and access to the app source or a running instance.
2. **Create a Jira project** with a short key and a sprint; add an API token and fill in `mcp_config.json`.
3. **Copy [resources/Roadmap.md](resources/Roadmap.md)** as your checklist and **[resources/Prompts.md](resources/Prompts.md)** as your prompt log; replace the project name, key and spec areas.
4. **Run stages 1–9 in order**, applying the human checkpoint at each stage and logging prompts as you go.
5. **Keep the conventions** below so reports can be generated consistently from Jira.
6. **Archive** the plan, findings and report under `resources/` for each sprint.

Tips:

- Keep scenario selection (stage 2) and finding triage (stage 4) manual — they are the best quality filters.
- Ask the agent to state its assumptions in the report, and verify them.
- Swap tools freely; the stages and their outputs matter more than the specific agent.

---

## BookNow Sprint 1 results

| Metric | Value |
|---|---|
| Test cases | 52 (Login 8, Rooms 14, Booking 19, Confirmation 8, Browser tab title 3) |
| Bugs | 14 (1 Critical, 6 High, 5 Medium, 2 Low) |
| Test cases completed | 43 / 52 (82.7%) |
| Open defects | 0 |
| Recommendation | **Conditional GO** |

Full details: [resources/test-report-sprint-1.md](resources/test-report-sprint-1.md).

---

## Conventions

| Item | Convention |
|------|------------|
| Test case issue | Jira **Task**, summary `TC-<AREA>-<nn>`, label = feature area |
| Bug issue | Jira **Bug**, label `severity-<level>`, includes code reference |
| Traceability | Each test case and bug references a spec section (e.g. §1.3 Booking) |
| Prompts | Logged per stage in `resources/Prompts.md` |
| Secrets | Kept only in the git-ignored `mcp_config.json` |

---

## License

Released under the terms of the [LICENSE](LICENSE) file.
