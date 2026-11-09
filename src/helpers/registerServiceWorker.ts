/** Registro exclusivo da versão web; não altera o funcionamento do APK Capacitor. */
export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(import.meta.env.BASE_URL + "sw.js", {
      scope: import.meta.env.BASE_URL,
    }).catch(error => console.warn("BEBELA: modo offline indisponível", error));
  });
}
