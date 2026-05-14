import CustomText from '@/components/CustomText';
import NoteCard from '@/components/notes/NoteCard';
import NotesHeader from '@/components/notes/NotesHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from '@/context/NotesContext';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const CATEGORIES = ['All', 'CS', 'SE', 'AI'];

const NotesScreen = () => {
    const router = useRouter();
    const { notes } = useNotes();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [expandedSemester, setExpandedSemester] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' or 'asc'

    const filteredNotes = notes
        .filter((note) => {
            const matchesSearch =
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.author.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory =
                activeCategory === 'All' || note.category === activeCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });

    const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
    const sortedSemesters = sortOrder === 'asc' ? SEMESTERS : [...SEMESTERS].reverse();
    
    const groupedNotes = sortedSemesters.map(sem => ({
        semester: sem,
        notes: filteredNotes.filter(n => n.semester === sem)
    })).filter(group => group.notes.length > 0);

    return (
        <SafeAreaView style={styles.container}>
            <NotesHeader
                onUploadPress={() =>
                    router.push('/(screens)/notes-upload')
                }
            />

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#9e9e9e" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search notes, subjects, authors..."
                        placeholderTextColor="#9e9e9e"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons
                                name="close-circle"
                                size={20}
                                color="#9e9e9e"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Category Chips & Bookmark */}
            <View style={styles.categoriesRow}>
                <ScrollView
                    horizontal
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryContainer}
                >
                    {CATEGORIES.map((cat, index) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.chip,
                                activeCategory === cat && styles.chipActive,
                            ]}
                            onPress={() => setActiveCategory(cat)}
                        >
                            <CustomText
                                style={[
                                    styles.chipText,
                                    activeCategory === cat && styles.chipTextActive,
                                ]}
                            >
                                {cat}
                            </CustomText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity 
                    style={styles.inlineBookmarkBtn}
                    onPress={() => router.push('/(screens)/bookmarks')}
                    activeOpacity={0.7}
                >
                    <Ionicons name="bookmark" size={18} color="#800000" />
                </TouchableOpacity>
            </View>

            {/* Notes Count */}
            <View style={styles.resultsRow}>
                <CustomText style={styles.resultsText}>
                    {filteredNotes.length}{' '}
                    {filteredNotes.length === 1 ? 'note' : 'notes'} found
                </CustomText>
                <TouchableOpacity 
                    style={styles.sortButton}
                    onPress={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                >
                    <CustomText style={styles.sortText}>
                        {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </CustomText>
                    <Ionicons 
                        name={sortOrder === 'asc' ? "arrow-up" : "arrow-down"} 
                        size={14} 
                        color="#800000" 
                    />
                </TouchableOpacity>
            </View>

            {/* Notes List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            >
                {groupedNotes.length > 0 ? (
                    groupedNotes.map((group) => (
                        <View key={`sem-${group.semester}`} style={styles.semesterGroup}>
                            <TouchableOpacity 
                                style={styles.semesterCard} 
                                activeOpacity={0.7}
                                onPress={() => {
                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                    setExpandedSemester(expandedSemester === group.semester ? null : group.semester);
                                }}
                            >
                                <View style={styles.semesterCardContent}>
                                    <View style={styles.semesterIconBox}>
                                        <MaterialIcons name="school" size={24} color="#800000" />
                                    </View>
                                    <View style={styles.semesterInfo}>
                                        <CustomText style={styles.semesterTitle}>
                                            Semester {group.semester}
                                        </CustomText>
                                        <CustomText style={styles.semesterSubtitle}>
                                            {group.notes.length} {group.notes.length === 1 ? 'note' : 'notes'} available
                                        </CustomText>
                                    </View>
                                </View>
                                <Ionicons 
                                    name={expandedSemester === group.semester ? "chevron-up" : "chevron-down"} 
                                    size={20} 
                                    color="#800000" 
                                />
                            </TouchableOpacity>
                            
                            {expandedSemester === group.semester && (
                                <View style={styles.expandedNotes}>
                                    {group.notes.map((note) => (
                                        <NoteCard
                                            key={note.id}
                                            note={note}
                                            onPress={() =>
                                                router.push({
                                                    pathname: '/(screens)/notes-detail',
                                                    params: { noteId: note.id },
                                                })
                                            }
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <MaterialIcons
                            name="search-off"
                            size={64}
                            color="#d4d4d4"
                        />
                        <CustomText style={styles.emptyTitle}>
                            No notes found
                        </CustomText>
                        <CustomText style={styles.emptySubtitle}>
                            Try adjusting your search or filter
                        </CustomText>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f7',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#333',
        marginLeft: 10,
        paddingVertical: 0,
    },
    categoriesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
    },
    categoryContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    inlineBookmarkBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    chip: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    chipActive: {
        backgroundColor: '#800000',
        borderColor: '#800000',
    },
    chipText: {
        fontSize: 13,
        color: '#666',
    },
    chipTextActive: {
        color: '#ffffff',
        fontFamily: 'Poppins-SemiBold',
    },
    resultsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    resultsText: {
        fontSize: 13,
        color: '#888',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sortText: {
        fontSize: 13,
        color: '#800000',
        fontFamily: 'Poppins-SemiBold',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    semesterGroup: {
        marginBottom: 16,
    },
    semesterCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    semesterCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    semesterIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(128, 0, 0, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    semesterInfo: {
        justifyContent: 'center',
    },
    semesterTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#333',
    },
    semesterSubtitle: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    expandedNotes: {
        marginTop: 12,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    emptyTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#666',
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
    },
});
