import * as React from 'react';
import { Component, useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { SafeAreaView, StyleSheet, View, Dimensions, StatusBar, Text, TouchableWithoutFeedback} from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import * as Location from "expo-location"
import Constants from 'expo-constants';
import { BottomPopup } from '../assets/BottomPopup';
import MapViewDirections from 'react-native-maps-directions';

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


const MapScreen = ({ navigation }) => {
  const {width, height} = Dimensions.get("window");
  const AspectRatio = width / height;
  const LatitudeDelta = 0.0122;
  const LongitudeDelta = LatitudeDelta * AspectRatio;
  const [Region,setRegion] = useState({
    latitude : null,
    longitude : null,
    latitudeDelta : null,
    longitudeDelta : null,
  })
  const [Origin, setOrigin] = useState({
    latitude: Region.latitude,
    longitude: Region.longitude,
  })
  const [Destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  })
  
  useEffect(() => {
    //Getting user location
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
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    })();
  }, []);

  //PopUp page
  // let popupRef = React.createRef()
  // const onShowPopup = () => {
  //   popupRef.show()
  // }
  // const onClosePopup = () => {
  //   popupRef.close()
  // }

  //Adding direction
  console.log(Origin, Destination);
  
  if(Region.latitude != null && Region.longitude != null)
  return (  
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={'google'}
        initialRegion={Region}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsBuildings={true}
        loadingEnabled={true}
      >
        <MapViewDirections
          origin={Origin}
          destination={Destination}
          apikey="AIzaSyDLrAg2LBoIvdFVMSecuZ7a6aoM7bAFJtI"
          strokeWidth={3}
          strokeColor="red"
        ></MapViewDirections>
      </MapView>

      {/* Search bar */}
      <SafeAreaView style = {styles.searchContainer}> 
        <GooglePlacesAutocomplete
          placeholder='Tìm kiếm'
          fetchDetails={true}
          // GooglePlacesDetailsQuery={{rankby:'distance'}}
          onPress={(data, details = null) => {
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
        }}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
          query={{
            key: 'AIzaSyDLrAg2LBoIvdFVMSecuZ7a6aoM7bAFJtI',
            language: 'en',
            components: "country:vn",
          }}
        />
      </SafeAreaView>
      
      {/* <SafeAreaView style = {styles.PopupBox}>
        <TouchableWithoutFeedback 
          
        onPress={onShowPopup}>
            <Text>Show Popup</Text>
        </TouchableWithoutFeedback>
        <BottomPopup
          title = "Demo Popup"
          ref = {(target) => popupRef = target}
          onTouchOutside = {onClosePopup}
          data={popupList}
        />
      </SafeAreaView> */}
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
    flex: 1,
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
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    bottom: '16%',
    marginRight: '2%',
    borderRadius: 30,
    backgroundColor: "#000"
  }
});

export default MapScreen;

