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
        <View>
            <View style = {styles.navbar}>
            <ImageBackground source={require('../../assets/VnAgency.png')} style = {styles.navBarBG}>
                <View style = {styles.searchBox}>
                    <Text>Search</Text>
                </View>
                <Icon name='account-box-outline' styles={{
                    fontSize: 37,
                    color: 'white',
                    marginLeft: '2%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    left: 15,
                }} onPress={handleSignOut}
                />
            </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar:{
        width: '100%',
        height: '52%',
        // borderColor: 'black',
        // borderWidth: 1
    },
    navBarBG:{
        paddingTop: '11%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    avatar:{
        fontSize: 37,
        flex: 0.3,
        marginRight: '5%',
        height: 30,
        width: 30,
        borderRadius: 6,
        backgroundColor: 'white'
    },
    searchBox:{
        marginLeft: '15%',
        marginRight: '10%',
        flex: 3,
        alignItems: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 15
    }
})

