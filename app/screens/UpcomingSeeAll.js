import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { fetchPopularMovies } from "../api/moviedb";
import Loading from "../components/loading";
import { image342 } from "../api/moviedb";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  backButton: {
    borderRadius: 10,
    backgroundColor: "#eab308",
    padding: 5,
    marginLeft: 10,
  },
});
const { width, height } = Dimensions.get("window");
export default UpcomingSeeAll = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("black");
    }
    StatusBar.setBarStyle("light-content", true);
  }, []);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setUpcoming] = useState([]);

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  const getUpcomingMovies = async () => {
    const data = await fetchPopularMovies();
    // console.log(data);
    if (data && data.results) {
      setUpcoming(data.results);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
        >
          <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            flex: 1,  
            marginRight: 40,
          }}
        >
          Upcoming 
        </Text>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {results.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginHorizontal: 19, marginTop: 20 }}
                onPress={() => navigation.navigate("Movie", { id: item.id })}
              >
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{
                      height: height * 0.3,
                      width: width * 0.4,
                      borderRadius: 20,
                    }}
                    // source={require("../assets/images/avengers2018.jpg")}
                    source={{
                      uri: image342(item?.poster_path) || fallbackMoviePoster,
                    }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    {item?.title.length > 20
                      ? item?.title.slice(0, 20) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
