import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SocialSignIn = () => {
    return (
        <View style={styles.row}>
            {/* Google Button */}
            <TouchableOpacity
                style={[styles.button, styles.googleButton]}
                onPress={() => console.log('Google Sign-In')}
            >
                <Image source={{ uri: ('https://cdn.iconscout.com/icon/free/png-256/free-google-icon-svg-download-png-189824.png') }} style={{ width: 20, height: 20, marginRight: 10 }} />
                <Text style={styles.googleText}>Google</Text>
            </TouchableOpacity>

            {/* Facebook Button */}
            <TouchableOpacity
                style={[styles.button, styles.facebookButton]}
                onPress={() => console.log('Facebook Sign-In')}
            >
                <Image source={require('@/assets/images/facebook-logo.png')} style={{ width: 10, height: 20, marginRight: 14 }} />
                <Text style={styles.facebookText}>Facebook</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Pushes buttons to edges
        gap: 15, // Adds spacing between the buttons
        width: '100%',
    },
    button: {
        flex: 1, // Makes both buttons take up equal width
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
    },
    googleButton: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    facebookButton: {
        backgroundColor: '#1877F2',
        borderColor: '#1877F2',
    },
    googleText: {
        color: '#000',
        fontSize: 16,
        lineHeight: 18,
        fontFamily: 'Poppins-Regular',
    },
    facebookText: {
        color: '#fff',
        fontSize: 16,
        lineHeight: 18,
        fontFamily: 'Poppins-Regular',
    },
});

export default SocialSignIn;