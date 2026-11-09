import React from "react";
import { createRoot } from "react-dom/client";
import Page from "./pages/_index";
import { MobileFullscreen } from "./components/MobileFullscreen";
import { registerServiceWorker } from "./helpers/registerServiceWorker";
import "./base.css";

createRoot(document.getElementById("root")!).render(<React.StrictMode><Page/><MobileFullscreen/></React.StrictMode>);
registerServiceWorker();
