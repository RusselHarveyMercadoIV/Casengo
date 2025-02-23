import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "ABeeZee-Regular": require("../assets/fonts/ABeeZee-Regular.ttf"),
    "ABeeZee-Italic": require("../assets/fonts/ABeeZee-Italic.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
    "Inter-Italic": require("../assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GlobalProvider>
  );
}
