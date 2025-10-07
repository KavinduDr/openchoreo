/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function Login(email: string, password: string): Promise<any> {
  try {
    console.log("login function thunderAPI", email, password);

    const RUNTIME = {
      applicationID: "47ace49a-e5c0-49b4-9fce-0ef91a5a465e",
      flowEndpoint: "/thunder-api/flow",
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

interface JWTPayload {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
}

function decodeJWT(token: string): JWTPayload | null {
  try {
    // Split the JWT into parts
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    // Decode the payload (second part)
    const payload = parts[1];

    // Add padding if necessary
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);

    // Decode base64
    const decodedPayload = atob(paddedPayload);

    // Parse JSON
    const parsedPayload: JWTPayload = JSON.parse(decodedPayload);

    console.log("Decoded JWT payload:", parsedPayload);
    return parsedPayload;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export async function fetchUserProfile(token: string): Promise<any> {
  try {
    console.log("Fetching user profile with token:", token);

    const decoded = decodeJWT(token);
    console.log("Decoded token payload:", decoded);

    if (!decoded) {
      throw new Error("Invalid token. Cannot decode.");
    }

    // Use the thunder-api proxy path
    const profileResponse = await fetch(`/thunder-api/users/${decoded.sub}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("profile response status:", profileResponse.status);

    if (!profileResponse.ok) {
      throw new Error(
        `Failed to fetch user profile: HTTP ${profileResponse.status}`,
      );
    }

    const profileData = await profileResponse.json();
    console.log("User profile data:", profileData);
    return profileData;
  } catch (err) {
    console.error("Error fetching user profile:", err);
    throw err;
  }
}

export default { Login, fetchUserProfile };
