import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function GetStarted({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate("GetStarted")}>
                <Text style={styles.buttonText}>BẮT ĐẦU</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '75%',
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