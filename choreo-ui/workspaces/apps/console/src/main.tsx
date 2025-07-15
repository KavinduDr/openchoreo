import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalProviders } from "./providers/GlobalProviders.tsx";
import { getPluginRegistry } from "./plugins";

async function initializeApp() {
  const pluginRegistry = await getPluginRegistry();
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Suspense fallback={<div />}>
        <GlobalProviders pluginRegistry={pluginRegistry}>
          <App />
        </GlobalProviders>
      </Suspense>
    </StrictMode>,
  );
}

// Initialize the app
initializeApp().catch(console.error);
