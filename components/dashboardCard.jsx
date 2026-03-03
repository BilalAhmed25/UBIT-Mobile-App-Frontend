import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import CustomText from "./CustomText";

const DashboardCard = ({ title, description, iconName, iconColor, onPress, style }) => {
    return (
        <View style={[{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 22, alignItems: 'center', ...style }]}>
            <MaterialIcons name={iconName} size={40} color={iconColor + "10"} style={{ position: 'absolute', top: 5, right: 5 }} />
            <MaterialIcons name={iconName} size={40} color={iconColor} style={{ marginBottom: 12, backgroundColor: iconColor + '20', padding: 12, borderRadius: 12 }} />
            <CustomText style={{ fontSize: 16, fontFamily: 'Poppins-Bold' }}>{title}</CustomText>
            <CustomText style={{ fontSize: 12, color: '#646464', textAlign: 'center' }}>{description}</CustomText>
        </View>
    );
}

export default DashboardCard;