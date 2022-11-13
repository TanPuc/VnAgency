import * as React from 'react';
import * as Location from "expo-location"
import { Component, useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Image, SafeAreaView, StyleSheet, View, Dimensions, StatusBar, Text, TouchableWithoutFeedback} from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { BottomPopup } from '../assets/BottomPopup';
import Constants from 'expo-constants';
import MapViewDirections from 'react-native-maps-directions';
import MARKERS from './config/MARKERS';
import mapStyle from '../assets/mapStyle.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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

function toRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
function haversine_distance(Origin, Destination) {
  [lat1, lon1] = [Origin.latitude, Origin.longitude];
  [lat2, lon2] = [Destination.latitude, Destination.longitude];
  radius = 6371;
  dlat = toRadians(lat2 - lat1);
  dlon = toRadians(lon2 - lon1);
  a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dlon / 2) * Math.sin(dlon / 2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  d = radius * c;

  return d;
}

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
  let popupRef = React.createRef()
  const onShowPopup = () => {
    popupRef.show()
  }
  const onClosePopup = () => {
    popupRef.close()
  }

  //Adding direction
  console.log(Origin, Destination);
  // if(Origin.latitude != null && Destination.latitude != 0) {
  //   console.log(haversine_distance(Origin, Destination));
  // }
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
        customMapStyle={mapStyle}
      >
        {(Origin.latitude != null && Destination.latitude != 0 &&
          <View>
            <MapView.Marker coordinate={Origin} />
            <MapView.Marker coordinate={Destination} />
          </View>
        )}
        {MARKERS.map((marker, index) => (
          <MapView.Marker key={index} title={marker.title} coordinate={marker.location} />
        ))}
        <MapViewDirections
          origin={Origin}
          destination={Destination}
          apikey='AIzaSyDSCrCGcVxNCMbR-XpTHzhSgmV3uswB00E'
          strokeWidth={4}
          strokeColor="#00b0ff"
        ></MapViewDirections>
      </MapView>

      {/* Search bar */}
      <SafeAreaView style = {styles.searchContainer}> 
        <GooglePlacesAutocomplete
          placeholder='Tìm kiếm'
          fetchDetails={true}
          GooglePlacesDetailsQuery={{rankby:'distance'}}
          onPress={(data, details = null) => {
            console.log(details.geometry.location);
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
        }}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
          query={{
            key: 'AIzaSyDSCrCGcVxNCMbR-XpTHzhSgmV3uswB00E',
            language: 'en',
            components: "country:vn",
          }}
        />
      </SafeAreaView>
      
      <SafeAreaView style = {styles.PopupBox}>
        <TouchableWithoutFeedback onPress={onShowPopup}>
            <Text style={{
              alignSelf: 'flex-start',
              paddingLeft:'8%',
              fontSize: 15,
              fontStyle:'Bold',
              color: '#c5c5c7',
            }}>Lộ trình <MaterialCommunityIcons name="map-marker-path" size={18}/> </Text>

            
        </TouchableWithoutFeedback>
        <BottomPopup
          title = "Lộ trình du lịch"
          image = "require('../../assets/path.png')"
          ref = {(target) => popupRef = target}
          onTouchOutside = {onClosePopup}
          data={popupList}
        />
      </SafeAreaView>
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
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1
  },
  PopupBox: {
    position:'absolute',
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    bottom:'81  %',
    marginLeft:'5%',
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    
  }
});

export default MapScreen;