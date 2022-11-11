import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions, Linking } from "react-native";
import React, { useState } from "react";
import CATEGORIES from "./config/CATEGORIES";
import COLORS from "./config/COLORS";
import ADVANTURES from "./config/ADVANTURES";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "../assets/Firebase.js";

const WIDTH = Dimensions.get("screen").width;
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
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    padding: SPACING / 2,
                    backgroundColor: COLORS.white,
                    borderRadius: SPACING * 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="heart-outline"
                    color='#fb6d79'
                    size={SPACING * 3}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: SPACING * 2,
                    color: COLORS.white,
                    fontWeight: "700",
                    marginLeft: SPACING,
                  }}
                >
                  {tour.title}
                </Text>
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
                <Image source={tour.image} style={{
                  width: WIDTH * 0.3,
                  height: WIDTH * 0.5,
                  resizeMode: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}/>
                <View>
                  <Text style={{
                    width: WIDTH * 0.6,
                    paddingHorizontal: 15,
                    paddingTop: 6,
                    paddingBottom: 1,
                    fontFamily: 'SourceSansPro_Bold',
                    fontSize: 14.5,
                  }}
                  numberOfLines={2}
                  >{tour.title}</Text>
                  <Text
                    style={{
                      width: WIDTH * 0.58,
                      paddingHorizontal: 15,
                      paddingVertical: 6,
                      fontFamily: 'SourceSansPro_Regular',
                      fontSize: 13.5,
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
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: SPACING * 1.4,
                  fontWeight: "500",
                  color: COLORS.primary,
                }}
              >
                Hiện tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            style={{ marginVertical: SPACING * 2, marginHorizontal: SPACING }}
            showsHorizontalScrollIndicator={false}
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