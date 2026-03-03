import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ color, fontSize, text, icon, style }) => {

    return (
        <TouchableOpacity
            onPress={() => { }}
            style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }}
        >
            <Text
                style={{
                    color: color || '#000000',
                    fontFamily: 'Poppins-Regular',
                    fontSize: fontSize || 14,
                    fontWeight: '600',
                    marginRight: 8,
                    marginTop: 3,
                }}
            >
                {text}
            </Text>
            <MaterialIcons name={icon} color={color || '#000000'} size={14} />
        </TouchableOpacity >
    );
}

export default CustomButton;