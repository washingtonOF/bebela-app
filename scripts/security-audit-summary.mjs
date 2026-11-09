import { existsSync, readFileSync, appendFileSync } from "node:fs";
const report = existsSync("npm-audit.json") ? JSON.parse(readFileSync("npm-audit.json", "utf8")) : null;
const counts = report?.metadata?.vulnerabilities;
const summary = counts
  ? `### BEBELLA — dependency audit\n\n| Severity | Count |\n|---|---:|\n${["critical", "high", "moderate", "low", "info"].map(level => `| ${level} | ${counts[level] ?? 0} |`).join("\n")}\n\nReview the uploaded JSON report before upgrading packages.\n`
  : "### BEBELLA — dependency audit\n\nAudit report unavailable or incomplete. Check the audit step logs.\n";
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
