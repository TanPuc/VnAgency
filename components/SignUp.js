import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputArea from './InputArea.js'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SignUp({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{
          fontSize: 45,
          fontFamily: 'SourceSansPro_Bold',
          textAlign: 'center',
        }}>Đăng ký</Text>
        <Text></Text>
        <View style={{
          paddingHorizontal: '17%',
        }}>
          <Text style={{
            fontSize: 19,
            fontFamily: 'SourceSansPro_ExtraLight',
            textAlign: 'center',
          }}>Chúng tôi cần thông tin về bạn để tạo tài khoản</Text>
        </View>
        <View style={{
          marginVertical: 20, 
          marginHorizontal: 20,
        }}>
          <InputArea iconName="account-outline" placeholder="Họ và tên" style={styles.InputArea} error="Tên không hợp lệ" />
          <InputArea iconName="email-outline" placeholder="Địa chỉ Email" style={styles.InputArea} error="Tên không hợp lệ" />
          <InputArea iconName="lock-outline" placeholder="Mật khẩu" style={styles.InputArea} password error="Tên không hợp lệ"/>
          <TouchableOpacity style={styles.RegisterButton}>
            <Text style={styles.RegisterTitle}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: '8%',
        paddingTop: '0%',
      }}>
        <Text style={{
          fontFamily: 'SourceSansPro_Light',
          fontSize: 16,
        }}>{"\n"}--------  Hoặc tiếp tục với  --------{"\n"}</Text>
        <TouchableOpacity style={{
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          backgroundColor: '#7880c4',
          borderRadius: 60,
          marginBottom: '5%',
        }}>
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
            alignItems: 'center',
            alignSelf: 'center',
          }}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 60,
        }}>
          <Icon name="google" style={{
            fontSize: 37,
            marginLeft: '2%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            position: 'absolute',
            left: 15,
          }}></Icon>
          <Text style={{
            color: 'black',
            fontFamily: 'SourceSansPro_Bold',
            fontSize: 15,
            alignItems: 'center',
            alignSelf: 'center',
          }}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{
            fontFamily: 'SourceSansPro_Regular',
            fontSize: 16,
          }}>{"\n\n"}Đã có tài khoản? <Text style={{fontSize: 16, color: '#ff757c', fontFamily: 'SourceSansPro_Regular'}}>Đăng nhập</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: '6%',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      paddingHorizontal: '3%',
    },
    InputArea: {
      paddingLeft: '10%',
      marginVertical: '6%',
    },
    RegisterButton: {
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#ff757c',
      borderRadius: 60,
    },
    RegisterTitle: {
      fontFamily: 'SourceSansPro_Bold',
      fontSize: 18,
      color: 'white',
    },
})