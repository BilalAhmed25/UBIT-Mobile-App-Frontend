import CustomBottomNav from '@/components/CustomBottomNav';
import { Stack } from 'expo-router';

export default function MainLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
            <CustomBottomNav />
        </>
    );
}