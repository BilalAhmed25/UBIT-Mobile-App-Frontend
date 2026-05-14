import CustomText from '@/components/CustomText';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from '@/context/NotesContext';

const SEMESTERS = [
    'Sem 1',
    'Sem 2',
    'Sem 3',
    'Sem 4',
    'Sem 5',
    'Sem 6',
    'Sem 7',
    'Sem 8',
];

const NotesUploadScreen = () => {
    const router = useRouter();
    const { addNote } = useNotes();
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('CS');
    const [semester, setSemester] = useState('');
    const [showSemesterPicker, setShowSemesterPicker] = useState(false);
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFilePick = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                const file = result.assets[0];
                setSelectedFile({
                    name: file.name,
                    size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                    type: 'PDF',
                    uri: file.uri,
                });
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick document');
            console.error(error);
        }
    };

    const handleUpload = () => {
        if (!title.trim()) {
            Alert.alert('Missing Title', 'Please enter a title for your notes.');
            return;
        }
        if (!subject.trim()) {
            Alert.alert('Missing Subject', 'Please enter the subject name.');
            return;
        }
        if (!category) {
            Alert.alert('Missing Department', 'Please select a department.');
            return;
        }
        if (!semester) {
            Alert.alert('Missing Semester', 'Please select a semester.');
            return;
        }
        if (!selectedFile) {
            Alert.alert('No File', 'Please attach a file to upload.');
            return;
        }

        setUploading(true);
        // Simulate upload
        setTimeout(() => {
            setUploading(false);

            const newNote = {
                title: title.trim(),
                subject: subject.trim(),
                author: 'Student (You)',
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                pages: Math.floor(Math.random() * 50) + 10,
                fileSize: selectedFile.size,
                fileType: selectedFile.type,
                category: category,
                semester: parseInt(semester.replace('Sem ', ''), 10),
                description: description || 'No description provided.',
                downloads: 0,
                rating: 0,
                topics: [],
            };

            addNote(newNote);

            Alert.alert('Success!', 'Your notes have been uploaded successfully.', [
                { text: 'OK', onPress: () => router.back() },
            ]);
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.topBarBtn}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={22} color="#333" />
                </TouchableOpacity>
                <CustomText style={styles.topBarTitle}>Upload Notes</CustomText>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* File Upload Area */}
                    <TouchableOpacity
                        style={[
                            styles.uploadArea,
                            selectedFile && styles.uploadAreaSelected,
                        ]}
                        onPress={handleFilePick}
                        activeOpacity={0.7}
                    >
                        {selectedFile ? (
                            <View style={styles.selectedFileContainer}>
                                <View style={styles.selectedFileIcon}>
                                    <MaterialIcons
                                        name="picture-as-pdf"
                                        size={32}
                                        color="#ffffff"
                                    />
                                </View>
                                <CustomText style={styles.selectedFileName}>
                                    {selectedFile.name}
                                </CustomText>
                                <CustomText style={styles.selectedFileSize}>
                                    {selectedFile.size} • {selectedFile.type}
                                </CustomText>
                                <TouchableOpacity
                                    style={styles.changeFileBtn}
                                    onPress={handleFilePick}
                                >
                                    <CustomText style={styles.changeFileText}>
                                        Change File
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.uploadPlaceholder}>
                                <View style={styles.uploadIconCircle}>
                                    <Ionicons
                                        name="cloud-upload-outline"
                                        size={36}
                                        color="#800000"
                                    />
                                </View>
                                <CustomText style={styles.uploadTitle}>
                                    Tap to select a file
                                </CustomText>
                                <CustomText style={styles.uploadSubtitle}>
                                    PDF, DOC, DOCX, PPT (Max 10 MB)
                                </CustomText>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Form Fields */}
                    <View style={styles.formSection}>
                        {/* Title */}
                        <View style={styles.fieldGroup}>
                            <CustomText style={styles.fieldLabel}>
                                Title <CustomText style={{ color: '#e53935' }}>*</CustomText>
                            </CustomText>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="title" size={20} color="#999" />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="e.g. Data Structures Complete Notes"
                                    placeholderTextColor="#bbb"
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>
                        </View>

                        {/* Subject */}
                        <View style={styles.fieldGroup}>
                            <CustomText style={styles.fieldLabel}>
                                Subject <CustomText style={{ color: '#e53935' }}>*</CustomText>
                            </CustomText>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="book" size={20} color="#999" />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="e.g. Analysis of Algorithms"
                                    placeholderTextColor="#bbb"
                                    value={subject}
                                    onChangeText={setSubject}
                                />
                            </View>
                        </View>

                        {/* Department / Category */}
                        <View style={styles.fieldGroup}>
                            <CustomText style={styles.fieldLabel}>
                                Department <CustomText style={{ color: '#e53935' }}>*</CustomText>
                            </CustomText>
                            <TouchableOpacity
                                style={styles.inputWrapper}
                                onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                            >
                                <MaterialIcons name="category" size={20} color="#999" />
                                <CustomText
                                    style={[
                                        styles.pickerText,
                                        !category && { color: '#bbb' },
                                    ]}
                                >
                                    {category || 'Select Department'}
                                </CustomText>
                                <Ionicons
                                    name={
                                        showCategoryPicker
                                            ? 'chevron-up'
                                            : 'chevron-down'
                                    }
                                    size={20}
                                    color="#999"
                                />
                            </TouchableOpacity>

                            {showCategoryPicker && (
                                <View style={styles.pickerDropdown}>
                                    {['CS', 'SE', 'AI'].map((cat) => (
                                        <TouchableOpacity
                                            key={cat}
                                            style={[
                                                styles.pickerOption,
                                                category === cat &&
                                                    styles.pickerOptionActive,
                                            ]}
                                            onPress={() => {
                                                setCategory(cat);
                                                setShowCategoryPicker(false);
                                            }}
                                        >
                                            <CustomText
                                                style={[
                                                    styles.pickerOptionText,
                                                    category === cat &&
                                                        styles.pickerOptionTextActive,
                                                ]}
                                            >
                                                {cat === 'CS' ? 'Computer Science' : cat === 'SE' ? 'Software Engineering' : 'Artificial Intelligence'}
                                            </CustomText>
                                            {category === cat && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={18}
                                                    color="#800000"
                                                />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                        <View style={styles.fieldGroup}>
                            <CustomText style={styles.fieldLabel}>
                                Semester <CustomText style={{ color: '#e53935' }}>*</CustomText>
                            </CustomText>
                            <TouchableOpacity
                                style={styles.inputWrapper}
                                onPress={() => setShowSemesterPicker(!showSemesterPicker)}
                            >
                                <MaterialIcons name="school" size={20} color="#999" />
                                <CustomText
                                    style={[
                                        styles.pickerText,
                                        !semester && { color: '#bbb' },
                                    ]}
                                >
                                    {semester || 'Select a semester'}
                                </CustomText>
                                <Ionicons
                                    name={
                                        showSemesterPicker
                                            ? 'chevron-up'
                                            : 'chevron-down'
                                    }
                                    size={20}
                                    color="#999"
                                />
                            </TouchableOpacity>

                            {showSemesterPicker && (
                                <View style={styles.pickerDropdown}>
                                    {SEMESTERS.map((s) => (
                                        <TouchableOpacity
                                            key={s}
                                            style={[
                                                styles.pickerOption,
                                                semester === s &&
                                                    styles.pickerOptionActive,
                                            ]}
                                            onPress={() => {
                                                setSemester(s);
                                                setShowSemesterPicker(false);
                                            }}
                                        >
                                            <CustomText
                                                style={[
                                                    styles.pickerOptionText,
                                                    semester === s &&
                                                        styles.pickerOptionTextActive,
                                                ]}
                                            >
                                                {s}
                                            </CustomText>
                                            {semester === s && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={18}
                                                    color="#800000"
                                                />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Description */}
                        <View style={styles.fieldGroup}>
                            <CustomText style={styles.fieldLabel}>
                                Description
                            </CustomText>
                            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                                <TextInput
                                    style={[styles.textInput, styles.textArea]}
                                    placeholder="Add a brief description of what this note covers..."
                                    placeholderTextColor="#bbb"
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>
                            <CustomText style={styles.charCount}>
                                {description.length} / 500
                            </CustomText>
                        </View>
                    </View>

                    {/* Guidelines */}
                    <View style={styles.guidelinesCard}>
                        <View style={styles.guidelinesHeader}>
                            <Ionicons
                                name="information-circle"
                                size={20}
                                color="#800000"
                            />
                            <CustomText style={styles.guidelinesTitle}>
                                Upload Guidelines
                            </CustomText>
                        </View>
                        <View style={styles.guidelineRow}>
                            <View style={styles.bulletDot} />
                            <CustomText style={styles.guidelineText}>
                                Only upload notes you own or have permission to share
                            </CustomText>
                        </View>
                        <View style={styles.guidelineRow}>
                            <View style={styles.bulletDot} />
                            <CustomText style={styles.guidelineText}>
                                Maximum file size is 10 MB
                            </CustomText>
                        </View>
                        <View style={styles.guidelineRow}>
                            <View style={styles.bulletDot} />
                            <CustomText style={styles.guidelineText}>
                                Supported formats: PDF, DOC, DOCX, PPT
                            </CustomText>
                        </View>
                        <View style={styles.guidelineRow}>
                            <View style={styles.bulletDot} />
                            <CustomText style={styles.guidelineText}>
                                Include a clear and descriptive title
                            </CustomText>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Upload Button */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[
                        styles.uploadButton,
                        uploading && styles.uploadButtonDisabled,
                    ]}
                    onPress={handleUpload}
                    disabled={uploading}
                    activeOpacity={0.8}
                >
                    {uploading ? (
                        <CustomText style={styles.uploadButtonText}>
                            Uploading...
                        </CustomText>
                    ) : (
                        <>
                            <Ionicons
                                name="cloud-upload"
                                size={20}
                                color="#ffffff"
                            />
                            <CustomText style={styles.uploadButtonText}>
                                Upload Notes
                            </CustomText>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NotesUploadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f7',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    topBarBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    topBarTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#333',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    // Upload Area
    uploadArea: {
        marginHorizontal: 20,
        marginTop: 8,
        marginBottom: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#d4d4d4',
        borderStyle: 'dashed',
        backgroundColor: '#ffffff',
        padding: 30,
        alignItems: 'center',
    },
    uploadAreaSelected: {
        borderColor: '#800000',
        borderStyle: 'solid',
        backgroundColor: 'rgba(128, 0, 0, 0.03)',
    },
    uploadPlaceholder: {
        alignItems: 'center',
    },
    uploadIconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(128, 0, 0, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    uploadTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#333',
        marginBottom: 4,
    },
    uploadSubtitle: {
        fontSize: 13,
        color: '#999',
    },
    selectedFileContainer: {
        alignItems: 'center',
    },
    selectedFileIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#800000',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    selectedFileName: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#333',
    },
    selectedFileSize: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    changeFileBtn: {
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: 'rgba(128, 0, 0, 0.08)',
    },
    changeFileText: {
        fontSize: 13,
        color: '#800000',
        fontFamily: 'Poppins-SemiBold',
    },
    // Form
    formSection: {
        paddingHorizontal: 20,
    },
    fieldGroup: {
        marginBottom: 18,
    },
    fieldLabel: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#444',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#333',
        marginLeft: 10,
        paddingVertical: 0,
    },
    textAreaWrapper: {
        alignItems: 'flex-start',
        paddingTop: 14,
    },
    textArea: {
        height: 100,
        marginLeft: 0,
        textAlignVertical: 'top',
    },
    charCount: {
        fontSize: 12,
        color: '#bbb',
        textAlign: 'right',
        marginTop: 4,
    },
    pickerText: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
    pickerDropdown: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        overflow: 'hidden',
    },
    pickerOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    pickerOptionActive: {
        backgroundColor: 'rgba(128, 0, 0, 0.05)',
    },
    pickerOptionText: {
        fontSize: 14,
        color: '#555',
    },
    pickerOptionTextActive: {
        color: '#800000',
        fontFamily: 'Poppins-SemiBold',
    },
    // Guidelines
    guidelinesCard: {
        marginHorizontal: 20,
        marginTop: 4,
        backgroundColor: 'rgba(128, 0, 0, 0.04)',
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: 'rgba(128, 0, 0, 0.1)',
    },
    guidelinesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    guidelinesTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#800000',
    },
    guidelineRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bulletDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#800000',
        marginTop: 6,
        marginRight: 10,
    },
    guidelineText: {
        fontSize: 13,
        color: '#666',
        flex: 1,
    },
    // Bottom Bar
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 14,
        paddingBottom: 28,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#800000',
        paddingVertical: 16,
        borderRadius: 14,
        gap: 10,
    },
    uploadButtonDisabled: {
        backgroundColor: '#b08080',
    },
    uploadButtonText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
    },
});
