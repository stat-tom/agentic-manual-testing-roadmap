# Roadmap

Work through in order:

- [x] **1. Requirements analysis** — Claude reads the spec + BookNow HTML/JS → feature list with validations, then a test plan (scope, approach, criteria, risks) → save locally
- [x] **2. Test case design** — Claude · scenarios first → select → full test cases (steps, expected result, priority)
- [x] **3. Test case creation in Jira** — BOOK project · Claude + Jira MCP → Jira Tasks `TC-<AREA>-<nn>`
- [x] **4. Exploratory session** — Antigravity runs autonomously · review findings · confirm, verify, filter noise
- [x] **5. Bug reports and linking in Jira** — Cursor + MCP → Bug tickets with code references · Claude links each bug to its test task
- [x] **6. Bug fixing and PR** — Copilot · fix the bugs on a new branch, open a PR, set bugs to In progress
- [x] **7. Verification and regression planning** — Claude · verification procedure per fixed bug, regression areas, highest-risk areas
- [x] **8. Fix retest and regression testing** — manual verification, Antigravity (optional) retest session based on the list of bug fixes · update all ticket statuses
- [x] **9. Test report** — Claude Desktop + MCP (live Jira) · go/no-go is yours
