import { useEffect, useState } from "react";
import "./MobileFullscreen.css";

/** On mobile, invite fullscreen; once active, offer a quiet way to exit fullscreen. */
export function MobileFullscreen() {
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const update = () => setActive(Boolean(document.fullscreenElement));
    setSupported(typeof document.documentElement.requestFullscreen === "function" && typeof document.exitFullscreen === "function");
    update();
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);
  async function toggle() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      // Unsupported mobile browsers keep the regular page usable.
    }
  }
  if (!supported) return null;
  return <button type="button"
    className={active ? "bebella-mobile-fullscreen bebella-mobile-fullscreen--exit" : "bebella-mobile-fullscreen bebella-mobile-fullscreen--invite"}
    onClick={toggle}
    aria-label={active ? "Fechar tela cheia" : "Maximizar tela"}
    title={active ? "Sair da tela cheia" : "Maximizar tela"}>
    <span aria-hidden="true">{active ? "×" : "⛶"}</span>
    <span>{active ? "Fechar" : "MAXIMIZAR"}</span>
  </button>;
}
