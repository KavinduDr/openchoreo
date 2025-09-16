/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function Login(email: string, password: string): Promise<any> {
  try {
    console.log("login function thunderAPI", email, password);

    const RUNTIME = {
      applicationID: "47ace49a-e5c0-49b4-9fce-0ef91a5a465e",
      flowEndpoint: "https://localhost:8090/flow",
    } as const;

    // Start/authenticate flow
    const response = await fetch(`${RUNTIME.flowEndpoint}/execute`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        applicationId: RUNTIME.applicationID,
        flowType: "AUTHENTICATION",
        // If flow expects credentials in first step, pass as inputs
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
        typeof message === "string" ? message : `HTTP ${response.status}`,
      );
    }

    console.log("Thunder API response data:", data); // for debug
    return data;
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
}

export default { Login };
