import { Capacitor } from "@capacitor/core";
import { TextToSpeech } from "@capacitor-community/text-to-speech";
let generation = 0;
export async function stopSpeech(): Promise<void> {
  generation++;
  if (Capacitor.isNativePlatform()) await TextToSpeech.stop().catch(() => {});
  else window.speechSynthesis?.cancel();
}
export async function speakText(text: string, language = "pt-BR", rate = 0.8): Promise<void> {
  const current = ++generation;
  if (Capacitor.isNativePlatform()) {
    await TextToSpeech.stop().catch(() => {});
    if (current !== generation) return;
    await TextToSpeech.speak({ text, lang: language, rate, pitch: 1, volume: 1 });
    return;
  }
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) throw new Error("Voz indisponível");
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = language; u.rate = rate;
  const voice = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase() === language.toLowerCase());
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}
