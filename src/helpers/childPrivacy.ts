/** Progresso infantil fica somente no navegador; não enviar dados para servidores. */
export type LearningEntry = {level:1|2|3;date:string;correct:boolean;assisted:boolean;attempts:number;skill:string;childName:string;word?:string};
const validSkills = new Set(["spelling","sound","build","sentence"]);
export function readLearningEntries(): LearningEntry[] {
  try {
    const raw = localStorage.getItem("bebela-learning-v2");
    if (!raw || raw.length > 250000) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(-300).filter((x):x is LearningEntry =>
      x !== null && typeof x === "object" &&
      (x.level === 1 || x.level === 2 || x.level === 3) &&
      typeof x.childName === "string" && x.childName.length <= 24 &&
      typeof x.date === "string" && !Number.isNaN(Date.parse(x.date)) &&
      typeof x.correct === "boolean" && typeof x.assisted === "boolean" &&
      Number.isInteger(x.attempts) && x.attempts >= 0 && x.attempts <= 10000 &&
      typeof x.skill === "string" && validSkills.has(x.skill) &&
      (x.word === undefined || (typeof x.word === "string" && x.word.length <= 100))
    );
  } catch { return []; }
}
export function eraseChildProgress(childName:string):void {
  const name = childName.toLocaleLowerCase();
  const keys = ["primeiras-rapido-v1:" + name, "bebela-round-v1:" + name];
  for (const key of keys) localStorage.removeItem(key);
  localStorage.setItem("bebela-learning-v2", JSON.stringify(readLearningEntries().filter(x=>x.childName!==childName)));
  // The original introductory activity progress is shared by all children.
  localStorage.removeItem("primeiras-v1");
}
