import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function MapScreen({ navigation }) {
  const [region, setRegion] = React.useState({
    latitude: 16.0545,
    longitude: 108.1917
  })
  return (
    <View style={{marginTop: 35, flex: 1}}>
      <GooglePlacesAutocomplete
      style={{
        marginRight:'20%', flex: 1
      }}
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
        radius:50000,
        location: '${region.latitude}, ${region.longitude}'
      }}
      styles={{
        container:{flex: 0, position:'absolute', width:'100%', zIndex:1},
        listView: {backgroundColor: 'white'}
      }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 16.0545,
          longitude: 108.1917,
          latitudeDelta: 0.05,
          longitudeDelta: 0.25,
        }}
        provider="google"
      >
          <Marker
            coordinate={{latitude: 16.063628, longitude: 108.161319}}
            title = 'home'
          >
            {/* <Image source={require('../../assets/marker.png')}/> */}
          </Marker>
      </MapView>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});