import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AvatarBox from  '../AvatarBox'


export default function HomeScreen({ navigation }) {
    return (
        <><View style={styles.navbar}>
            <AvatarBox />
        </View><View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    onPress={() => alert('This is the "Home" screen.')}
                    style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>
            </View></>
    );
}

const styles = StyleSheet.create({
    navbar:{
        width: '100%',
        height: '5%',
        // borderColor: 'black',
        // borderWidth: 1
    }
})