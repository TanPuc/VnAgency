import * as React from 'react';
import { Component, useEffect, useState, setState } from 'react';
import MapView from 'react-native-maps';
import { SafeAreaView, StyleSheet, View, Dimensions, StatusBar, Text, TouchableWithoutFeedback} from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import * as Location from "expo-location"
import {GOOGLE_API_KEY} from "../../environments";
import Constants from 'expo-constants';
import { BottomPopup } from '../assets/BottomPopup';
// import mapStyle from "../../assets/mapStyle.json";

const popupList = [
  {
    id: 1,
    name: 'Task'
  },
  {
    id: 2,
    name: 'Message'
  }
]

function MapScreen ({navigation}){
  const {width, height} = Dimensions.get("window");

  const AspectRatio = width / height;
  const LatitudeDelta = 0.0122;
  const LongitudeDelta = LatitudeDelta * AspectRatio;
  const [Region,setRegion] = useState({
    latitude : 0,
    longitude : 0,
    latitudeDelta : 0,
    longitudeDelta : 0,
  })
  // const mapRef = useRef(second)

  //Getting user location
  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission not granted",
          "Allow the app to use location service.",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
      let location = await Location.getCurrentPositionAsync();
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LatitudeDelta,
        longitudeDelta: LongitudeDelta,
      })
      // console.log(Region.latitudeDelta);
    })();
  }, []);

  //checking current location
  function Check(){
    console.log(Region.latitude, Region.longitude)
  }

  let popupRef = React.createRef()

  const onShowPopup = () => {
    popupRef.show()
  }

  const onClosePopup = () => {
    popupRef.close()
  }

  if(Region.latitude != 0 && Region.longitude != 0)return (

    <View style={styles.container}>

      <MapView
        style={styles.map}
        provider={'google'}
        initialRegion={Region}
        showsMyLocationButton={true}
        showsUserLocation={true}
      >
      </MapView>

      {/* Search bar */}
      <View style = {styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          fetchDetails={true}
          GooglePlacesDetailsQuery={{
            rankby:'distance'
          }}
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: {GOOGLE_API_KEY},
            language: 'en',
            components: "country:vn",
          }}
        />
      </View>

      {/* <SafeAreaView> */}
        <TouchableWithoutFeedback 
          style = {styles.PopupBox}
        onPress={onShowPopup}>
            <Text>Show Popup</Text>
        </TouchableWithoutFeedback>
        <BottomPopup
          title = "Demo Popup"
          ref = {(target) => popupRef = target}
          onTouchOutside = {onClosePopup}
          data={popupList}
        />
      {/* </SafeAreaView> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: 'absolute',
    width:'90%',
    backgroundColor:'white',
    padding:2,
    borderRadius:8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1
  },
  PopupBox: {
    borderRadius: 10,
    backgroundColor: "#000"
  }
});

export default MapScreen;