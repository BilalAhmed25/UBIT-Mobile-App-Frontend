import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomBottomNav = () => {
    const router = useRouter();
    const path = usePathname(); // current route

    // Define tabs manually
    const tabs = [
        { name: 'home', label: 'Home', icon: 'home' },
        { name: 'courses', label: 'Courses', icon: 'book' },
        { name: 'schedule', label: 'Schedule', icon: 'calendar' },
        { name: 'profile', label: 'Profile', icon: 'person' },
    ];

    return (
        <SafeAreaView edges={['bottom']} >
            <View style={styles.container}>
                {tabs.map((tab) => {
                    const isActive = path.includes(tab.name); // highlight active tab

                    return (
                        <TouchableOpacity
                            key={tab.name}
                            style={{ ...styles.tab, backgroundColor: isActive ? 'rgba(136, 0, 0, 0.12)' : 'transparent' }}
                            onPress={() => router.push(`/screens/${tab.name}`)}
                        >
                            <Ionicons
                                name={tab.icon}
                                size={24}
                                color={isActive ? '#800' : '#8e8e93'}
                            />
                            <Text style={[styles.label, { color: isActive ? '#800' : '#8e8e93' }]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

export default CustomBottomNav;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 80 : 60,
        backgroundColor: '#fff',
        // borderTopWidth: 1,
        borderTopColor: '#ccc',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0, // extra padding for iOS safe area
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
    },
    label: {
        fontSize: 12,
        marginTop: 2,
    },
});