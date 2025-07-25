import { Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, ImageBackground } from "react-native";

import React from "react";
import COLORS from "./config/COLORS";
import Ionicons from "@expo/vector-icons/Ionicons";
import TOURS from "./config/data/MARKERS";

const SPACING = 10;

const TourDetailScreen = ({ navigation, route }) => {
  const { tour_id } = route.params;

  var tour = TOURS[tour_id];

  return (
    <>
      <View>
        <ImageBackground
          source={{ uri: tour.image }}
          style={{ width: "100%", height: 500 }}
        >
          <SafeAreaView>
            <View
              style={{
                paddingHorizontal: SPACING,
                justifyContent: "space-between",
                flexDirection: "row",
                height: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.white,
                  width: SPACING * 4,
                  height: SPACING * 4,
                  borderRadius: SPACING * 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => { navigation.navigate('HomeScreen') }}
              >
                <Ionicons
                  name="chevron-back"
                  color='black'
                  size={SPACING * 3}
                />
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  paddingBottom: SPACING * 8,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    width: SPACING * 4,
                    height: SPACING * 4,
                    borderRadius: SPACING * 2,
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
                <View>
                  {tour.images.map((gallery, index) => (
                    <TouchableOpacity
                      style={{
                        width: SPACING * 6,
                        height: SPACING * 6,
                        padding: SPACING / 2,
                        backgroundColor: COLORS.white,
                        borderRadius: SPACING,
                        marginBottom: SPACING,
                      }}
                      key={index}
                    >
                      <Image
                        source={gallery.image}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: SPACING,
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: SPACING * 2,
            borderRadius: 15,
            bottom: SPACING * 3,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "bold",
                color: COLORS.dark,
              }}
            >
              {tour.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: SPACING * 2,
                  fontWeight: "bold",
                  color: COLORS.dark,
                }}
              >
                {tour.price != 0 ? tour.price + ".000đ" : "Miễn phí"}
              </Text>
              <Text>{tour.price != 0 ? "/người" : ""}</Text>
            </View>
          </View>
          <View style={{ marginVertical: SPACING * 2 }}>
            <View style={{ flexDirection: "row", marginBottom: SPACING * 2 }}>
              <TouchableOpacity
                style={{ paddingVertical: SPACING, marginRight: SPACING * 2 }}
              >
                <Text
                  style={{
                    color: COLORS.pink,
                    fontWeight: "bold",
                    fontSize: SPACING * 1.7,
                  }}
                >
                  Tổng quan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingVertical: SPACING, marginRight: SPACING * 2 }}
              >
                <Text>Đánh giá</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: SPACING * 2, flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    shadowColor: COLORS.dark,
                    shadowOffset: { width: SPACING / 2, height: SPACING },
                    shadowRadius: SPACING / 2,
                    shadowOpacity: 0.1,
                    padding: SPACING / 2,
                    borderRadius: SPACING / 2,
                    marginRight: SPACING,
                  }}
                >
                  <Ionicons
                    name="time"
                    size={SPACING * 3}
                    color={COLORS.pink}
                  />
                </View>
                <View style={{ marginRight: SPACING * 2 }}>
                  <Text
                    style={{
                      fontSize: SPACING + 1,
                      marginBottom: SPACING / 2,
                      textTransform: "uppercase",
                    }}
                  >
                    Thời gian
                  </Text>
                  <Text style={{ fontSize: SPACING * 1.6, fontWeight: "700" }}>
                    {tour.duration} giờ
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    shadowColor: COLORS.dark,
                    shadowOffset: { width: SPACING / 2, height: SPACING },
                    shadowRadius: SPACING / 2,
                    shadowOpacity: 0.1,
                    padding: SPACING / 2,
                    borderRadius: SPACING / 2,
                    marginRight: SPACING,
                  }}
                >
                  <Ionicons
                    name="star"
                    size={SPACING * 3}
                    color={COLORS.pink}
                  />
                </View>
                <View style={{ marginRight: SPACING * 2 }}>
                  <Text
                    style={{
                      fontSize: SPACING + 1,
                      marginBottom: SPACING / 2,
                      textTransform: "uppercase",
                    }}
                  >
                    Đánh giá
                  </Text>
                  <Text style={{ fontSize: SPACING * 1.6, fontWeight: "700" }}>
                    {tour.rate} trên 5
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{ color: COLORS.dark }}>{tour.description}</Text>
            </View>
          </View>
          {tour.price != 0 ? (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.pink,
              padding: SPACING * 1,
              marginBottom: SPACING,
              marginHorizontal: SPACING,
              borderRadius: SPACING * 2,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: SPACING * 2,
                fontWeight: "bold",
                marginHorizontal: SPACING * 3.6,
              }}
            >
              Đặt vé
            </Text>
            <Ionicons
              name="arrow-forward"
              size={SPACING * 2.5}
              color={COLORS.white}
            />
          </TouchableOpacity>) : (
            <TouchableOpacity
            style={{
              backgroundColor: COLORS.pink,
              padding: SPACING * 1,
              marginBottom: SPACING,
              marginHorizontal: SPACING,
              borderRadius: SPACING * 2,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: SPACING * 2,
                fontWeight: "bold",
                marginHorizontal: SPACING * 3.6,
              }}
            >
              Dẫn đường
            </Text>
            <Ionicons
              name="arrow-forward"
              size={SPACING * 2.5}
              color={COLORS.white}
            />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default TourDetailScreen;