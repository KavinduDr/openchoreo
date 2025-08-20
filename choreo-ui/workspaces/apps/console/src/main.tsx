import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalProviders } from "./providers/GlobalProviders.tsx";
import { getPluginRegistry } from "./plugins";
import { AsgardeoProvider } from "@asgardeo/react";

async function initializeApp() {
  const pluginRegistry = await getPluginRegistry();
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Suspense fallback={<div />}>
        <GlobalProviders pluginRegistry={pluginRegistry}>
          <AsgardeoProvider
            clientId="a6Sf_moAUbIPX2JZ440djfunA94a"
            baseUrl="https://api.asgardeo.io/t/starkindustriesdemo"
            scopes={["openid", "profile", "email"]}
          >
            <App />
          </AsgardeoProvider>
        </GlobalProviders>
      </Suspense>
    </StrictMode>
  );
}

// Initialize the app
initializeApp().catch(console.error);
