import * as React from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { auth } from '../assets/Firebase.js';

export default function HomeScreen({ navigation }) {
    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace('SignIn');
            console.log("Logged out");
        })
        .catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Button title="Test" onClicked={() => navigation.navigate(FlightTickets)}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

