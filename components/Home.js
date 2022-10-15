import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from './Firebase'

export default function Home({ navigation }) {
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
      <Text>Home</Text>
      <TouchableOpacity style={styles.logOut} onPress={handleSignOut}>
        <Text style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'SourceSansPro_Bold',
        }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logOut: {
        height: 55,
        backgroundColor: 'black',
        justifyContent: 'center',
    }
})