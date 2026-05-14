import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NotesProvider } from "@/context/NotesContext";

export default function RootLayout() {
    const [isLoggedIn] = useState(true);

    const [loaded] = useFonts({
        "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    });

    if (!loaded) return null;

    return (
        <NotesProvider>
            <SafeAreaProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    {isLoggedIn ? (
                        <Stack.Screen name="(screens)" />
                    ) : (
                        <Stack.Screen name="(auth)" />
                    )}
                </Stack>
            </SafeAreaProvider>
        </NotesProvider>
    );
}