// import * as React from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// export default function MapScreen({ navigation }) {
//   const [region, setRegion] = React.useState({
//     latitude: 16.0545,
//     longitude: 108.1917
//   })
//   return (
//     <View style={{marginTop: 35, flex: 1}}>
//       <GooglePlacesAutocomplete
//       style={{
//         marginRight:'20%', flex: 1
//       }}
//       placeholder='Search'
//       fetchDetails={true}
//       GooglePlacesDetailsQuery={{
//         rankby:'distance'
//       }}
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//       }}
//       query={{
//         key: 'AIzaSyDW_fIDJ_p2zNNDaHBsQPx4RyTOIVIUyBE',
//         language: 'en',
//         components: "country:vn",
//         radius:50000,
//         location: '${region.latitude}, ${region.longitude}'
//       }}
//       styles={{
//         container:{flex: 0, position:'absolute', width:'100%', zIndex:1},
//         listView: {backgroundColor: 'white'}
//       }}
//       />
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 16.0545,
//           longitude: 108.1917,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.25,
//         }}
//         provider="google"
//       >
//           <Marker
//             coordinate={{latitude: 16.063628, longitude: 108.161319}}
//             title = 'home'
//           >
//             {/* <Image source={require('../../assets/marker.png')}/> */}
//           </Marker>
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });

import * as React from 'react';
import { Component, useEffect, useState, setState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from "expo-location"
// import mapStyle from "../../assets/mapStyle.json";

// import Geolocation from "react-native-geolocation-service";



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

      console.log(Region.latDelta);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LatitudeDelta,
        longitudeDelta: LongitudeDelta,
      })
    })();
  }, []);

  //checking current location
  function Check(){
    console.log(Region.latitude, Region.longitude)
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
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyDW_fIDJ_p2zNNDaHBsQPx4RyTOIVIUyBE',
            language: 'en',
            components: "country:vn",
            // radius:50000,
            // location: '${Region.latitude}, ${Region.longitude}'
          }}
        />

      </View>

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

