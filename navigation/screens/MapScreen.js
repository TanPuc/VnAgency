import * as React from 'react';
import { Component, useEffect, useState, setState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from "expo-location"
import mapStyle from "../../assets/mapStyle.json";

// import Geolocation from "react-native-geolocation-service";

const {width, height} = Dimensions.get("window");

const AspectRatio = width / height;
const LatitudeDelta = 1;
const LongitudeDelta = LatitudeDelta * AspectRatio;

function MapScreen ({navigation}){
  const [Region,setRegion] = useState({
    latitude : 0,
    longitude : 0,
    latDelta : LatitudeDelta,
    lngDelta : LongitudeDelta,
  })

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

      // console.log(Region.latitude);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    })();
  }, []);

  //checking current location
  function Check(){
    console.log(Region.latitude, Region.longitude)
  }

  return (
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
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
        style={{textInput: styles.input}}
          placeholder='Search'
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyDW_fIDJ_p2zNNDaHBsQPx4RyTOIVIUyBE',
            language: 'en',
    }}/></View>

    {/* <Button title='press me' onPress={Check()}></Button> */}

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
    top:40
  },
  input: {
    borderColor: "#888",
    borderWidth: 1
  }
});

export default MapScreen;
