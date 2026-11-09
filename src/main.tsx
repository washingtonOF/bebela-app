import React from "react";
import { createRoot } from "react-dom/client";
import Page from "./pages/_index";
import { registerServiceWorker } from "./helpers/registerServiceWorker";
import "./base.css";

createRoot(document.getElementById("root")!).render(<React.StrictMode><Page/></React.StrictMode>);
registerServiceWorker();
