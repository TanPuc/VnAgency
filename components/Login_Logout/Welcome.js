import { StyleSheet, View, Text, Image, StatusBar } from 'react-native'
import React from 'react'

export default function Welcome({ navigation }) {
    setTimeout(() => {navigation.replace('OnBoard');}, 1300);
    return (
        <View style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {true} translucent = {true}/>
            <Image source={require('../../assets/travel.png')} style={styles.icon} />
            <Text style={styles.hello1}>Vn<Text style={styles.hello2}>Agency</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 170,
        height: 170,
        marginBottom: 10,
    },
    hello1: {
        fontSize: 40,
        color: '#fb757a',
        fontFamily: 'museo700',
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    hello2: {
        fontSize: 40,
        color: '#31c4b8',
        fontFamily: 'museo700',
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    button: {
        marginTop: 36,
        justifyContent: 'flex-end',
        padding: 12,
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        borderColor: '#ff757c',
        borderWidth: 2,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 20,
        color: '#ff757c',
        fontWeight: 'bold',
        fontFamily: 'museo500',
    },
});