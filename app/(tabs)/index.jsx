import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import DashboardBanner from '@/components/dashboardBanner';
import DashboardCard from '@/components/dashboardCard';
import DashboardHeader from '@/components/dashboardHeader';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const cardsData = [
        { name: 'Timetable', iconName: '1k', iconColor: '#800000' },
        { name: 'Records', iconName: '2k', iconColor: '#1950c7' },
        { name: 'Attendance', iconName: '3k', iconColor: '#338000' },
        { name: 'Campus', iconName: '4k', iconColor: '#805e00' },
    ]
    return (
        <SafeAreaView>
            <DashboardHeader />
            <ScrollView vertical showsVerticalScrollIndicator={false}>
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 10 }}>
                    <CustomText style={{ fontSize: 18 }}>Recent Announcements</CustomText>
                    <CustomButton text="History" icon="chevron-right" style={{ fontSize: 14, color: '#007BFF' }} onPress={() => { }} />
                </View>

            </ScrollView>
        </SafeAreaView >
    );
}

export default HomeScreen;
