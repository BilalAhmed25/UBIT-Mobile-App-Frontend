import CustomText from "@/components/CustomText";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

const AnnoucementCard = ({ title, description, date, icon }) => {
    return (
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 15}}>
            <MaterialIcons name={icon} size={30} color="#800000" backgroundColor={"#800000" + "10"} padding={10} borderRadius={10} />
            <View style={{ flex: 1 }}>
                <CustomText style={{ fontSize: 14, fontFamily: 'Poppins-Bold' }} numberOfLines={1} ellipsizeMode="tail">{title}</CustomText>
                <CustomText style={{ fontSize: 12, color: '#646464' }} numberOfLines={2} ellipsizeMode="tail">{description}</CustomText>
            </View>
            <View style={{ position: 'absolute', top: 23, right: 10 }}>
                <CustomText style={{ fontSize: 10, color: '#646464' }}>{date}</CustomText>
            </View>
        </View>
    );
}

export default AnnoucementCard;