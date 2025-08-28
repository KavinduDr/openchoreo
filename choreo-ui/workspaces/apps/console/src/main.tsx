import { StrictMode, Suspense } from "react";
import { AuthProvider } from "@open-choreo/auth-core";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalProviders } from "./providers/GlobalProviders.tsx";
import { getPluginRegistry } from "./plugins";

async function initializeApp() {
  const pluginRegistry = await getPluginRegistry();

  // const asgardeoConfig = {
  //   clientId: import.meta.env.VITE_CLIENT_ID,
  //   baseUrl: import.meta.env.VITE_BASE_URL,
  //   scopes: import.meta.env.VITE_SCOPES?.split(",") || [],
  // };

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Suspense fallback={<div />}>
        <GlobalProviders pluginRegistry={pluginRegistry}>
          <AuthProvider
            provider={{
              name: "asgardeo",
              id: "asgardeo",
              config: {
                clientId: "a6Sf_moAUbIPX2JZ440djfunA94a",
                baseUrl: "https://api.asgardeo.io/t/starkindustriesdemo",
                scopes: ["openid", "profile", "email"],
              },
            }}
          >
            <App />
          </AuthProvider>
        </GlobalProviders>
      </Suspense>
    </StrictMode>,
  );
}

// Initialize the app
initializeApp().catch(console.error);
