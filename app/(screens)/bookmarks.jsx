import CustomText from '@/components/CustomText';
import NoteCard from '@/components/notes/NoteCard';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from '@/context/NotesContext';

const BookmarksScreen = () => {
    const router = useRouter();
    const { notes, bookmarks } = useNotes();

    const bookmarkedNotes = notes.filter((note) => bookmarks.includes(note.id));

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <CustomText style={styles.headerTitle}>My Bookmarks</CustomText>
                <View style={{ width: 40 }} /> {/* Spacer */}
            </View>

            {bookmarkedNotes.length > 0 ? (
                <FlatList
                    data={bookmarkedNotes}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <NoteCard
                            note={item}
                            onPress={() =>
                                router.push({
                                    pathname: '/(screens)/notes-detail',
                                    params: { noteId: item.id },
                                })
                            }
                        />
                    )}
                />
            ) : (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIconCircle}>
                        <Ionicons name="bookmark-outline" size={64} color="#ccc" />
                    </View>
                    <CustomText style={styles.emptyTitle}>No bookmarks yet</CustomText>
                    <CustomText style={styles.emptySubtitle}>
                        Your saved notes will appear here for quick access
                    </CustomText>
                    <TouchableOpacity
                        style={styles.browseBtn}
                        onPress={() => router.back()}
                    >
                        <CustomText style={styles.browseBtnText}>Browse Notes</CustomText>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#1a1a1a',
    },
    listContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyIconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    emptyTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 32,
    },
    browseBtn: {
        backgroundColor: '#800000',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 14,
    },
    browseBtnText: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#ffffff',
    },
});
