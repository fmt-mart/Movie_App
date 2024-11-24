import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchSearchMovies,
  image342,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
});

export default SearchScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      const data = await fetchSearchMovies(value);
      if (data) {
        setResults(data.results);
      }
      setLoading(false);
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 1000),
    []
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "black",
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginHorizontal: 20,
          borderRadius: 20,
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={{
            fontWeight: "semibold",
            color: "white",
            fontSize: 20,
          }}
        ></TextInput>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            backgroundColor: "gray",
            padding: 10,
            borderRadius: 25,
            marginLeft: 10,
          }}
        >
          <XMarkIcon size={30} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </View>

      {/*result*/}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Results ({results.length})
          </Text>
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
                style={{ marginHorizontal: 10, marginTop: 20 }}
                onPress={() => navigation.push("Movie", item)}
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
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={require("../assets/images/movieTime.jpg")}></Image>
        </View>
      )}
    </View>
  );
};
