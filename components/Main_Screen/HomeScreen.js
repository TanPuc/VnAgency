import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions, Linking } from "react-native";
import React, { useState } from "react";
import CATEGORIES from "./config/CATEGORIES";
import COLORS from "./config/COLORS";
import ADVANTURES from "./config/ADVANTURES";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "../assets/Firebase.js";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get('screen').height;
const SPACING = 10;

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
        navigation.replace('SignIn');
        console.log("Logged out");
    })
    .catch(error => alert(error.message))
  }
  const openDrawer = () => {
  }

  return (
    <SafeAreaView>
      <View style={{ padding: SPACING * 2 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: SPACING * 3,
              fontWeight: "bold",
              color: COLORS.dark,
            }}
          >
            Trang chủ
          </Text>
          
          {/* Drawer */}
          <TouchableOpacity onPress={handleSignOut}>
            <Image
              style={{
                height: SPACING * 5,
                width: SPACING * 5,
                borderRadius: SPACING * 5,
              }}
              source={require("../../assets/Avatar.png")}
            />
          </TouchableOpacity>
          {/* Drawer */}


          
        </View>
        <ScrollView style={{ marginVertical: SPACING * 2 }} horizontal>
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              onPress={() => setActiveCategory(index)}
              style={{ marginRight: SPACING * 1.7 }}
              key={category.id}
            >
              <Text
                style={[
                  { fontSize: SPACING * 2, color: COLORS.dark },
                  activeCategory === index && { color: COLORS.pink },
                ]}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {activeCategory === 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={WIDTH * 0.7}
          decelerationRate="fast"
          pagingEnabled
          style={{ marginVertical: SPACING * 2 }}
        >
          {CATEGORIES[activeCategory].tours.map((tour, index) => (
            <TouchableOpacity
              style={{
                width: WIDTH * 0.7,
                height: WIDTH * 0.9,
                overflow: "hidden",
                borderRadius: SPACING * 2,
                marginRight: SPACING * 2,
              }}
              key={index}
              onPress={() => {navigation.navigate('TourDetailScreen', { tour_id: tour.id - 1 })}}
            >
              <View
                style={{
                  position: "absolute",
                  zIndex: 1,
                  height: "100%",
                  width: "100%",
                  backgroundColor: COLORS.transparent,
                  justifyContent: "space-between",
                  padding: SPACING,
                }}
              >
                {/* <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    padding: SPACING / 2,
                    backgroundColor: COLORS.white,
                    borderRadius: SPACING * 5,
                    justifyContent: "center",
                    alignItems: "center",
                    top: '20%',
                  }}
                  onPress={Knapsack}
                >
                  <Ionicons
                    name="heart-outline"
                    color='#fb6d79'
                    size={SPACING * 3}
                  />
                </TouchableOpacity> */}
                <View style={{
                  position: 'absolute',
                  top:"95%",
                  width: "80%",
                  height: 30,
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderWidth: 1,
                  borderColor: '#fb6d79',
                  borderTopRightRadius: 25,
                  borderWidth: 1,
                  backgroundColor: "#fb6d79",
                }}><Text style={{
                        position:'absolute',
                        fontSize: SPACING * 2,
                        paddingTop: 5,
                        color: COLORS.white,
                        fontWeight: "bold",
                        marginLeft: SPACING,
                        top:'90%',
                      }}
                    >
                      {tour.title}
                    </Text>
                </View>
                <View style={{
                  position: 'absolute',
                  alignSelf:'flex-end',
                  width: "40%",
                  height: 30,
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderWidth: 1,
                  borderColor: '#fb6d79',
                  borderBottomLeftRadius: 25,
                  borderWidth: 1,
                  backgroundColor: "#fb6d79",
                }}><Text style={{
                  color: "white",
                  fontSize: SPACING * 2,
                  position:'absolute',
                  fontFamily: 'SourceSansPro_Bold',
                  paddingTop: 5,
                  paddingLeft: 20,
                  // left: '70%',
                  // top: '90%',
                }}><Text>Rate: </Text>{tour.rating}</Text></View>
                <View style={{
                  position: 'absolute',
                  width: 70,
                  height: 10,
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderWidth: 1,
                  borderColor: '#fb6d79',
                  borderBottomRightRadius: 25,
                  borderWidth: 1,
                  backgroundColor: "#fb6d79",
                }}>
                  <Text
                    style={{
                      width: 80,
                      height: 50,
                      position:'absolute',
                      fontSize: SPACING * 2,
                      fontWeight:'bold',
                      color: COLORS.white,
                      paddingLeft: SPACING,
                      paddingTop: '5%',
                      color: "#fff",
                    }}
                  ><Text>No.</Text>{tour.id}</Text>
                </View>
                </View>
              <Image
                source={tour.image}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>)}
        {activeCategory === 1 && (
          <ScrollView>
            {CATEGORIES[activeCategory].tours.map((tour, index) => (
              <TouchableOpacity 
                style={{
                  height: WIDTH * 0.25,
                  overflow: "hidden",
                  borderTopLeftRadius: SPACING * 3,
                  borderBottomEndRadius: SPACING * 3,
                  marginVertical: SPACING * 0.8,
                  borderColor: 'grey',
                  backgroundColor: 'white',
                  borderWidth: 0.5,
                  flex: 1,
                  flexWrap: 'wrap',
                  flexShrink: 1,
                }}
                key={index}
                flexDirection='row'
                onPress={() => Linking.openURL(tour.link)}
              >
                <Image source={{uri: tour.image}} style={{
                  width: WIDTH * 0.34,
                  height: HEIGHT * 0.14,
                  resizeMode: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}/>
                <View>
                  <View>
                    <Text style={{
                      width: WIDTH * 0.6,
                      paddingHorizontal: 15,
                      paddingTop: 6,
                      paddingBottom: 1,
                      fontFamily: 'SourceSansPro_Bold',
                      fontSize: 14.5,
                      color:"#fb6d79",
                    }}
                    numberOfLines={2}
                    >{tour.title}</Text>
                  </View>
                  <Text
                    style={{
                      width: WIDTH * 0.58,
                      paddingHorizontal: 15,
                      paddingVertical: 6,
                      fontFamily: 'SourceSansPro_Regular',
                      fontSize: 13.5,
                      color:"#182e44",
                    }}
                    numberOfLines={3}
                  >{tour.abstract}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {activeCategory === 0 &&
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "bold",
                color: COLORS.dark,
              }}
            >
              Tiện ích
            </Text>
            {/* <TouchableOpacity>
              <Text
                style={{
                  fontSize: SPACING * 1.4,
                  fontWeight: "500",
                  color: COLORS.primary,
                }}
              >
                Hiện tất cả
              </Text>
            </TouchableOpacity> */}
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            style={{ marginVertical: SPACING * 2, marginHorizontal: SPACING }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {ADVANTURES.map((adventure) => (
              <TouchableOpacity
                key={adventure.id}
                style={{
                  marginRight: SPACING * 3,
                  padding: SPACING,
                  alignItems: "center",
                }}
                onPress={() => {navigation.navigate(adventure.navigation)}}
              >
                <View style={{ width: SPACING * 3, height: SPACING * 3.2 }}>
                  <Ionicons
                    name={adventure.icon}
                    color={COLORS.dark_green}
                    size={SPACING * 3.2}
                  />
                </View>
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontSize: SPACING,
                    marginTop: SPACING,
                    color: COLORS.dark,
                  }}
                >
                  {adventure.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});