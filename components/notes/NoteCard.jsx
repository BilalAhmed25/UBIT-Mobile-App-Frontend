import CustomText from '@/components/CustomText';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const NoteCard = ({ note, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Left Icon */}
            <View style={styles.iconContainer}>
                <MaterialIcons name="picture-as-pdf" size={26} color="#ffffff" />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <View style={styles.subjectBadge}>
                        <CustomText style={styles.subjectText}>
                            Sem {note.semester}
                        </CustomText>
                    </View>
                    <CustomText style={styles.dateText}>{note.date}</CustomText>
                </View>

                <CustomText
                    style={styles.titleText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {note.title}
                </CustomText>

                {/* Author */}
                <CustomText
                    style={styles.authorText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {note.author}
                </CustomText>

                {/* Bottom Meta Row */}
                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Ionicons name="document-outline" size={13} color="#999" />
                        <CustomText style={styles.metaText}>
                            {note.pages} pg
                        </CustomText>
                    </View>
                    <View style={styles.metaItem}>
                        <MaterialIcons name="sd-storage" size={13} color="#999" />
                        <CustomText style={styles.metaText}>
                            {note.fileSize}
                        </CustomText>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="download-outline" size={13} color="#999" />
                        <CustomText style={styles.metaText}>
                            {note.downloads}
                        </CustomText>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="star" size={13} color="#f5a623" />
                        <CustomText style={styles.metaText}>
                            {note.rating.toFixed(1)}
                        </CustomText>
                    </View>
                </View>
            </View>

            {/* Chevron */}
            <Ionicons
                name="chevron-forward"
                size={20}
                color="#ccc"
                style={styles.chevron}
            />
        </TouchableOpacity>
    );
};

export default NoteCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        alignItems: 'center',
        overflow: 'hidden',
    },
    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 13,
        backgroundColor: '#800000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
        overflow: 'hidden',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    subjectBadge: {
        backgroundColor: 'rgba(128, 0, 0, 0.08)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    subjectText: {
        fontSize: 11,
        color: '#800000',
        fontFamily: 'Poppins-SemiBold',
    },
    dateText: {
        fontSize: 11,
        color: '#aaa',
    },
    titleText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#1a1a1a',
        marginBottom: 1,
    },
    authorText: {
        fontSize: 12,
        color: '#888',
        marginBottom: 6,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    metaText: {
        fontSize: 11,
        color: '#999',
        marginLeft: 3,
    },
    chevron: {
        marginLeft: 4,
    },
});
