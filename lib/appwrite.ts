import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

import { makeRedirectUri } from "expo-auth-session";

// import * as WebBrowser from "expo-web-browser";
import { openAuthSessionAsync, openBrowserAsync } from "expo-web-browser";

export const config = {
  platform: "com.russelharv.casengo",
  endpoint: process.env.EXPO_PUBLIC_APPWIRTE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client()
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
if (!deepLink.hostname) {
  deepLink.hostname = "localhost";
}

const scheme = `${deepLink.protocol}//`;

export async function login() {
  try {
    // Start OAuth flow
    const loginUrl = account.createOAuth2Token(
      OAuthProvider.Google,
      `${deepLink}`,
      `${deepLink}`
    );

    console.log("loginUrl >>> ", loginUrl);
    // Open loginUrl and listen for the scheme redirect
    const result = await openAuthSessionAsync(`${loginUrl}`, scheme);

    if (result?.type !== "success") throw new Error("Failed to login");
    // Extract credentials from OAuth redirect URL
    const url = new URL(result?.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!secret || !userId) throw new Error("Failed to login");

    const session = await account?.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");
    return true;
  } catch (error) {
    console.error("error");
    return false;
  }
}

// Linking.addEventListener("url", (event) => {
//   const url = new URL(event.url);
//   const secret = url.searchParams.get("secret");
//   const userId = url.searchParams.get("userId");
//   if (secret && userId) {
//     // Example: Handle the auth response (specific to Appwrite in this case)
//     account
//       .createSession(userId, secret)
//       .then(() => {
//         console.log("Logged in successfully!");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
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
