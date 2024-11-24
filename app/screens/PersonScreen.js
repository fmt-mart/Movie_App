import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import {
  fetchPersonDetails,
  image342,
  fetchPersonMovies,
} from "../api/moviedb";
import MovieList from "../components/movieListUpcoming";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backButton: {
    borderRadius: 10,
    backgroundColor: "#eab308",
    padding: 5,
  },
  favoriteButton: {
    padding: 5,
  },
  buttonContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PersonScreen = () => {
  const [isFavourite, toggleFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) {
      setPerson(data);
    }
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data) {
      setPersonMovies(data.cast);
    }
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={styles.container}
    >
      {/* Buttons */}
      <View
        style={{
          width: "100%",
          height: height * 2.22,
          position: "relative",
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ChevronLeftIcon size={30} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleFavorite(!isFavourite)}
            style={styles.favoriteButton}
          >
            <HeartIcon
              size={40}
              strokeWidth={4.5}
              color={isFavourite ? "#eab308" : "white"}
            />
          </TouchableOpacity>
        </View>

        {/**Person details */}
        {loading ? (
          <Loading />
        ) : (
          <View>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  overflow: "hidden",
                  marginTop: 80,
                  elevation: 10,
                }}
              >
                <Image
                  // source={require("../assets/images/castImage1.jpg")}
                  source={{ uri: image342(person?.profile_path) }}
                  style={{
                    borderRadius: 200,
                    height: 350,
                    width: 350,
                    resizeMode: "cover",
                  }}
                ></Image>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 20,
                }}
              >
                {person?.name}
              </Text>
              <Text
                style={{ fontSize: 15, color: "gray", textAlign: "center" }}
              >
                {person?.place_of_birth}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "between",
                textAlign: "center",
                marginTop: 20,
                backgroundColor: "gray",
                padding: 10,
                marginHorizontal: 20,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "white",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "white", textAlign: "center" }}
                >
                  Gender
                </Text>
                <Text
                  style={{ fontSize: 15, color: "white", textAlign: "center" }}
                >
                  {person?.gender === 1 ? "Female" : "Male"}
                </Text>
              </View>
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "white",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "white", textAlign: "center" }}
                >
                  Birthday
                </Text>
                <Text
                  style={{ fontSize: 15, color: "white", textAlign: "center" }}
                >
                  {person?.birthday}
                </Text>
              </View>
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "white",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "white", textAlign: "center" }}
                >
                  Known For
                </Text>
                <Text
                  style={{ fontSize: 15, color: "white", textAlign: "center" }}
                >
                  {person?.known_for_department}
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "white", textAlign: "center" }}
                >
                  Popularity
                </Text>
                <Text
                  style={{ fontSize: 15, color: "white", textAlign: "center" }}
                >
                  {person?.popularity?.toFixed(2) + "%"}
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  alignItems: "center",
                }}
              ></View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  textAlign: "left",
                  marginTop: 20,
                }}
              >
                Biography
              </Text>
              <Text style={{ fontSize: 15, color: "gray", textAlign: "left" }}>
                {person?.biography}
              </Text>
            </View>

            {/**movies */}
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
