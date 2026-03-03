import { Text } from 'react-native';

const CustomText = ({ style, children, ...props }) => {
    return (
        <Text
            style={[{ fontFamily: 'Poppins-Regular', fontSize: 16, color: '#000000' }, style]}
            {...props}
        >
            {children}
        </Text >
    );
}

export default CustomText;