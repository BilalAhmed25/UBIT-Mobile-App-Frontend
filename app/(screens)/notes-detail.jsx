import CustomText from '@/components/CustomText';
import DownloadConfirmModal from '@/components/notes/DownloadConfirmModal';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Linking, ScrollView, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import { useNotes } from '@/context/NotesContext';

const NotesDetailScreen = () => {
    const router = useRouter();
    const { noteId } = useLocalSearchParams();
    const { notes, updateNoteRating, bookmarks, toggleBookmark } = useNotes();
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const isBookmarked = bookmarks.includes(noteId);

    const note = notes.find((n) => n.id === noteId);

    if (!note) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorState}>
                    <MaterialIcons name="error-outline" size={64} color="#d4d4d4" />
                    <CustomText style={styles.errorText}>Note not found</CustomText>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => router.back()}
                    >
                        <CustomText style={styles.backBtnText}>Go Back</CustomText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating - fullStars >= 0.5;

        for (let i = 1; i <= 5; i++) {
            const isFull = i <= fullStars;
            const isHalf = !isFull && i === fullStars + 1 && hasHalf;
            
            stars.push(
                <TouchableOpacity 
                    key={i} 
                    onPress={() => updateNoteRating(noteId, i)} 
                    activeOpacity={0.7}
                >
                    <Ionicons 
                        name={isFull ? "star" : isHalf ? "star-half" : "star-outline"} 
                        size={20} 
                        color={isFull || isHalf ? "#f5a623" : "#d4d4d4"} 
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out these notes: ${note.title}\nhttps://ubit-mobile.app/notes/${noteId}`,
                title: note.title,
            });
        } catch (error) {
            Alert.alert('Error', 'Could not share the note');
            console.error('Share error:', error);
        }
    };

    const handlePreview = async () => {
        if (!note.uri) {
            Alert.alert('No File', 'This note does not have a file associated with it.');
            return;
        }

        try {
            if (note.uri.startsWith('http')) {
                // For remote URLs, first try in-app browser
                const supported = await Linking.canOpenURL(note.uri);
                if (supported) {
                    await WebBrowser.openBrowserAsync(note.uri);
                } else {
                    // Fallback to external browser
                    await Linking.openURL(note.uri);
                }
            } else {
                // For local files, check if sharing is available
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(note.uri);
                } else {
                    Alert.alert('Preview Error', 'Sharing/Viewing is not supported on this device');
                }
            }
        } catch (error) {
            Alert.alert('Preview Error', 'Could not open the file preview.');
            console.error('Preview error:', error);
        }
    };

    const handleDownload = async () => {
        if (!note.uri) {
            Alert.alert('No File', 'This note does not have a file associated with it.');
            return;
        }

        setIsDownloading(true);
        try {
            if (note.uri.startsWith('http')) {
                // Sanitize filename: remove special characters and spaces
                const safeTitle = note.title.replace(/[^a-zA-Z0-9]/g, '_');
                const filename = `${safeTitle}_${Date.now()}.pdf`;
                const fileUri = `${FileSystem.documentDirectory}${filename}`;
                
                console.log('Starting download to:', fileUri);
                
                const downloadResult = await FileSystem.downloadAsync(note.uri, fileUri);
                
                if (downloadResult.status === 200) {
                    if (await Sharing.isAvailableAsync()) {
                        await Sharing.shareAsync(downloadResult.uri);
                        Alert.alert('Success', 'Note is ready to be saved!');
                    } else {
                        Alert.alert('Success', 'Note downloaded to app storage.');
                    }
                } else {
                    throw new Error(`Download failed with status ${downloadResult.status}`);
                }
            } else {
                // Local file already exists, just share it
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(note.uri);
                } else {
                    Alert.alert('Info', 'This is a locally stored file.');
                }
            }
        } catch (error) {
            Alert.alert('Download Error', 'Failed to process download. Please check your internet connection.');
            console.error('Download error:', error);
        } finally {
            setIsDownloading(false);
        }
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
                <CustomText style={styles.topBarTitle} numberOfLines={1}>
                    Note Details
                </CustomText>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity style={styles.topBarBtn} onPress={handleShare}>
                        <Ionicons name="share-social-outline" size={20} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.topBarBtn, isBookmarked ? styles.topBarBtnActive : null]} 
                        onPress={() => toggleBookmark(noteId)}
                    >
                        <Ionicons 
                            name={isBookmarked ? "bookmark" : "bookmark-outline"} 
                            size={20} 
                            color={isBookmarked ? "#ffffff" : "#333"} 
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Hero Card */}
                <View style={styles.heroCard}>
                    <View style={styles.fileIconContainer}>
                        <View style={styles.fileIcon}>
                            <MaterialIcons
                                name="picture-as-pdf"
                                size={36}
                                color="#ffffff"
                            />
                        </View>
                        <View style={styles.fileTypeBadge}>
                            <CustomText style={styles.fileTypeText}>
                                {note.fileType}
                            </CustomText>
                        </View>
                    </View>

                    <CustomText style={styles.noteTitle}>{note.title}</CustomText>
                    <CustomText style={styles.noteSubject}>Semester {note.semester}</CustomText>

                    {/* Rating */}
                    <View style={styles.ratingRow}>
                        <View style={styles.starsRow}>{renderStars(note.rating)}</View>
                        <CustomText style={styles.ratingText}>
                            {note.rating.toFixed(1)} / 5.0
                        </CustomText>
                    </View>
                </View>

                {/* Info Grid */}
                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <MaterialIcons name="person" size={20} color="#800000" />
                        <CustomText style={styles.infoLabel}>Author</CustomText>
                        <CustomText style={styles.infoValue}>{note.author}</CustomText>
                    </View>
                    <View style={styles.infoItem}>
                        <MaterialIcons name="calendar-today" size={20} color="#800000" />
                        <CustomText style={styles.infoLabel}>Date</CustomText>
                        <CustomText style={styles.infoValue}>{note.date}</CustomText>
                    </View>
                    <View style={styles.infoItem}>
                        <MaterialIcons name="description" size={20} color="#800000" />
                        <CustomText style={styles.infoLabel}>Pages</CustomText>
                        <CustomText style={styles.infoValue}>
                            {note.pages} pages
                        </CustomText>
                    </View>
                    <View style={styles.infoItem}>
                        <MaterialIcons name="cloud-download" size={20} color="#800000" />
                        <CustomText style={styles.infoLabel}>Downloads</CustomText>
                        <CustomText style={styles.infoValue}>
                            {note.downloads}
                        </CustomText>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <CustomText style={styles.sectionTitle}>Description</CustomText>
                    <CustomText style={styles.descriptionText}>
                        {note.description}
                    </CustomText>
                </View>

                {/* Topics Covered */}
                {note.topics && (
                    <View style={styles.section}>
                        <CustomText style={styles.sectionTitle}>
                            Topics Covered
                        </CustomText>
                        {note.topics.map((topic, index) => (
                            <View key={index} style={styles.topicRow}>
                                <View style={styles.topicDot} />
                                <CustomText style={styles.topicText}>
                                    {topic}
                                </CustomText>
                            </View>
                        ))}
                    </View>
                )}

                {/* File Info Banner */}
                <View style={styles.fileBanner}>
                    <View style={styles.fileBannerLeft}>
                        <MaterialIcons
                            name="insert-drive-file"
                            size={24}
                            color="#800000"
                        />
                        <View style={{ marginLeft: 12 }}>
                            <CustomText style={styles.fileNameText}>
                                {note.title}.pdf
                            </CustomText>
                            <CustomText style={styles.fileSizeText}>
                                {note.fileSize} • {note.pages} pages
                            </CustomText>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.previewBtn} onPress={handlePreview}>
                    <Ionicons name="eye-outline" size={20} color="#800000" />
                    <CustomText style={styles.previewBtnText}>Preview</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.downloadBtn, isDownloading && { opacity: 0.7 }]}
                    onPress={() => setShowDownloadModal(true)}
                    disabled={isDownloading}
                >
                    {isDownloading ? (
                        <CustomText style={styles.downloadBtnText}>Downloading...</CustomText>
                    ) : (
                        <>
                            <Ionicons name="download-outline" size={20} color="#ffffff" />
                            <CustomText style={styles.downloadBtnText}>Download</CustomText>
                        </>
                    )}
                </TouchableOpacity>
            </View>

            {/* Download Confirmation Modal */}
            <DownloadConfirmModal
                visible={showDownloadModal}
                note={note}
                onCancel={() => setShowDownloadModal(false)}
                onConfirm={() => {
                    setShowDownloadModal(false);
                    handleDownload();
                }}
            />
        </SafeAreaView>
    );
};

export default NotesDetailScreen;

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
    topBarBtnActive: {
        backgroundColor: '#800000',
    },
    topBarTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    heroCard: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 16,
    },
    fileIconContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    fileIcon: {
        width: 72,
        height: 72,
        borderRadius: 20,
        backgroundColor: '#800000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fileTypeBadge: {
        backgroundColor: '#b71c1c',
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 10,
        marginTop: -10,
    },
    fileTypeText: {
        fontSize: 11,
        color: '#ffffff',
        fontFamily: 'Poppins-Bold',
    },
    noteTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 4,
    },
    noteSubject: {
        fontSize: 14,
        color: '#800000',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 12,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    starsRow: {
        flexDirection: 'row',
        gap: 2,
    },
    ratingText: {
        fontSize: 13,
        color: '#888',
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 20,
        gap: 10,
        marginBottom: 16,
    },
    infoItem: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        padding: 14,
        alignItems: 'center',
        width: '48%',
        flexGrow: 1,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    infoLabel: {
        fontSize: 11,
        color: '#999',
        marginTop: 6,
    },
    infoValue: {
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
        color: '#333',
        marginTop: 2,
        textAlign: 'center',
    },
    section: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#1a1a1a',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
    },
    topicRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
    },
    topicDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#800000',
        marginRight: 12,
    },
    topicText: {
        fontSize: 14,
        color: '#444',
    },
    fileBanner: {
        backgroundColor: 'rgba(128, 0, 0, 0.06)',
        marginHorizontal: 20,
        borderRadius: 14,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(128, 0, 0, 0.12)',
        marginBottom: 16,
    },
    fileBannerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    fileNameText: {
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
        color: '#333',
    },
    fileSizeText: {
        fontSize: 12,
        color: '#888',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 14,
        paddingBottom: 28,
        gap: 12,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    previewBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#800000',
        gap: 8,
    },
    previewBtnText: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#800000',
    },
    downloadBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: '#800000',
        gap: 8,
    },
    downloadBtnText: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
    },
    errorState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#666',
        marginTop: 16,
    },
    backBtn: {
        marginTop: 16,
        backgroundColor: '#800000',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    backBtnText: {
        color: '#ffffff',
        fontFamily: 'Poppins-SemiBold',
    },
    deleteLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#fff1f1',
        gap: 6,
    },
    deleteLinkText: {
        fontSize: 13,
        color: '#e53935',
        fontFamily: 'Poppins-SemiBold',
    },
});
