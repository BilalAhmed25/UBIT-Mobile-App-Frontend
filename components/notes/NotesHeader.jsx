import CustomText from '@/components/CustomText';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const NotesHeader = ({ onUploadPress }) => {
    return (
        <View style={styles.header}>
            <View>
                <CustomText style={styles.title}>Notes</CustomText>
                <CustomText style={styles.subtitle}>
                    Browse & share study material
                </CustomText>
            </View>
            <TouchableOpacity
                style={styles.uploadBtn}
                onPress={onUploadPress}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={20} color="#ffffff" />
                <CustomText style={styles.uploadBtnText}>Upload</CustomText>
            </TouchableOpacity>
        </View>
    );
};

export default NotesHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 13,
        color: '#888',
        marginTop: -2,
    },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#800000',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 6,
    },
    uploadBtnText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
    },
});
