import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, View } from "react-native";

const Login = () => {
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <StatusBar style="dark" backgroundColor='#eeeeee' />

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }}
            >
                <Image source={require('@/assets/images/ubit-logo.jpeg')} style={{ width: 140, height: 140, marginBottom: 20, borderRadius: 500 }} />
                <CustomText style={{ fontSize: 32, fontFamily: 'Poppins-SemiBold' }}>Welcome Back</CustomText>
                <CustomText style={{ fontSize: 16, color: '#666' }}>Please sign in to continue</CustomText>

                <FloatingLabelInput label="Email address" value={""} />
                <FloatingLabelInput label="Password" value={""} />
                <CustomButton text="Sign In" onPress={() => { }} style={{ marginTop: 20, width: '100%', backgroundColor: '#800000' }} color='#fff' />

                <CustomText style={{ fontSize: 14, color: '#666' }}>Or sign in with</CustomText>
            </View>
        </ScrollView>
    )
}

export default Login;