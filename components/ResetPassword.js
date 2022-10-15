import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputArea from './InputArea.js'
import { auth } from './Firebase.js'

export default function ResetPassword({ navigation }) {
  const [inputs, setInputs] = React.useState({email: ''});
  const [errors, setErrors] = React.useState({});
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if(user) navigation.replace('SignIn');
    })
    return unsubscribe;
  }, [])

  const validate = () => {
    Keyboard.dismiss();
    let vaild = true;
    if(!inputs.email) {
      handleError('Vui lòng nhập email', 'email');
      vaild = false;
    } else if(!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Định dạng email không chính xác', 'email');
      vaild = false;
    }

    if(vaild) {
      auth
        .sendPasswordResetEmail(inputs.email)
        .then(() => {
          alert('Email khôi phục đã được gửi. Vui lòng kiểm tra hòm thư của bạn.')
        })
        .catch(error => error.message);

      auth
        .signInWithEmailAndPassword("admin@vnagency.com", "dh210406")
        .then(() => {
          auth.signOut();
        })
        .catch(error => error.message);
    }
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({...prevState, [input]: errorMessage}));
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>Khôi phục tài khoản</Text>
          <Text style={styles.subtitle}>
          Vui lòng nhập email đã sử dụng để đăng ký tài khoản.{"\n"}
          Chúng tôi sẽ gửi email kèm link khôi phục tài khoản của bạn.
          </Text>
        </View>

        <View style={styles.inputArea}>
          <InputArea 
              iconName="email-outline" 
              placeholder="Địa chỉ Email" 
              style={styles.textInput} 
              error={errors.email}
              onFocus={() => {
              handleError(null, 'email');
              }}
              onChangeText={(text) => handleOnChange(text, 'email')}
          />
        </View>

        <View style={styles.BtnArea}>
        <TouchableOpacity activeOpacity={0.7} style={styles.BackBtn} onPress={() => {navigation.replace('SignIn')}}>
              <Text style={{
              fontFamily: 'SourceSansPro_Bold',
              fontSize: 18,
              color: 'black',
              }}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.ResetBtn} onPress={validate}>
              <Text style={{
              fontFamily: 'SourceSansPro_Bold',
              fontSize: 18,
              color: 'white',
              }}>Khôi phục</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    heading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center', 
      paddingHorizontal: '3%',
      paddingTop: '13%',
    },
    title: {
      fontFamily: 'SourceSansPro_Bold',
      fontSize: 30,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      fontFamily: 'SourceSansPro_Light',
      textAlign: 'justify',
      paddingVertical: '3%',
    },
    inputArea: {
      flex: 1,
      alignContent: 'center',
      paddingHorizontal: '6%',
      paddingTop: '2%',
    },
    textInput: {
      paddingHorizontal: '8%',
    },
    BtnArea: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      paddingHorizontal: '6%',
      paddingTop: '2%',
    },
    ResetBtn: {
      flex: 1,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ff757c',
      borderRadius: 50,
      marginTop: '1%',
      marginLeft: '2%',
    },
    BackBtn: {
      flex: 1,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 50,
      marginTop: '1%',
      marginRight: '2%',
    },
})