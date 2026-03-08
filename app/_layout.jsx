import CustomBottomNav from '@/components/CustomBottomNav';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function RootLayout() {
    const [loaded] = useFonts({
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    });

    if (!loaded) return null;

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }} >
                    {/* <Stack screenOptions={{ headerShown: false, animation: 'fade', }} /> */}
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'fade',
                        }}
                    >
                        <Stack.Screen name="home" />
                    </Stack>
                    <StatusBar style="dark" />
                    <CustomBottomNav />
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}
