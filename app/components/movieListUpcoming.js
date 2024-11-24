import { useNavigation } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { image185 } from "../api/moviedb";
const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight:"bold"}}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => navigation.navigate("UpcomingMovies")}>
            <Text style={{ color: "#eab308", fontSize: 18 }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", { id: item.id })}
            >
              <View style={{ paddingHorizontal: 7 }}>
                <Image
                  style={{ width: 150, height: 200, borderRadius: 20 }}
                  // source={require("../assets/images/avengers2018.jpg")}
                  source={{ uri: image185(item.poster_path) }}
                />
                <Text style={{ color: "white" }}>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "…"
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
