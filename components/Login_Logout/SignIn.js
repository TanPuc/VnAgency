import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Keyboard } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InputArea from '../assets/InputArea.js'
import { auth } from '../assets/Firebase.js'

export default function SignIn({ navigation }) {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if(user) navigation.replace('MainScreen');
    })
    return unsubscribe;
  }, [])

  const [errors, setErrors] = React.useState({})
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

    if(!inputs.password) {
      handleError('Vui lòng nhập mật khẩu', 'password');
      vaild = false;
    } else if(inputs.password.length < 5) {
      handleError('Mật khẩu phải có tối thiểu 6 kí tự', 'password');
      vaild = false;
    }

    if(vaild) {
        auth
        .signInWithEmailAndPassword(inputs.email, inputs.password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with: ", user.email);
        })
        .catch(error => alert(error.message))
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
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.subtitle}>Chào mừng trở lại!</Text>
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
        <InputArea 
            iconName="lock-outline" 
            placeholder="Mật khẩu" 
            style={styles.textInput} 
            error={errors.password}
            onFocus={() => {
            handleError(null, 'password');
            }}
            onChangeText={(text) => handleOnChange(text, 'password')}
            password
        />
        <TouchableOpacity activeOpacity={0.7} style={styles.forgotPassBtn} onPress={() => navigation.replace('ResetPassword')}>
            <Text style={{
            fontFamily: 'SourceSansPro_Bold',
            fontSize: 15,
            color: 'gray',
            textAlign: 'center',
            }}>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.signInBtn} onPress={validate}>
            <Text style={{
            fontFamily: 'SourceSansPro_Bold',
            fontSize: 18,
            color: 'white',
            }}>Đăng nhập</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.connect}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'grey', marginLeft: '10%'}} />
            <View>
            <Text style={{width: 150, textAlign: 'center', fontFamily: 'SourceSansPro_Light', fontSize: 17, color: 'grey'}}>Hoặc tiếp tục với</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'grey', marginRight: '10%'}} />
        </View>
        <TouchableOpacity style={styles.withFacebook}>
            <Icon name="facebook" style={{
            fontSize: 37,
            color: 'white',
            marginLeft: '2%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            position: 'absolute',
            left: 15,
            }}></Icon>
            <Text style={{
            color: 'white',
            fontFamily: 'SourceSansPro_Bold',
            fontSize: 15,
            alignSelf: 'center',
            }}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.withGoogle}>
            <Image source={require('../../assets/google.png')} style={{
            position: 'absolute',
            left: 15,
            width: 45,
            height: 45,
            }}></Image>
            <Text style={{
            color: 'black',
            fontFamily: 'SourceSansPro_Bold',
            fontSize: 15,
            alignSelf: 'center',
            }}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: '5%', marginBottom: '10%'}}>
            <Text style={{
            fontFamily: 'SourceSansPro_Regular',
            fontSize: 16,
            }} onPress={() => navigation.replace('SignUp')}>Chưa tạo tài khoản? <Text style={{fontSize: 16, color: '#ff757c', fontFamily: 'SourceSansPro_Bold'}}>Đăng ký</Text></Text>
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
      fontSize: 45,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 20,
      fontFamily: 'SourceSansPro_ExtraLight',
      textAlign: 'center',
      paddingHorizontal: '15%',
      paddingVertical: '3%',
    },
    inputArea: {
      flex: 1,
      alignContent: 'center',
      paddingHorizontal: '6%',
      paddingTop: '6%',
    },
    textInput: {
      paddingHorizontal: '8%',
    },
    forgotPassBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: '1%',
        paddingHorizontal: '3%',
    },
    signInBtn: {
      flex: 1,
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ff757c',
      borderRadius: 50,
      marginTop: '2%',
    },
    connect: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: '6%',
      paddingTop: '6%',
    },
    withFacebook: {
      flex: 1,
      height: 57,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
      backgroundColor: '#7880c4',
      borderRadius: 50,
      marginTop: '3%',
    },
    withGoogle: {
      flex: 1,
      height: 57,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 50,
      marginTop: '3%',
    },
})