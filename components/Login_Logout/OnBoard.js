import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, StatusBar, Text, TouchableOpacity } from 'react-native';
import { auth } from '../assets/Firebase.js';

const OnBoard = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) navigation.navigate('SignIn');
        })
        return unsubscribe;
    }, [])
    return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/onboardImage.jpg')}>
        <View style={style.details}>
          <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold'}}>
            Khám phá
          </Text>
          <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold'}}>
            cùng chúng tôi
          </Text>
          <Text style={{color: 'white', lineHeight: 25, marginTop: 15}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut
            sem non erat vehicula dignissim. Morbi eget congue ante, feugiat.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('SignIn')}>
            <View style={style.btn}>
              <Text style={{fontWeight: 'bold'}}>Bắt đầu</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  details: {
    height: '50%',
    bottom: 0,
    position: 'absolute',
    paddingHorizontal: 40,
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoard;