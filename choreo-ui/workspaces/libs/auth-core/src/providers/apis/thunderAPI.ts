/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function Login(email: string, password: string): Promise<any> {
  try {
    console.log("login function thunderAPI", email, password);

    const RUNTIME = {
      applicationID: "47ace49a-e5c0-49b4-9fce-0ef91a5a465e",
      flowEndpoint: "https://localhost:8090/flow",
    } as const;

    // STEP 1: Initialize the authentication flow
    console.log("Step 1: Initializing auth flow...");
    const initResponse = await fetch(`${RUNTIME.flowEndpoint}/execute`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        applicationId: RUNTIME.applicationID,
        flowType: "AUTHENTICATION",
      }),
    });

    if (!initResponse.ok) {
      throw new Error(
        `Failed to initialize auth flow: HTTP ${initResponse.status}`,
      );
    }

    const initData = await initResponse.json();
    console.log("Init flow response:", initData);

    // Extract flowId from the first response
    const flowId = initData.flowId;
    if (!flowId) {
      throw new Error("No flowId received from auth flow initialization");
    }

    // STEP 2: Submit credentials using the flowId
    console.log("Step 2: Submitting credentials with flowId:", flowId);
    const authResponse = await fetch(`${RUNTIME.flowEndpoint}/execute`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        flowId: flowId,
        actionId: "basic_auth",
        inputs: {
          username: email,
          password: password,
        },
      }),
    });

    const contentType = authResponse.headers.get("content-type") || "";
    const authData = contentType.includes("application/json")
      ? await authResponse.json()
      : await authResponse.text();

    if (!authResponse.ok) {
      const message =
        (authData && (authData.message || authData.error)) ||
        `HTTP ${authResponse.status}`;
      throw new Error(
        typeof message === "string" ? message : `HTTP ${authResponse.status}`,
      );
    }

    console.log("Thunder API auth response data:", authData);
    return authData;
  } catch (err) {
    console.error("Error during login:", err);
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error(
        "Cannot connect to authentication server. Please check if the server is running and CORS is configured.",
      );
    }
    throw err;
  }
}

export default { Login };
