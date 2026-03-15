import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/CustomText";
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet, View } from "react-native";

const DashboardBanner = ({ title, imageSource, onPress }) => {
    return (
        <>
            <ImageBackground
                source={imageSource}
                style={styles.container}
                imageStyle={styles.image}
            >
                {/* Bottom Shadow Overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                />

                {/* Your Content */}
                <View style={{ gap: 16, alignItems: 'flex-start' }}>
                    <CustomText style={styles.title}>{title}</CustomText>
                    <CustomButton text="Explore Campus" icon="arrow-forward-ios" color="#FFFFFF" style={{ backgroundColor: '#646464a6', borderRadius: 20, borderWidth: 1, borderColor: '#ffffff46', paddingVertical: 5 }} onPress={onPress} />
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        padding: 16,
        overflow: 'hidden',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingTop: 70,
    },
    image: {
        borderRadius: 12,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 120,
    },
    title: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        marginBottom: 4,
        maxWidth: 300,
        lineHeight: 24
    }
});

export default DashboardBanner;