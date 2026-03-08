import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import AnnoucementCard from '@/components/dashboard/annoucement-card';
import DashboardBanner from '@/components/dashboard/banner';
import DashboardCard from '@/components/dashboard/card';
import DashboardHeader from '@/components/dashboard/header';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const cardsData = [
        { name: 'Timetable', iconName: '1k', iconColor: '#800000' },
        { name: 'Records', iconName: '2k', iconColor: '#1950c7' },
        { name: 'Attendance', iconName: '3k', iconColor: '#338000' },
        { name: 'Campus', iconName: '4k', iconColor: '#805e00' },
    ]

    const announcementsData = [
        { title: 'Midterm Exams Schedule', description: 'Midterm exams will commence from 15th March. Please check your timetable for details.', date: 'March 10, 2024', icon: 'schedule' },
        { title: 'Library Renovation', description: 'The library will be closed for renovation from 1st April to 30th April. Plan your visits accordingly.', date: 'March 25, 2024', icon: 'local-library' },
        { title: 'New Course Offerings', description: 'New courses in Data Science and AI will be available next semester. Check the course catalog for more info.', date: 'April 5, 2024', icon: 'book' },
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="automatic" />

            <DashboardHeader />
            <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 70 }}>
                <DashboardBanner
                    title="Your Academic Journey Starts Here"
                    imageSource={require('@/assets/images/ubit-facade.jpg')}
                />

                <CustomText style={{ fontSize: 18, marginHorizontal: 20, marginTop: 10 }}>Quick Actions</CustomText>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    padding: 10,
                    marginHorizontal: 10,
                }}>
                    {cardsData.map((item, index) => (
                        <DashboardCard
                            key={index}
                            title={item.name}
                            description={`View your ${item.name.toLowerCase()} details and updates.`}
                            iconName={item.iconName}
                            iconColor={item.iconColor}

                            onPress={() => { }}
                            style={{ width: '48%', marginBottom: 15 }}
                        />
                    ))}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginVertical: 10 }}>
                    <CustomText style={{ fontSize: 18 }}>Recent Announcements</CustomText>
                    <CustomButton text="History" icon="chevron-right" style={{ fontSize: 14, color: '#007BFF' }} onPress={() => { }} />
                </View>

                {announcementsData.map((item, index) => (
                    <View key={index} style={{ marginHorizontal: 20, marginBottom: 15 }}>
                        <AnnoucementCard
                            title={item.title}
                            description={item.description}
                            date={item.date}
                            icon={item.icon}
                        />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;
