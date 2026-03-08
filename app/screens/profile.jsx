import Header from '@/components/Header';
import ContactCard from '@/components/profile/contact-card';
import ProfileCard from '@/components/profile/profile-card';
import QuickLinksCard from '@/components/profile/quick-links-card';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';


const HomeScreen = () => {
    const quickLinks = [
        {
            icon: 'description',
            label: 'Academic Transcripts',
            onPress: () => { }
        },
        {
            icon: 'school',
            label: 'Course Registration',
            onPress: () => { }
        },
        {
            icon: 'credit-card',
            label: 'Student ID Card',
            onPress: () => { }
        }
    ]

    return (
        <>
            <StatusBar style='light' backgroundColor='#800000' />

            <View
                style={{
                    position: 'absolute',
                    height: 300,
                    width: '100%',
                    backgroundColor: '#800000',
                }}
            >
            </View>
            <Header leftIcon={"arrow-back"} rightIcon={"settings"} />
            <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
                <ProfileCard name={"Bilal Ahmed"} />
                <ContactCard data={""} />
                <QuickLinksCard data={quickLinks} />
            </ScrollView>
        </>
    );
}

export default HomeScreen;
