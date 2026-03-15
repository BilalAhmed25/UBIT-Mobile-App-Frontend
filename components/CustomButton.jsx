import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ text, icon, style }) => {

    return (
        <TouchableOpacity
            onPress={() => { }}
            style={{
                backgroundColor: '#800000',
                paddingVertical: 14,
                paddingHorizontal: 18,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }}
        >
            <Text
                style={{
                    color: '#fff',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 14,
                    marginRight: 8,
                    marginTop: 3,
                }}
            >
                {text}
            </Text>
            <MaterialIcons name={icon} color='#fff' size={14} />
        </TouchableOpacity >
    );
}

export default CustomButton;