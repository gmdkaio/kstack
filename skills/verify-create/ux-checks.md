# ux checks

run on each feature, in a real browser, through the user's own path. save the script so it reruns.

1. **two widths.** 1280 and 375 wide. screenshot both and look at them: horizontal scroll, cut-off text, overlapping or unreachable controls. a screenshot nobody looked at is not a check.
2. **errors.** record the browser console and the network during the flow. an uncaught error, a console error or an unexpected failed request fails the check.
3. **states.** drive the empty state (no data), a bad input and a slow response (delay the request). the page must say what happened and stay usable.
4. **keyboard and basics.** reach and use every control with tab and enter only. every input has a label. focus is visible. run an automated accessibility scan (axe) when the project can, and call it automated, not an audit.

report per feature: pass or fail for each check, the screenshot paths and the failing line. a failed check is reported as failed and not fixed unless asked.
