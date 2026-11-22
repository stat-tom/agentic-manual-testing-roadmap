# BookNow — Test Summary Report: BOOK Sprint 1

| | |
|---|---|
| **Project** | BookNow Testing (Jira key `BOOK`) — hotel room booking web app |
| **Sprint** | BOOK Sprint 1 (active) — 22 Nov 2026 14:35 → 27 Nov 2026 00:00 CET |
| **Specification** | `booknow-sprint-requirements.md` (§1.1 Login, §1.2 Rooms, §1.3 Booking, §1.4 Confirmation, §1.5 General) |
| **Data source** | Jira project BOOK, 66 issues (BOOK-1 … BOOK-66), read 22 Nov 2026 ~15:05 CET |
| **Prepared by** | T S |
| **Recommendation** | **CONDITIONAL GO** |

---

## 1. Executive Summary

Sprint 1 verified the BookNow app against all five areas of the specification: Login, Rooms, Booking, Confirmation and the browser tab title. 52 test cases were planned and 14 defects were raised.

43 of 52 test cases (82.7%) are complete; 9 (17.3%) are still In Progress. All 14 defects are resolved, including the single Critical defect (BOOK-55: invalid or empty credentials accepted, no auth guard) and all six High defects. **No defect is open.**

The remaining risk is not open bugs but incomplete and thin verification: nine unfinished test cases, no negative-path test cases for login and booking validation, and fix verification recorded only as a "fixed" comment on each bug. These can be closed within the sprint window, so the recommendation is **Conditional GO** (see §6).

| Metric | Value |
|---|---|
| Test cases planned | 52 |
| Passed (Done) | 43 (82.7%) |
| Failed / Blocked | 0 / 0 |
| Not executed (In Progress) | 9 (17.3%) |
| Defects raised | 14 |
| Defects open | **0** |
| Open Critical / High defects | **0 / 0** |

---

## 2. Scope and Method

All 66 issues in project BOOK belong to BOOK Sprint 1: 52 test case Tasks (BOOK-1 … BOOK-52, named `TC-<AREA>-<nn>`) and 14 Bugs (BOOK-53 … BOOK-66).

**How results were derived.** Labels on test case Tasks only identify the feature area (`Login`, `Rooms`, `Booking`, `Confirmation`, `Browser-Tab-Title`). Jira holds no Passed / Failed / Blocked label or status, only the workflow statuses *Gotowe* (Done) and *W toku* (In Progress). Results were therefore mapped as follows:

| Requested category | Jira source | Count |
|---|---|---|
| Passed | Status *Gotowe* (Done) | 43 |
| Failed | No such label or status exists | 0 |
| Blocked | No such label or status exists | 0 |
| Not executed | Status *W toku* (In Progress), not completed | 9 |

> **Assumption to confirm:** Done is read as "executed and passed on the fixed build". Jira does not record a per-test result, so if any Done test actually failed, the pass rate in §3 is overstated.

**Defect severity** was taken from the `severity-*` label and the "Severity" line in each bug description. The Jira *Priority* field is Medium on all 14 bugs and does not reflect severity (see §4).

---

## 3. Execution Summary

**Pass rate: 43 / 52 = 82.7%** (all 43 completed tests are Done; 0 failed, 0 blocked).

### By feature area

| Area | Total | Passed (Done) | Not executed (In Progress) | Pass rate |
|---|---:|---:|---:|---:|
| Login | 8 | 6 | 2 | 75.0% |
| Rooms | 14 | 11 | 3 | 78.6% |
| Booking | 19 | 17 | 2 | 89.5% |
| Confirmation | 8 | 6 | 2 | 75.0% |
| Browser tab title | 3 | 3 | 0 | 100.0% |
| **Total** | **52** | **43** | **9** | **82.7%** |

### Test cases not yet executed (In Progress)

| Key | Test case | Area |
|---|---|---|
| BOOK-6 | TC-LOG-06: Login page displays all expected elements | Login |
| BOOK-8 | TC-LOG-08: Navbar navigation back to Rooms | Login |
| BOOK-15 | TC-ROOM-07: Discount badge shows correct percentage on every card | Rooms |
| BOOK-20 | TC-ROOM-12: Book button opens the booking form | Rooms |
| BOOK-22 | TC-ROOM-14: Returning to Rooms re-renders the full grid | Rooms |
| BOOK-23 | TC-BKG-01: Booking form displays all fields | Booking |
| BOOK-25 | TC-BKG-03: Guests field defaults to 1 | Booking |
| BOOK-42 | TC-CNF-01: Confirmation page shown after successful booking | Confirmation |
| BOOK-48 | TC-CNF-07: "Browse More Rooms" returns to Rooms | Confirmation |

None of the nine is linked to a defect. All are display or navigation checks, and the end-to-end flow they touch is covered indirectly by completed tests (TC-LOG-07, TC-BKG-04, TC-CNF-02 … 06).

### Traceability

All 43 completed test cases are linked ("relates to") to at least one defect, so every Done test covers an area where a defect was found and has since been fixed. The links show coverage, not an individual failure record (see Appendix A).

---

## 4. Defect Summary

### By severity

| Severity | Count | Share | Jira *Priority* field |
|---|---:|---:|---:|
| Critical | 1 | 7.1% | 0 |
| High | 6 | 42.9% | 0 |
| Medium | 5 | 35.7% | 14 |
| Low | 2 | 14.3% | 0 |
| **Total** | **14** | **100%** | **14** |

The Jira *Priority* field is Medium on every bug; by that field alone the count would be Critical 0 / High 0 / Medium 14 / Low 0. The severity column is the meaningful one and is used in this report.

### By area and severity

| Area | Critical | High | Medium | Low | Total |
|---|---:|---:|---:|---:|---:|
| Login | 1 | 1 | 1 | 0 | 3 |
| Rooms | 0 | 1 | 3 | 1 | 5 |
| Booking | 0 | 3 | 0 | 0 | 3 |
| Confirmation | 0 | 1 | 1 | 0 | 2 |
| Browser tab title | 0 | 0 | 0 | 1 | 1 |
| **Total** | **1** | **6** | **5** | **2** | **14** |

### Resolved defects (14)

All 14 are in status *Gotowe* (Done), resolved on 22 Nov 2026 between 14:31:22 and 14:31:38, about six hours after being raised (08:35). Each carries the comment "The issue is fixed."

| Key | Severity | Summary |
|---|---|---|
| BOOK-55 | **Critical** | Login: empty or invalid credentials accepted, no error shown, no auth guard |
| BOOK-54 | High | Login: password field does not mask input |
| BOOK-59 | High | Rooms: discounted nightly price calculated incorrectly (discount divided by 1000) |
| BOOK-62 | High | Booking: nights and total do not update when dates change |
| BOOK-63 | High | Booking: form accepts blank fields and malformed email/phone |
| BOOK-64 | High | Booking: no check-out date order or guest count validation |
| BOOK-65 | High | Confirmation: no booking reference number displayed |
| BOOK-56 | Medium | Login: navbar visible before authentication |
| BOOK-57 | Medium | Rooms: Deluxe Room image fails to load (404) |
| BOOK-60 | Medium | Rooms: "Available" badge rendered as unavailable (red) |
| BOOK-61 | Medium | Rooms: Family Suite description overflows its card |
| BOOK-66 | Medium | Confirmation: booking summary details missing |
| BOOK-53 | Low | Browser tab title shows "Untitled" instead of a descriptive name |
| BOOK-58 | Low | Rooms: room images missing descriptive alt text |

### Open defects

**None.**

---

## 5. Outstanding Risks

No risk remains from open bugs. The residual risks are about verification quality:

| # | Risk | Rating | Why it matters | Mitigation |
|---|---|---|---|---|
| R1 | 9 of 52 test cases (17.3%) not executed | Medium | Coverage of login page content, navbar navigation, discount badge percentages, Book button, form fields, guests default and confirmation navigation is unconfirmed | Execute and close BOOK-6, 8, 15, 20, 22, 23, 25, 42, 48 |
| R2 | No negative-path test cases in Sprint 1 | **High** | The spec requires an error for empty or wrong credentials, an auth guard, required fields, valid email/phone, check-out after check-in and guests ≥ 1. The suite only checks that *valid* input is accepted, so the fixes for BOOK-55, 63 and 64 (Critical/High) have no dedicated regression test | Add negative and edge test cases for login and booking validation and run them on the fixed build |
| R3 | Fix verification is thin | Medium | Each bug has only a "The issue is fixed." comment. No Fix Version, build identifier or retest evidence is recorded | Record the verified build and attach retest evidence |
| R4 | Regression concentration in one function | Medium | BOOK-63, 64, 65 and 66 all trace to the same code location (`buggyPlaceBooking()` in `app.js`), so one change has to deliver validation, date/guest rules, reference generation and the confirmation summary | Retest all four together, including negative inputs |
| R5 | Environment not recorded | Low | "Browser/OS: not recorded" on all 14 bugs, so cross-browser behaviour is unknown | Record the browser/OS used for the final run |
| R6 | Inconsistent defect metadata | Low | Priority is Medium on all 14 bugs while severity ranges Low to Critical, which can mislead anyone who filters or reports by Priority | Align the Priority field with severity |

---

## 6. Go / No-Go Recommendation

### **CONDITIONAL GO**

**Rationale**

1. **No open defects.** All 14 defects are resolved, including the Critical (BOOK-55) and all six High defects.
2. **Every specification area has executed coverage.** The full flow (login → rooms → booking → confirmation) is exercised by completed tests TC-LOG-07, TC-BKG-04 and TC-CNF-02 … 06.
3. **Execution is incomplete.** 82.7% completion is short of a full run. The sprint documents define no exit criteria, so the common bar was applied: all planned tests executed and no open Critical/High defects. The second part is met, the first is not.
4. **The highest-severity fixes are lightly verified.** BOOK-55, 63 and 64 are backed by a "fixed" comment and no negative-path test cases (R2, R3).

**Conditions to convert to an unconditional GO** (achievable before the sprint ends on 27 Nov 00:00 CET)

1. Execute the 9 remaining test cases on the fixed build; all pass with no new Critical/High defect.
2. Add and pass negative-path test cases for BOOK-55 (empty/wrong credentials, auth guard) and BOOK-63/64 (blank fields, bad email/phone, check-out ≤ check-in, guests ≤ 0).
3. Record the verified build and browser/OS, and align the Priority field with severity on the 14 bugs.

**The recommendation reverts to NO-GO if** any of the 9 remaining tests or the added negative tests exposes a new Critical or High defect, or if a regression appears in a previously fixed defect.

---

## Appendix A — Defect-to-test traceability ("relates to" links)

| Bug | Linked test cases |
|---|---|
| BOOK-53 | BOOK-50, 51, 52 |
| BOOK-54 | BOOK-5 |
| BOOK-55 | BOOK-1, 2, 7 |
| BOOK-56 | BOOK-3, 4 |
| BOOK-57 | BOOK-10, 16 |
| BOOK-58 | BOOK-17 |
| BOOK-59 | BOOK-11, 12, 13, 14, 21, 24, 38, 41 |
| BOOK-60 | BOOK-19 |
| BOOK-61 | BOOK-9, 18 |
| BOOK-62 | BOOK-31, 32, 33, 34, 35, 36, 37, 38 |
| BOOK-63 | BOOK-26, 27, 28, 29, 30 |
| BOOK-64 | BOOK-26, 31, 39, 40 |
| BOOK-65 | BOOK-46, 47, 49 |
| BOOK-66 | BOOK-43, 44, 45, 49 |

The 43 distinct test cases in this table are exactly the 43 test cases in status Done. The 9 In Progress test cases have no linked defect.

## Appendix B — Data notes

- Test case Tasks all have Priority High; Jira shows no assignee on any of them.
- The 43 Done transitions are timestamped between 14:59:58 and 15:00:41 on 22 Nov 2026, which suggests status was updated in one pass. No per-test result or evidence field exists in Jira, so attach evidence per test case if this report must be audited.
- The In Progress test cases were last updated between 14:40:17 and 14:40:39.
