// Lightweight Thunder API client using runtime.json

interface ThunderRuntimeConfig {
  applicationID?: string;
  flowEndpoint?: string; // e.g., https://localhost:8090/flow
}

let cachedRuntime: ThunderRuntimeConfig | null = null;

async function loadRuntime(): Promise<ThunderRuntimeConfig> {
  if (cachedRuntime) return cachedRuntime;
  const res = await fetch("/runtime.json", { credentials: "same-origin" });
  if (!res.ok) throw new Error(`Failed to load runtime.json: ${res.status}`);
  cachedRuntime = await res.json();
  if (!cachedRuntime.flowEndpoint) {
    throw new Error("runtime.flowEndpoint is required");
  }
  return cachedRuntime;
}

export async function Login(email: string, password: string): Promise<any> {
  try {
    console.log("login function thunderAPI", email, password);

    const RUNTIME = {
      applicationID: "47ace49a-e5c0-49b4-9fce-0ef91a5a465e",
      flowEndpoint: "https://localhost:8090/flow",
    } as const;

    // Start/authenticate flow. Depending on your flow graph, you may
    // need to follow-up with execute/submit calls using returned flowId.
    const response = await fetch(`${RUNTIME.flowEndpoint}/execute`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        applicationId: RUNTIME.applicationID,
        flowType: "AUTHENTICATION",
        // If your flow expects credentials in first step, pass as inputs
        inputs: {
          username: email,
          password: password,
        },
      }),
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const message =
        (data && (data.message || data.error)) || `HTTP ${response.status}`;
      throw new Error(
        typeof message === "string" ? message : `HTTP ${response.status}`
      );
    }

    console.log("Thunder API response data:", data);
    return data;
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
}

export default { Login };
