import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";

const DashboardHeader = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                <Image source={{ uri: 'https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg' }} style={{ width: 42, height: 42, borderRadius: 22, borderColor: '#ffffff', borderWidth: 2 }} />
                <View>
                    <CustomText style={{ fontSize: 14, color: '#646464', lineHeight: 16, paddingTop: 8 }} >
                        WELCOME BACK
                    </CustomText>
                    <CustomText style={{ fontSize: 18 }} >Good Evening, Bilal</CustomText>
                </View>
            </View>
            <TouchableOpacity onPress={() => { }}>
                <MaterialIcons name="notifications-none" size={26} color="#000000" style={{ borderColor: '#000000', borderWidth: 1, borderRadius: 25, padding: 5 }} />
            </TouchableOpacity>
        </View>
    );
}

export default DashboardHeader;