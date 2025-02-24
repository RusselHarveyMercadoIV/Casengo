import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

import { makeRedirectUri } from "expo-auth-session";

import * as Linking from "expo-linking";
// import * as WebBrowser from "expo-web-browser";
import { openAuthSessionAsync, openBrowserAsync } from "expo-web-browser";

export const config = {
  platform: "com.russelharv.casengo",
  endpoint: process.env.EXPO_PUBLIC_APPWIRTE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
if (!deepLink.hostname) {
  deepLink.hostname = "localhost";
}

const scheme = `${deepLink.protocol}//`; // e.g. 'exp://' or 'playground://'

export async function login() {
  try {
    // Start OAuth flow
    const loginUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      `${deepLink}`,
      `${deepLink}`
    );

    console.log("loginUrl >>> ", loginUrl);
    // Open loginUrl and listen for the scheme redirect
    const result = await openAuthSessionAsync(`${loginUrl}`, scheme);

    console.log("result >>> ", result);

    if (result?.type !== "success") throw new Error("Failed to login");
    // Extract credentials from OAuth redirect URL
    const url = new URL(result?.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");
    return true;
  } catch (error) {
    console.error("error");
    return false;
  }
}

// export async function login() {
//   try {
//     const redirectUri = Linking.createURL("/");
//     // const redirectUri =
//     //   "exp+kasengo://expo-development-client/?url=http%3A%2F%2F26.51.7.171%3A8081/";
//     // const redirectUri = "http://localhost:8081/";

//     console.log("url", redirectUri);

//     const response = await account?.createOAuth2Token(
//       OAuthProvider.Google,
//       redirectUri
//     );

//     console.log("response >>> ", response);

//     if (!response) throw new Error("Failed to login 1");

//     const browserResult = await openAuthSessionAsync(
//       response.toString(),
//       redirectUri
//     );

//     console.log("browserresult >>> ", browserResult);

//     if (browserResult?.type !== "success") throw new Error("Failed to login 2");

//     const url = new URL(browserResult.url);

//     const secret = url.searchParams.get("secret")?.toString();
//     const userId = url.searchParams.get("userId")?.toString();

//     if (!secret || !userId) throw new Error("Failed to login");

//     const session = await account.createSession(userId, secret);

//     if (!session) throw new Error("Failed to create a session");

//     return true;
//   } catch (error) {
//     console.error("error");
//     return false;
//   }
// }

// export async function login() {
//   try {
//     // Dynamically create the redirect URI
//     const redirectUri = Linking.createURL("/");

//     // // Get the OAuth2 URL from Appwrite
//     const response = await account.createOAuth2Token(
//       OAuthProvider.Google,
//       redirectUri
//     );
//     console.log("response >>> ", response);

//     if (!response) throw new Error("Failed to get OAuth2 URL");

//     // Open the browser with the OAuth2 URL
//     const result = await openBrowserAsync(response?.toString());

//     console.log("result >>> ", result);

//     if (result?.type !== "success") throw new Error("Failed to login 2");

//     const url = new URL(result.url);

//     const secret = url.searchParams.get("secret")?.toString();
//     const userId = url.searchParams.get("userId")?.toString();

//     if (!secret || !userId) throw new Error("Failed to login");

//     const session = await account.createSession(userId, secret);

//     if (!session) throw new Error("Failed to create a session");

//     return true;
//   } catch (error) {
//     console.error("Login error:", error);
//     return false;
//   }
// }

// Add a Linking event listener to handle the redirect (place this outside the function)
// Linking.addEventListener("url", async (event) => {
//   const { url } = event;
//   console.log("Received URL:", url);

//   try {
//     const parsedUrl = new URL(url);
//     const secret = parsedUrl.searchParams.get("secret");
//     const userId = parsedUrl.searchParams.get("userId");

//     if (!secret || !userId) {
//       console.error("Missing secret or userId in redirect URL");
//       return;
//     }

//     // Create the session with Appwrite
//     const session = await account.createSession(userId, secret);
//     console.log("Session created successfully:", session);
//   } catch (error) {
//     console.error("Failed to create session:", error);
//   }
// });

export async function logout() {
  try {
    await account?.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUser() {
  try {
    const user = await account?.get();

    if (user.$id) {
      const userAvatar = avatar?.getInitials(user.name);
      return {
        ...user,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
