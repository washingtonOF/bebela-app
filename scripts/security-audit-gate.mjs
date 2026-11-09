import { readFileSync } from "node:fs";
let audit;
try {
  audit = JSON.parse(readFileSync("npm-audit.json", "utf8"));
} catch {
  console.error("Auditoria de dependências ausente ou inválida.");
  process.exit(1);
}
const counts = audit?.metadata?.vulnerabilities;
if (!counts || typeof counts.critical !== "number" || typeof counts.high !== "number") {
  console.error("Relatório npm audit incompleto. Não é seguro aprovar.");
  process.exit(1);
}
if (counts.critical > 0 || counts.high > 0) {
  console.error(`Dependências com vulnerabilidades: ${counts.critical} críticas e ${counts.high} altas. Revisão obrigatória.`);
  process.exit(1);
}
console.log("Auditoria aprovada: nenhuma vulnerabilidade alta ou crítica reportada.");
