import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import SocialSignIn from "@/components/social-signin";
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                contentInsetAdjustmentBehavior="automatic"
            >

                <StatusBar style="automatic" />

                <View style={styles.mainWrapper}>

                    <View style={styles.topSection}>
                        <Image
                            source={require('@/assets/images/ubit-logo.jpeg')}
                            style={styles.logo}
                        />
                        <CustomText style={styles.title}>Welcome Back</CustomText>
                        <CustomText style={styles.subtitle}>Please sign in to continue</CustomText>

                        <FloatingLabelInput label="Email address" value={""} />
                        <FloatingLabelInput label="Password" value={""} />

                        <CustomButton   
                            text="Sign In"
                            onPress={() => { }}
                            style={styles.signInButton}
                            color='#fff'
                        />

                        <View style={styles.dividerContainer}>
                            <View style={styles.line} />
                            <CustomText style={styles.dividerText}>Or sign in with</CustomText>
                            <View style={styles.line} />
                        </View>

                        <SocialSignIn />
                    </View>

                    <View style={styles.bottomSection}>

                        <View style={styles.footerRow}>
                            <CustomText style={styles.footerText}>Don't have an account? </CustomText>
                            <CustomText style={styles.footerLink}>Contact Admissions</CustomText>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    topSection: {
        alignItems: 'center',
        width: '100%',
    },
    bottomSection: {
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
        paddingBottom: 20,
    },
    logo: { width: 140, height: 140, marginBottom: 20, borderRadius: 500 },
    title: { fontSize: 32, fontFamily: 'Poppins-SemiBold' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
    signInButton: { marginTop: 20, width: '100%', backgroundColor: '#800000' },

    // Your Divider Styles
    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 50 },
    line: { flex: 1, height: 1, backgroundColor: '#ddd' },
    dividerText: { width: 120, textAlign: 'center', fontSize: 14, color: '#666', marginHorizontal: 10 },

    footerRow: { flexDirection: 'row', marginTop: 20 },
    footerText: { fontSize: 14, color: '#666' },
    footerLink: { fontSize: 14, color: '#800000', fontFamily: 'Poppins-SemiBold' },
});

export default Login;