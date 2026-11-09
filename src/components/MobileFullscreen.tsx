import { useEffect, useState } from "react";
import "./MobileFullscreen.css";

/** Fullscreen is only requested after a user gesture; unsupported browsers hide the control. */
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
      // Some mobile browsers disallow fullscreen; leave the page usable.
    }
  }
  if (!supported) return null;
  return <button type="button" className="bebella-mobile-fullscreen" onClick={toggle}
    aria-label={active ? "Sair da tela cheia" : "Maximizar tela"}
    title={active ? "Sair da tela cheia" : "Maximizar tela"}>
    {active ? "⤢" : "⛶"} <span>{active ? "Restaurar" : "Maximizar"}</span>
  </button>;
}
