import { Button, StyleSheet, Text, View, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

export default function QRScan({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const askForCameraPermisson = () => {
    (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == 'granted');
    }) ()
  }

  useEffect(() => {
    setScanned(false);
    askForCameraPermisson();
  }, []);

  const isFocused = useIsFocused();

  const handleBarCodeScanned = ({ data }) => {
    Linking.openURL(data);
  }

  if(hasPermission === null) {
    return (
        <View style={styles.container}>
            <Text>Yêu cầu quyền truy cập máy ảnh</Text>
        </View>
    );
  }

  if(hasPermission === false) {
    return (
        <View style={styles.container}>
            <Text style={{margin: 10, fontSize: 16}}>Chưa cấp quyền truy cập máy ảnh</Text>
            <Button title={'Cho phép sử dụng máy ảnh'} onPress={() => askForCameraPermisson()}></Button>
        </View>
    );
  }

  if(isFocused) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hướng khung camera vào {"\n"} mã QR để quét</Text>
        <BarCodeScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.cameraView}
        >
        </BarCodeScanner>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraView: {
      height: Dimensions.get('screen').height / 2, 
      width: Dimensions.get('screen').width - 32,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 25,
      marginHorizontal: 5,
      marginTop: '7%',
    },
    title: {
      marginTop: "10%",
      fontFamily: 'SourceSansPro_Bold',
      fontSize: 18,
      textAlign: 'center',
    },
})