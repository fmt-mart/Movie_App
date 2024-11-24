import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { image500 } from "../api/moviedb";
var { width, height } = Dimensions.get("window");
const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View style={{ marginBottom: 8 }}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          marginBottom: 10,
          paddingHorizontal: 10,
          fontWeight: "bold",
        }}
      >
        Trending
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

const MovieCard = ({ item, handleClick }) => {
  // console.log(item.poster_path);
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        style={{
          width: width * 0.6,
          height: height * 0.5,
          marginHorizontal: 5,
          borderRadius: 20,
        }}
        // source={require("../assets/images/avengers2008.jpg")}
        source={{ uri: image500(item?.poster_path) }}
      />
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;
