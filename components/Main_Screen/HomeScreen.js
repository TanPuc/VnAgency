import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CATEGORIES from "./config/CATEGORIES";
import COLORS from "./config/COLORS";
import ADVANTURES from "./config/ADVANTURES";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../assets/Firebase.js";
import Icon from "react-native-vector-icons/MaterialIcons";
import houses from "./config/HOUSES";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
const SPACING = 10;
const { width } = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("SignIn");
        console.log("Logged out");
      })
      .catch((error) => alert(error.message));
  };
  const openDrawer = () => {};
  const optionsList = [
    { title: "Đặt phòng", img: require("../../assets/hotels/house1.jpg") },
    { title: "Thuê nhà", img: require("../../assets/hotels/house2.jpg") },
  ];
  const categoryList = ["Phổ biến", "Gợi ý", "Gần đây"];

  const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
      <View style={styles.categoryListContainer}>
        {categoryList.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <Text
              style={[
                styles.categoryListText,
                index == selectedCategoryIndex && styles.activeCategoryListText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const ListOptions = () => {
    return (
      <View style={styles.optionListsContainer}>
        {optionsList.map((option, index) => (
          <View style={styles.optionsCard} key={index}>
            {/* House image */}
            <Image source={option.img} style={styles.optionsCardImage} />

            {/* Option title */}
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {option.title}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  const Card = ({ house }) => {
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("HotelBookingDetails", {
            house_id: house.id - 1,
          });
        }}
      >
        <View style={styles.card}>
          {/* House image */}
          <Image source={house.image} style={styles.cardImage} />
          <View style={{ marginTop: 10 }}>
            {/* Title and price container */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {house.title}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.green,
                  fontSize: 16,
                }}
              >
                {house.price}
              </Text>
            </View>

            {/* Location text */}

            <Text style={{ color: COLORS.grey, fontSize: 14, marginTop: 5 }}>
              {house.location}
            </Text>

            {/* Facilities container */}
            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <View style={styles.facility}>
                <Icon name="hotel" size={18} />
                <Text style={styles.facilityText}>2</Text>
              </View>
              <View style={styles.facility}>
                <Icon name="bathtub" size={18} />
                <Text style={styles.facilityText}>2</Text>
              </View>
              <View style={styles.facility}>
                <Icon name="aspect-ratio" size={18} />
                <Text style={styles.facilityText}>100m</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={{margin:20}}>
        <SafeAreaView
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
        </SafeAreaView>
        <View
          style={{ flexDirection: "row", marginVertical: SPACING * 2 }}
          horizontal
        >
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              onPress={() => setActiveCategory(index)}
              style={{ marginRight: SPACING * 2 }}
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
        </View>
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
                onPress={() => {
                  navigation.navigate("TourDetailScreen", {
                    tour_id: tour.id - 1,
                  });
                }}
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
                  <View
                    style={{
                      position: "absolute",
                      top: "95%",
                      width: "80%",
                      height: 30,
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderTopRightRadius: 25,
                      backgroundColor: "#fb6d79",
                    }}
                  >
                    <Text
                      style={{
                        position: "absolute",
                        fontSize: SPACING * 1.65,
                        paddingTop: 7,
                        color: COLORS.white,
                        fontWeight: "bold",
                        marginLeft: SPACING,
                        top: "90%",
                        alignSelf: "center",
                      }}
                    >
                      {tour.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      alignSelf: "flex-end",
                      width: "50%",
                      height: 30,
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderWidth: 1,
                      borderColor: "#fb6d79",
                      borderWidth: 1,
                      backgroundColor: "#fb6d79",
                      borderBottomLeftRadius: 25,
                      overflow: "hidden",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: SPACING * 2,
                        position: "absolute",
                        fontFamily: "SourceSansPro_Bold",
                        paddingTop: 5,
                        paddingLeft: 20,
                        // left: '70%',
                        // top: '90%',
                      }}
                    >
                      <Text>Rate: </Text>
                      {tour.rate}{" "}
                      <AntDesign name="star" size={24} color="white" />
                    </Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      width: 70,
                      height: 10,
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderBottomRightRadius: 25,
                      backgroundColor: "#fb6d79",
                    }}
                  >
                    <Text
                      style={{
                        width: 80,
                        height: 50,
                        position: "absolute",
                        fontSize: SPACING * 2,
                        fontWeight: "bold",
                        color: COLORS.white,
                        paddingLeft: SPACING,
                        paddingTop: 5,
                        color: "#fff",
                      }}
                    >
                      <Text>No.</Text>
                      {tour.id}
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: tour.image }}
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {activeCategory === 1 && (
          <ScrollView>
            {CATEGORIES[activeCategory].tours.map((tour, index) => (
              <TouchableOpacity
                style={{
                  height: HEIGHT * 0.12,
                  borderRadius: SPACING * 2.5,
                  marginVertical: SPACING * 0.4,
                  backgroundColor: "white",
                  flexWrap: "wrap",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                }}
                key={index}
                flexDirection="row"
                onPress={() => Linking.openURL(tour.link)}
              >
                <Image
                  source={{ uri: tour.image }}
                  style={{
                    marginTop: 5,
                    marginLeft: 6,
                    width: WIDTH * 0.32,
                    height: HEIGHT * 0.11,
                    borderColor: "white",
                    borderRadius: SPACING * 2,
                    resizeMode: "stretch",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <View>
                  <View>
                    <Text
                      style={{
                        width: WIDTH * 0.6,
                        paddingHorizontal: 15,
                        paddingTop: 6,
                        paddingBottom: 1,
                        fontFamily: "SourceSansPro_Bold",
                        fontSize: 14.5,
                        color: "#fb6d79",
                      }}
                      numberOfLines={2}
                    >
                      {tour.title}
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: WIDTH * 0.58,
                      paddingHorizontal: 15,
                      paddingVertical: 6,
                      fontFamily: "SourceSansPro_Regular",
                      fontSize: 13.5,
                      color: "#182e44",
                    }}
                    numberOfLines={3}
                  >
                    {tour.abstract}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {activeCategory === 2 && (
          <ScrollView>
            {CATEGORIES[activeCategory].tours.map((tour, index) => (
              <TouchableOpacity
                style={{
                  height: HEIGHT * 0.1,
                  // overflow: "hidden",
                  marginVertical: SPACING * 0.8,
                  borderColor: "grey",
                  backgroundColor: "white",
                  // borderWidth: 0.5,
                  // justifyContent: "center",
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
                  // flexShrink: 1,
                }}
                key={index}
                flexDirection="row"
                onPress={() => Linking.openURL(tour.link)}
              >
                <Image
                  source={{ uri: tour.image }}
                  style={{
                    width: HEIGHT * 0.1,
                    height: HEIGHT * 0.1,
                    // resizeMode: 'stretch',
                    alignSelf: "center",
                    justifyContent: "center",
                    // borderColor: 'black',
                    borderRadius: 15,
                    // borderWidth: 4,
                  }}
                />
                <View flexDirection="row">
                  <View>
                    <Text
                      style={{
                        width: WIDTH * 0.5,
                        height: HEIGHT * 0.1,
                        paddingHorizontal: 8,
                        paddingTop: 12,
                        paddingBottom: 10,
                        fontFamily: "SourceSansPro_Bold",
                        fontSize: 14.5,
                        color: "#182e44",
                        // borderColor: 'black',
                        // borderWidth: 2,
                      }}
                      numberOfLines={4}
                    >
                      {tour.title}
                    </Text>
                    <Text
                      style={{
                        position: "absolute",
                        width: WIDTH * 0.5,
                        height: HEIGHT * 0.1,
                        paddingHorizontal: 8,
                        paddingTop: 48,
                        fontFamily: "SourceSansPro_Bold",
                        fontSize: 10,
                        color: "#0e7886",
                      }}
                      numberOfLines4
                    >
                      <Foundation name="marker" size={24} color="#fb6d79" />
                      <Text> </Text>
                      {tour.address}
                    </Text>
                  </View>
                  {tour.start_date != "" ? (
                    <View>
                      <Text
                        style={{
                          width: WIDTH * 0.185,
                          overflow: "hidden",
                          height: HEIGHT * 0.1,
                          backgroundColor: "#182e44",
                          borderRadius: 15,
                          fontFamily: "SourceSansPro_Bold",
                          fontSize: 14.5,
                          paddingTop: 35,
                          paddingBottom: 35,
                          paddingLeft: 8,

                          color: "white",
                          // borderColor: 'black',
                          // borderWidth: 2,
                        }}
                        numberOfLines={4}
                      >
                        {tour.start_date}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {activeCategory === 0 && (
          <View >
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Text
                style={{
                  fontSize: SPACING * 2,
                  fontWeight: "bold",
                  color: COLORS.dark,
                }}>
                Đặt phòng
              </Text>
              <View style={{ marginTop: 25, marginLeft: "46%" }}>
                <Text style={{ color: COLORS.grey, textAlign: "right" }}>
                  Vị trí
                </Text>
                <Text
                  style={{
                    color: COLORS.green,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Đà Nẵng
                </Text>
              </View>
            </View>
            <SafeAreaView>
              {/* Header container */}
              <View style={styles.header}>
                {/* <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                  style={{
                    paddingTop: 10,
                    paddingLeft: 10,
                  }}
                /> */}
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Input and sort button container */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                  }}
                >
                  <View style={styles.searchInputContainer}>
                    <Icon name="search" color={COLORS.grey} size={25} />
                    <TextInput placeholder="Tìm kiếm theo địa chỉ, thành phố" />
                  </View>

                  {/* <View style={styles.sortBtn}>
                    <Icon name="tune" color={COLORS.white} size={25} />
                  </View> */}
                </View>

                {/* Render list options */}
                {/* <ListOptions /> */}

                {/* Render categories */}
                <ListCategories />

                {/* Render Card */}
                <FlatList
                  snapToInterval={width - 20}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingLeft: 20,
                    paddingVertical: 20,
                  }}
                  horizontal
                  data={houses}
                  renderItem={({ item }) => <Card house={item} />}
                />
              </ScrollView>
            </SafeAreaView>
            {/* {ADVANTURES.map((adventure) => (
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
            ))} */}
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.dark_green,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: "100%",
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 40,
  },
  card: {
    height: 250,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 80,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});

export default HomeScreen;
