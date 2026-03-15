import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';

const FloatingInput = ({ label, value, onChangeText, error, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    // Animation value: 0 is placeholder (bottom), 1 is label (top)
    const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // Trigger animation when focus changes or text exists
    React.useEffect(() => {
        Animated.timing(animatedIsFocused, {
            toValue: (isFocused || value) ? 1 : 0,
            duration: 200,
            useNativeDriver: false, // Layout properties don't support native driver
        }).start();
    }, [isFocused, value]);

    // Interpolate top position and font size
    const labelStyle = {
        top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 25], // Moves from center to top
        }),
        fontSize: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12], // Shrinks when floating
        }),
        color: error ? '#ff1744' : (isFocused ? '#800000' : '#868686'),
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.label, labelStyle]}>
                {label}
            </Animated.Text>
            <TextInput
                {...props}
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    error && styles.inputError
                ]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={onChangeText}
                value={value}
                blurOnSubmit
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 18,
        width: '100%',
    },
    label: {
        position: 'absolute',
        left: 12,
        paddingHorizontal: 4,
        zIndex: 1,
        fontFamily: 'Poppins-Regular',
    },
    input: {
        height: 70,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#000',
    },
    inputFocused: {
        borderColor: '#800000',
        borderWidth: 1,
        paddingTop: 25, // Extra padding to accommodate floating label
    },
    inputError: {
        borderColor: '#ff1744',
    },
    errorText: {
        color: '#ff1744',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 12,
    },
});

export default FloatingInput;