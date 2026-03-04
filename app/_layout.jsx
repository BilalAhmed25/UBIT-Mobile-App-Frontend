import CustomBottomNav from '@/components/CustomBottomNav';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
    const [loaded] = useFonts({
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    });

    if (!loaded) return null;

    return (
        <>
            <Stack screenOptions={{ headerShown: false, animation: 'fade', }} />

            <StatusBar style="dark" />
            <CustomBottomNav />
        </>
    );
}
