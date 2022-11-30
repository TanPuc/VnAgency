import * as React from "react";
import * as Location from "expo-location";
import { Component, useEffect, useState } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import {
  Keyboard,
  Pressable,
  Modal,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";
import mapStyle from "../assets/mapStyle.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import COLORS from "./config/COLORS";

import RESTS from "./config/data/RESTAURANTS";
import CAFE from "./config/data/CAFE";
import EVENTS from "./config/data/EVENTS";
import HOTELS from "./config/data/HOTELS";
import MARKERS from "./config/data/MARKERS";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const SPACING = 10;

//Khai báo tổng
const placeData = [
  {
    id: 1,
    place: "Quán cafe",
    selected: false,
  },
  {
    id: 2,
    place: "Quán ăn",
    selected: false,
  },
  {
    id: 3,
    place: "Khách sạn",
    selected: false,
  },
  {
    id: 4,
    place: "Sự kiện",
    selected: false,
  },
];
//Khai báo tổng

// Function các thứ

// Calculate time
function nextTime(hour, minute, plus) {
  minute += plus * 60;
  while (minute >= 60) {
    hour++;
    minute -= 60;
  }
  while (hour >= 24) hour -= 24;
  return { hour, minute };
}

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
  a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dlon / 2) *
      Math.sin(dlon / 2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  d = radius * c;

  return d;
}

// Knapsack DP to find path
function max(a, b) {
  return a > b ? a : b;
}

function knapsack(W) {
  const n = Object.keys(MARKERS).length - 1;
  var dp = new Array(n + 1),
    val = new Array(n + 1),
    wt = new Array(n + 1);
  for (var i = 0; i <= n; i++) dp[i] = new Array(n + 1);

  for (var i = 1; i <= n; i++) {
    wt[i] = MARKERS[i].id * 1000 - MARKERS[i].rate * 1000;
    val[i] = MARKERS[i].id * 75000 - 378;
  }

  for (var i = 0; i <= n; i++) {
    for (var w = 0; w <= W; w++) {
      if (i == 0 || w == 0) dp[i][w] = 0;
      else if (wt[i - 1] <= w) {
        dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
      } else dp[i][w] = dp[i - 1][w];
    }
  }

  var w = W,
    res = dp[n][W];
  var trace = new Array(0);
  for (var i = n; i > 0 && res > 0; i--) {
    if (res == dp[i - 1][w]) continue;
    else {
      trace.push({
        title: MARKERS[i - 1].title,
        duration: MARKERS[i - 1].duration,
        location: {
          latitude: MARKERS[i - 1].location.latitude,
          longitude: MARKERS[i - 1].location.longitude,
        },
      });
      res = res - val[i - 1];
      w = w - wt[i - 1];
    }
  }

  trace.reverse();

  var add_id = [],
    i = 1;

  for (var item in trace) {
    add_id.push({
      id: i,
      title: trace[item].title,
      duration: trace[item].duration,
      location: {
        latitude: trace[item].location.latitude,
        longitude: trace[item].location.longitude,
      },
    });
    i++;
  }

  return add_id;
}

const MapScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const AspectRatio = width / height;
  const LatitudeDelta = 0.0122;
  const LongitudeDelta = LatitudeDelta * AspectRatio;
  const [Region, setRegion] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  });
  const [Origin, setOrigin] = useState({
    // latitude: Region.latitude,
    // longitude: Region.longitude,
    latitude: 16.02269,
    longitude: 108.20915,
  });
  const [Destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

  //Getting user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
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
      });
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Choose category to show on maps
  const [placeDataSelected, setPlaceDataSelected] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);

  const updateFieldChanged = (index) => {
    let newArr = [...placeDataSelected];
    newArr[index].value = 1 - newArr[index].value;
    setPlaceDataSelected(newArr);
  };

  var rest_markers = [],
    cafe_markers = [],
    hotels_markers = [],
    events_markers = [],
    knapsack_trace = [];

  // Generate RESTAURANTS in particular area
  const showRestaurants = () => {
    rest_markers.length = 0;
    for (var item of RESTS) {
      if (
        item.location != null &&
        haversine_distance(Origin, {
          latitude: item.location.lat,
          longitude: item.location.lng,
        }) <= 0.5
      ) {
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
        });
      }
    }
    return 1;
  };

  // Generate CAFE in particular area
  const showCafe = () => {
    cafe_markers.length = 0;
    for (var item of CAFE) {
      if (
        item.location != null &&
        haversine_distance(Origin, {
          latitude: item.location.lat,
          longitude: item.location.lng,
        }) <= 0.5
      ) {
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
        });
      }
    }
    return 1;
  };

  // Generate HOTELS in particular area
  const showHotels = () => {
    hotels_markers.length = 0;
    for (var item of HOTELS) {
      if (
        item.location != null &&
        haversine_distance(Origin, {
          latitude: item.location.lat,
          longitude: item.location.lng,
        }) <= 0.5
      ) {
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
        });
      }
    }
    return 1;
  };

  // Generate EVENTS in particular area
  const showEvents = () => {
    events_markers.length = 0;
    for (var item of EVENTS) {
      if (item.location != null) {
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
        });
      }
    }
    return 1;
  };

  // Open Bottom Popup
  const [btmUp, setBtmUp] = useState(false);
  const [listOnModal, setListOnModal] = useState(false);
  const [limitPrice, onChangeLimitPrice] = useState(0);
  const [copyLimitPrice, setCopyLimitPrice] = useState(0);

  const [startPoint, setStartPoint] = useState({ latitude: 0, longitude: 0 });
  const [endPoint, setEndPoint] = useState({ latitude: 0, longitude: 0 });

  const showKnapsackPath = (W) => {
    knapsack_trace.length = 0;
    knapsack_trace = knapsack(W);
    knapsack_trace.unshift({
      id: 0,
      title: "Vị trí hiện tại",
      location: {
        latitude: Origin.latitude,
        longitude: Origin.longitude,
      },
    });
    console.log(knapsack_trace);
    return knapsack_trace.length;
  };

  if (Region.latitude != null && Region.longitude != null)
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={btmUp}
          onRequestClose={() => {
            Keyboard.dismiss();
            setModalVisible(!btmUp);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  backgroundColor: "#332FD0",
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 25,
                }}
              >
                <MaterialCommunityIcons
                  name="window-close"
                  size={17}
                  style={styles.closeBtn}
                  onPress={() => setBtmUp(!btmUp)}
                />
                <TextInput
                  style={styles.MoneyInput}
                  onChangeText={onChangeLimitPrice}
                  value={limitPrice}
                  placeholderTextColor="black"
                  placeholder="Giá tiền định mức"
                  keyboardType="numeric"
                />
                {limitPrice != 0 ? (
                  <Text
                    style={{
                      color: "black",
                      position: "absolute",
                      marginLeft: 320,
                      marginTop: 42,
                    }}
                  >
                    VND
                  </Text>
                ) : null}
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    Keyboard.dismiss();
                    if (limitPrice > 0) {
                      setListOnModal(false);
                      setCopyLimitPrice(limitPrice);
                      setListOnModal(true);
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "#332FD0",
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Kết quả
                  </Text>
                </Pressable>
              </View>

              {listOnModal == 1 && showKnapsackPath(copyLimitPrice) > 1 ? (
                <ScrollView
                  style={{ padding: 20 }}
                  keyboardShouldPersistTaps="handled"
                >
                  {knapsack_trace.map((marker, index) => (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                      key={index}
                    >
                      {marker.id != 0 && (
                        <TouchableOpacity
                          style={{
                            width: WIDTH * 0.88,
                            height: HEIGHT * 0.1,
                            marginVertical: SPACING * 0.8,
                            backgroundColor: "white",
                            borderRadius: 15,
                            flex: 1,
                            flexWrap: "wrap",
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            justifyContent: "space-between",
                          }}
                          flexDirection="row"
                          onPress={() => {
                            setStartPoint({
                              latitude:
                                knapsack_trace[marker.id - 1].location.latitude,
                              longitude:
                                knapsack_trace[marker.id - 1].location
                                  .longitude,
                            });
                            setEndPoint({
                              latitude: marker.location.latitude,
                              longitude: marker.location.longitude,
                            });
                            setBtmUp(!btmUp);
                          }}
                        >
                          <View flexDirection='row'>
                            <Text
                              numberOfLines={2}
                              style={{
                                width: "40%",
                                alignSelf: "flex-start",
                                fontSize: 18,
                                padding: 12,
                                fontWeight: "bold",
                                color: "#332FD0",
                                paddingRight: 8,
                                // borderWidth:2,
                              }}
                            >
                              {knapsack_trace[marker.id - 1].title}
                            </Text>
                            <Text
                              style={{
                                paddingTop: 12,
                                fontSize: 20,
                                alignSelf: "flex-start",
                                color: "#332FD0",
                                // borderWidth: 2,
                              }}
                            >
                              ----->
                            </Text>
                            <Text
                              style={{
                                width: "45%",
                                alignSelf: "flex-start",
                                // borderWidth:2,
                                fontSize: 18,
                                padding: 12,
                                fontWeight: "bold",
                                color: "#332FD0",
                                paddingLeft: 8,
                              }}
                            >
                              {marker.title}
                            </Text>
                          </View>
                          <View><Text style={{color:'#182e44', fontSize:15, left: 20, bottom: 15, position:'absolute',}}>Chi phí: <Text style={{fontSize: 20, fontWeight:'bold', color:'#332fd0'}}>{knapsack_trace[marker.id].price}</Text></Text></View>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </ScrollView>
              ) : null}
            </View>
          </View>
        </Modal>

        <MapView
          style={styles.map}
          provider={"google"}
          initialRegion={Region}
          showsMyLocationButton={true}
          showsUserLocation={true}
          showsBuildings={true}
          loadingEnabled={true}
          customMapStyle={mapStyle}
        >
          {Origin.latitude != null && Origin.longitude != null ? (
            <MapView.Circle
              center={Origin}
              radius={500}
              strokeWidth={4}
              strokeColor={"rgba(0, 0, 0, 1)"}
              fillColor={"rgba(0, 0, 255, 0.2)"}
            />
          ) : null}

          {placeDataSelected[0].value == 1 && showCafe() ? (
            <View>
              {cafe_markers.map((marker, index) => (
                <MapView.Marker
                  title={marker.title}
                  key={index}
                  coordinate={marker.location}
                  icon={require("../../assets/markers/coffee.png")}
                />
              ))}
            </View>
          ) : null}

          {placeDataSelected[1].value == 1 && showRestaurants() ? (
            <View>
              {rest_markers.map((marker, index) => (
                <MapView.Marker
                  title={marker.title}
                  key={index}
                  coordinate={marker.location}
                  icon={require("../../assets/markers/restaurant.png")}
                />
              ))}
            </View>
          ) : null}

          {placeDataSelected[2].value == 1 && showHotels() ? (
            <View>
              {hotels_markers.map((marker, index) => (
                <MapView.Marker
                  title={marker.title}
                  key={index}
                  coordinate={marker.location}
                  icon={require("../../assets/markers/hotel.png")}
                />
              ))}
            </View>
          ) : null}

          {placeDataSelected[3].value == 1 && showEvents() ? (
            <View>
              {events_markers.map((marker, index) => (
                <MapView.Marker
                  title={marker.title}
                  key={index}
                  coordinate={marker.location}
                  icon={require("../../assets/markers/event.png")}
                />
              ))}
            </View>
          ) : null}

          <View>
            <MapView.Marker
              title={"Điểm bắt đầu"}
              coordinate={startPoint}
              pinColor={"rgba(255, 0, 0, 1)"}
            />
            <MapView.Marker
              title={"Điểm kết thúc"}
              coordinate={endPoint}
              pinColor={"rgba(47, 61, 255, 1)"}
            />
          </View>
          <MapViewDirections
            origin={startPoint}
            destination={endPoint}
            apikey={"AIzaSyChUrRD1H7NaUhpRKqHBOweLZ9Zm9Stgx0"}
            strokeWidth={4}
            strokeColor="#59bfff"
          />
        </MapView>
        <SafeAreaView style={styles.PlaceTypeList}>
          {placeData.map((placeData, index) => (
            <TouchableOpacity
              onPress={() => updateFieldChanged(placeData.id - 1)}
              key={index}
              style={[
                styles.TypeBox,
                !placeDataSelected[placeData.id - 1].value
                  ? styles.ActiveBox
                  : styles.InactiveBox,
              ]}
            >
              <Text>{placeData.place}</Text>
            </TouchableOpacity>
          ))}
        </SafeAreaView>

        <SafeAreaView style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Tìm kiếm"
            fetchDetails={true}
            GooglePlacesDetailsQuery={{ rankby: "distance" }}
            onPress={(data, details = null) => {
              console.log(details.geometry.location);
              setDestination({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }}
            onFail={(error) => console.log(error)}
            onNotFound={() => console.log("no results")}
            query={{
              key: "AIzaSyChUrRD1H7NaUhpRKqHBOweLZ9Zm9Stgx0",
              language: "en",
              components: "country:vn",
            }}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.PopupBox}>
          <TouchableOpacity onPress={() => setBtmUp(!btmUp)}>
            <Text
              style={{
                alignSelf: "flex-start",
                paddingLeft: "8%",
                fontSize: 15,
                fontStyle: "Bold",
                color: "#888",
                fontWeight: "bold",
              }}
            >
              Lộ trình{" "}
              <MaterialCommunityIcons name="map-marker-path" size={18} />{" "}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },
  map: {
    // flex: 1,
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    padding: 2,
    borderRadius: 8,
    top: Constants.statusBarHeight,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  PlaceTypeList: {
    top: Constants.statusBarHeight,
    width: "100%",
    position: "absolute",
    borderColor: "black",
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  TypeText: {
    fontsize: 18,
    color: "#888",
    fontWeight: "bold",
  },
  TypeBox: {
    top: "15%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  InactiveBox: {
    backgroundColor: "#888",
  },
  ActiveBox: {
    backgroundColor: "white",
  },
  PopupBox: {
    position: "absolute",
    width: 80,
    height: 50,
    justifyContent: "center",
    alignSelf: "flex-start",
    bottom: "1%",
    marginLeft: "5%",
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  centeredView: {
    marginTop: "40%",
  },
  modalView: {
    flexDirection: "column",
    // margin: 20,
    height: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
    // marginRight: 20,
    margin: 80,
    marginBottom: 10,
    elevation: 2,
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
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  MoneyInput: {
    height: 40,
    // marginBottom: 20,
    marginTop: 5,
    // marginRight: 20,
    margin: 50,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#c8cacc",
    borderWidth: 2,
  },

  closeBtn: {
    // backgroundColor: 'black',
    // borderWidth: 2,
    // position: 'absolute',
    // top: '8%',
    // right: '5%',
    paddingTop: 8,
    paddingRight: 8,
    alignSelf: "flex-end",
  },
});

export default MapScreen;
