import * as React from 'react';
import * as Location from "expo-location";
import { Component, useEffect, useState} from 'react';
import MapView, {Circle, Marker} from 'react-native-maps';
import { Pressable, Modal, FlatList, Image, SafeAreaView, StyleSheet, View, Dimensions, StatusBar, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { BottomPopup } from '../assets/BottomPopup';
import Constants from 'expo-constants';
import MapViewDirections from 'react-native-maps-directions';
import MARKERS from './config/MARKERS';
import mapStyle from '../assets/mapStyle.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import COLORS from './config/COLORS';

import RESTS from './config/data/RESTAURANTS';
import CAFE from './config/data/CAFE';
import EVENTS from './config/data/EVENTS';
import HOTELS from './config/data/HOTELS';
import { Button } from "react-native-web";

//Khai báo tổng
const placeData = [
  {
    id: 1,
    place: 'Quán cafe',
    selected: false,
  },
  {
    id: 2,
    place: 'Quán ăn',
    selected: false,
  },
  {
    id: 3,
    place: 'Khách sạn',
    selected: false,
  },
  {
    id: 4,
    place: 'Sự kiện',
    selected: false,
  },
]
//Khai báo tổng

// Function các thứ

// Haversine function
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


// Knapsack DP to find path
function max(a, b) {
  return (a > b ? a : b);
}

function knapsack(W) {
  const n = Object.keys(MARKERS).length - 1;
  var dp = new Array(n + 1), val = new Array(n + 1), wt = new Array(n + 1);
  for(var i=0;i<=n;i++) dp[i] = new Array(n + 1);

  for(var i=1;i<=n;i++) {
      wt[i] = MARKERS[i].id * 10000 - MARKERS[i].rate * 10000;
      val[i] = MARKERS[i].id * 75000 - 378;
  }

  for(var i=0;i<=n;i++) {
      for(var w=0;w<=W;w++){
          if(i == 0 || w == 0) dp[i][w] = 0;
          else if(wt[i - 1] <= w) {
              dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
          }
          else dp[i][w] = dp[i-1][w];
      }
  }

  var w = W, res = dp[n][W];
  var trace = new Array(0);
  for(var i=n;i>0 && res>0;i--) {
      if(res == dp[i-1][w]) continue;
      else {
          trace.push(MARKERS[i-1].title);
          res = res - val[i - 1];
          w = w - wt[i - 1];
      }
  }

  trace.reverse();

  console.log(trace);
}

const MapScreen = ({ navigation }) => {
  const {width, height} = Dimensions.get("window");
  const AspectRatio = width / height;
  const LatitudeDelta = 0.0122;
  const LongitudeDelta = LatitudeDelta * AspectRatio;
  const [Region, setRegion] = useState({
    latitude : null,
    longitude : null,
    latitudeDelta : null,
    longitudeDelta : null,
  })
  const [Origin, setOrigin] = useState({
    // latitude: Region.latitude,
    // longitude: Region.longitude,
    latitude: 16.022690,
    longitude: 108.209150,
  })
  const [Destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
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
  
  // Choose category to show on maps
  const [placeDataSelected, setPlaceDataSelected] = useState([
    {id: 1, value: 0},
    {id: 2, value: 0},
    {id: 3, value: 0},
    {id: 4, value: 0},
  ]);

  const updateFieldChanged = (index) => {
    let newArr = [...placeDataSelected];
    newArr[index].value = 1 - newArr[index].value;
    setPlaceDataSelected(newArr);
  }

  var rest_markers = [], cafe_markers = [], hotels_markers = [], events_markers = [];

  // Generate RESTAURANTS in particular area
  const showRestaurants = () => {
    rest_markers.length = 0;
    for(var item of RESTS) {
      if(item.location != null && haversine_distance(Origin, {latitude: item.location.lat, longitude: item.location.lng}) <= 0.5) {
        rest_markers.push({
          title: item.title,
          address: item.address,
          price: item.price,
          phone: item.phone,
          url: item.url,
          reviewsDistribution: {
            oneStar: item.reviewsDistribution.oneStar,
            twoStar: item.reviewsDistribution.twoStar,
            threeStar: item.reviewsDistribution.threeStar,
            fourStar: item.reviewsDistribution.fourStar,
            fiveStar: item.reviewsDistribution.fiveStar,
          },
          location: {
            latitude: item.location.lat,
            longitude: item.location.lng,
          },
        })
      }
    }
    return 1;
  }

  // Generate CAFE in particular area
  const showCafe = () => {
    cafe_markers.length = 0;
    for(var item of CAFE) {
      if(item.location != null && haversine_distance(Origin, {latitude: item.location.lat, longitude: item.location.lng}) <= 0.5) {
        cafe_markers.push({
          title: item.title,
          address: item.address,
          price: item.price,
          phone: item.phone,
          url: item.url,
          reviewsDistribution: {
            oneStar: item.reviewsDistribution.oneStar,
            twoStar: item.reviewsDistribution.twoStar,
            threeStar: item.reviewsDistribution.threeStar,
            fourStar: item.reviewsDistribution.fourStar,
            fiveStar: item.reviewsDistribution.fiveStar,
          },
          location: {
            latitude: item.location.lat,
            longitude: item.location.lng,
          },
        })
      }
    }
    return 1;
  }

  // Generate HOTELS in particular area
  const showHotels = () => {
    hotels_markers.length = 0;
    for(var item of HOTELS) {
      if(item.location != null && haversine_distance(Origin, {latitude: item.location.lat, longitude: item.location.lng}) <= 0.5) {
        hotels_markers.push({
          title: item.title,
          address: item.address,
          price: item.price,
          phone: item.phone,
          url: item.url,
          reviewsDistribution: {
            oneStar: item.reviewsDistribution.oneStar,
            twoStar: item.reviewsDistribution.twoStar,
            threeStar: item.reviewsDistribution.threeStar,
            fourStar: item.reviewsDistribution.fourStar,
            fiveStar: item.reviewsDistribution.fiveStar,
          },
          location: {
            latitude: item.location.lat,
            longitude: item.location.lng,
          },
        })
      }
    }
    return 1;
  }

  // Generate EVENTS in particular area
  const showEvents = () => {
    events_markers.length = 0;
    for(var item of EVENTS) {
      if(item.location != null) {
        events_markers.push({
          title: item.title,
          image: item.image,
          start_date: item.start_date,
          end_date: item.end_date,
          address: item.address,
          location: {
            latitude: item.location.latitude,
            longitude: item.location.longitude,
          },
        })
      }
    }
    return 1;
  }

  // Open Bottom Popup
  const [btmUp, setBtmUp] = useState(false);
  const [limitPrice, onChangeLimitPrice] = useState(0);

  if(Region.latitude != null && Region.longitude != null)
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={btmUp}
        onRequestClose={() => {
          setModalVisible(!btmUp);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeLimitPrice}
              value={limitPrice}
              placeholder="Giá tiền định mức"
              keyboardType="numeric"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                knapsack(limitPrice);
                setBtmUp(!btmUp);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
        {((Origin.latitude != null && Origin.longitude != null) ? 
          <MapView.Circle center={Origin} radius={500} strokeWidth={3} strokeColor={'rgba(0, 0, 0, 1)'} fillColor={'rgba(0, 0, 255, 0.2)'}/>
        : null)}

        {((placeDataSelected[0].value == 1 && showCafe()) ?
          <View>
            {cafe_markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker}
                icon={require('../../assets/markers/coffee.png')}
                >
                </Marker>
            ))}
          </View>
        : null)}

        {((placeDataSelected[1].value == 1 && showRestaurants()) ?
          <View>
            {rest_markers.map((marker, index) => (
              <MapView.Marker key={index} coordinate={marker} icon={require('../../assets/markers/restaurant.png')}/>
            ))}
          </View>
        : null)}

        {((placeDataSelected[2].value == 1 && showHotels()) ?
          <View>
            {hotels_markers.map((marker, index) => (
              <MapView.Marker title={marker.title} key={index} coordinate={marker.location} icon={require('../../assets/markers/hotel.png')}/>
            ))}
          </View>
        : null)}

        {((placeDataSelected[3].value == 1 && showEvents()) ?
          <View>
            {events_markers.map((marker, index) => (
              <MapView.Marker title={marker.title} key={index} coordinate={marker.location} icon={require('../../assets/markers/event.png')} />
            ))}
          </View>
        : null)}
        
        <MapViewDirections
          origin={Origin}
          destination={Destination}
          apikey='AIzaSyBgXphv0S5eamMrNbQDU-I1aJ9O6Xo800s'
          strokeWidth={4}
          strokeColor="#00b0ff"
        ></MapViewDirections>
      </MapView>

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
            key: 'AIzaSyBgXphv0S5eamMrNbQDU-I1aJ9O6Xo800s',
            language: 'en',
            components: "country:vn",
          }}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.PlaceTypeList}>
          {placeData.map((placeData, index) => (
            <TouchableOpacity 
              onPress={() => updateFieldChanged(placeData.id - 1)}
              key={index}
              style ={[styles.TypeBox, !placeDataSelected[placeData.id - 1].value ? styles.ActiveBox : styles.InactiveBox]}
              >
              <Text>{placeData.place}</Text>
            </TouchableOpacity>
          ))}
      </SafeAreaView>

      <SafeAreaView style = {styles.PopupBox}>
        <TouchableOpacity onPress={() => setBtmUp(!btmUp)}>
            <Text style={{
              alignSelf: 'flex-start',
              paddingLeft:'8%',
              fontSize: 15,
              fontStyle:'Bold',
              color: '#888',
              fontWeight:'bold',
            }}>Lộ trình <MaterialCommunityIcons name="map-marker-path" size={18}/> </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    // flex: 1,
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
    borderWidth: 1,
  },
  PlaceTypeList: {
    top: Constants.statusBarHeight,
    width: '100%',
    position: 'absolute',
    borderColor:'black',
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  TypeText: {
    fontsize: 18,
    color:'#888',
    fontWeight:'bold'
  },
  TypeBox: {
    top:'15%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  InactiveBox: {
    backgroundColor: '#888',
  },
  ActiveBox: {
    backgroundColor: 'white',
  },
  PopupBox: {
    position:'absolute',
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    bottom:'1%',
    marginLeft:'5%',
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default MapScreen;