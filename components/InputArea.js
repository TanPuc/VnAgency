import React from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const InputArea = ({
    iconName,
    password,
    error,
    onFocus = () => {},
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password);
    return (
        <View style={{marginBottom: 12}}>
            <View style={[styles.inputContainer, {borderColor: error ? 'red' : isFocused ? '#618d97' : 'white'}]}>
                <Icon name={iconName} style={{
                    fontSize: 27, 
                    color: '#ff757c', 
                    marginLeft: '2%',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start', 
                    marginRight: '-3%'}} 
                />
                <TextInput 
                    width={230}
                    flexWrap={'wrap'}
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    style={{
                        flex: 1,
                    }}
                    {...props}
                />
                {password && (
                    <Icon name= {hidePassword ? "eye-outline" : "eye-off-outline"} onPress={() => setHidePassword(!hidePassword)} style={{
                        position: 'absolute',
                        right: 15,
                        fontSize: 27,
                        color: '#ff757c',
                    }} />
                )}
            </View>
            {error && (
                <View style={{
                    height: 29,
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    paddingVertical: 3,
                }}>
                    <Icon name="alert-circle" style={{
                        fontSize: 21, 
                        color: '#ff757c', 
                        marginLeft: '3%', 
                        marginRight: '-7%',
                        marginTop: '1%',
                    }} 
                    ></Icon>
                    <Text style={{
                        color: 'red',
                        fontSize: 12,
                        marginTop: 7,
                        marginLeft: 30,
                    }}>{error}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        height: 55,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 60,
        alignItems: 'center',
    },
})

export default InputArea;