import { Image, View } from 'react-native';
import CustomText from './CustomText';

const ProfileCard = ({ name }) => {
    return (
        <View
            style={{
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: '90%',
                    backgroundColor: '#ffff',
                    borderRadius: 20,
                    marginTop: 60,
                    paddingVertical: 20,
                    alignItems: 'center',
                }}
            >
                <Image
                    source={{ uri: 'https://miro.medium.com/v2/resize:fit:500/0*X7e4LM92V7Qnrbyn' }}
                    style={{ width: 120, height: 120, borderRadius: 80, marginTop: -80, marginBottom: 20, borderColor: '#696868', borderWidth: 1 }}
                />
                <CustomText text={name ? name : 'No Name'} fontFamily="Poppins-Bold" fontSize={22} />
                <CustomText text="123456789" />
                <CustomText text="Department of Computer Science" color="#800000" />

                <View style={{ height: 1, width: '60%', backgroundColor: '#bbbbbb', marginVertical: 20 }}></View>
                <CustomText text="Current Enrolment" />
                <CustomText text="Third Year (5th Semester)" fontFamily="Poppins-SemiBold" color="#800000" />
            </View>
        </View>
    );
}

export default ProfileCard;