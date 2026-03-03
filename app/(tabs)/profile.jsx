import Card from '@/components/Card';
import CustomButtom from '@/components/CustomButton';
import CustomText from '@/components/CustomText';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const abs = [
        { name: 'First render', iconName: '1k' },
        { name: 'Second render', iconName: '2k' },
        { name: 'Third render', iconName: '3k' },
        { name: 'Fourth render', iconName: '4k' },
    ]

    return (
        <SafeAreaView>
            <View
                style={{
                    position: 'absolute',
                    height: 300,
                    width: '100%',
                    backgroundColor: '#800000',
                }}
            >
            </View>
            <Header leftIcon={"home"} rightIcon={"settings"} />
            <ProfileCard name={"Bilal Ahmed"} />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                }}
            >
                <CustomText text="Cards" style={{ fontSize: 18, marginTop: 10, textAlign: 'center' }} />
                <CustomButtom text="View all" icon="arrow-forward-ios" />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        padding: 20,
                    }}
                >
                    {abs.map((item, index) => (
                        <Card key={index} text={item.name} icon={item.iconName} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;
