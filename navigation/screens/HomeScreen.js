import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';


export default function HomeScreen({ navigation }) {
    return (
        <View>
            <View style = {styles.navbar}>
            <ImageBackground source={require('../../assets/VnAgency.png')} style = {styles.navBarBG}>
                <View style = {styles.searchBox}>
                    <Text>
                        Search
                    </Text>
                </View>
                <Image source={require('../../assets/User-avatar.png')} style = {styles.avatar}></Image>
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
        width: '100%',
        height: '100%',
    },
    avatar:{
        flex: 0.3,
        marginRight: '5%',
        height: 30,
        width: 30,
        borderRadius: 6,
        // borderColor: 'black',
        // borderWidth: 1,
        backgroundColor: 'white'
    },
    searchBox:{
        marginLeft: '15%',
        marginRight: '5%',
        flex: 3,
        alignItems: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 15
    }
})

