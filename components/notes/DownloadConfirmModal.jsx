import CustomText from '@/components/CustomText';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const DownloadConfirmModal = ({ visible, note, onCancel, onConfirm }) => {
    if (!note) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            {/* Icon */}
                            <View style={styles.iconCircle}>
                                <Ionicons
                                    name="download-outline"
                                    size={32}
                                    color="#800000"
                                />
                            </View>

                            <CustomText style={styles.title}>
                                Download Notes?
                            </CustomText>
                            <CustomText style={styles.subtitle}>
                                You are about to download the following file:
                            </CustomText>

                            {/* File Info Card */}
                            <View style={styles.fileInfoCard}>
                                <MaterialIcons
                                    name="picture-as-pdf"
                                    size={28}
                                    color="#800000"
                                />
                                <View style={styles.fileDetails}>
                                    <CustomText
                                        style={styles.fileName}
                                        numberOfLines={1}
                                    >
                                        {note.title}.pdf
                                    </CustomText>
                                    <CustomText style={styles.fileMeta}>
                                        {note.fileSize} • {note.pages} pages •{' '}
                                        {note.fileType}
                                    </CustomText>
                                </View>
                            </View>

                            {/* Storage Info */}
                            <View style={styles.storageRow}>
                                <Ionicons
                                    name="phone-portrait-outline"
                                    size={16}
                                    color="#888"
                                />
                                <CustomText style={styles.storageText}>
                                    File will be saved to your Downloads folder
                                </CustomText>
                            </View>

                            {/* Buttons */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={styles.cancelBtn}
                                    onPress={onCancel}
                                >
                                    <CustomText style={styles.cancelBtnText}>
                                        Cancel
                                    </CustomText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.confirmBtn}
                                    onPress={onConfirm}
                                >
                                    <Ionicons
                                        name="download"
                                        size={18}
                                        color="#ffffff"
                                    />
                                    <CustomText style={styles.confirmBtnText}>
                                        Download
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default DownloadConfirmModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 28,
        width: '100%',
        alignItems: 'center',
    },
    iconCircle: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: 'rgba(128, 0, 0, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#1a1a1a',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    fileInfoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8fa',
        borderRadius: 14,
        padding: 14,
        width: '100%',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 14,
    },
    fileDetails: {
        flex: 1,
        marginLeft: 12,
    },
    fileName: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#333',
    },
    fileMeta: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    storageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 24,
    },
    storageText: {
        fontSize: 12,
        color: '#888',
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelBtnText: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#666',
    },
    confirmBtn: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: '#800000',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    confirmBtnText: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
    },
});
