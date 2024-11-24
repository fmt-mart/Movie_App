import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieListUpcoming";
import Loading from "../components/loading";
import { fetchMovieDetails } from "../api/moviedb";
import { fetchMovieCredits } from "../api/moviedb";
import { fetchSimilarMovies } from "../api/moviedb";
import { image500 } from "../api/moviedb";

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
  imageStyle: {
    width,
    height: height * 0.55,
  },
});

export default MovieScreen = () => {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavourite, toggleFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    //console.log(item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    //console.log(data);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data) {
      setCast(data.cast);
    }
    setLoading(false);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data) {
      setSimilarMovies(data.results);
    }
    setLoading(false);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={styles.container}
    >
      {/*back button and movie poster*/}
      <View
        style={{ width: "100%", height: height * 0.6, position: "relative" }}
      >
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              style={styles.imageStyle}
              // source={require("../assets/images/avengers2018.jpg")}
              source={{ uri: image500(movie?.poster_path) }}
            />
            <LinearGradient
              colors={["transparent", "black"]}
              style={{
                position: "absolute",
                bottom: 0,
                width: width,
                height: height * 0.4,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
        {/* Buttons */}
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
      </View>

      {/**movie details */}
      <View
        style={{
          marginTop: -(height * 0.09),
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {movie.title}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            textAlign: "center",
            fontWeight: "semibold",
          }}
        >
          {movie?.status} • {movie?.release_date} • {movie?.runtime} min
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {movie?.genres?.map((genre, index) => {
            let shotDot = index < movie?.genres.length - 1 ? " • " : "";
            return (
              <Text
                key={index}
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center",
                  fontWeight: "semibold",
                  marginTop: 10,
                }}
              >
                {genre?.name}
                {shotDot}
              </Text>
            );
          })}
        </View>

        {/*Description*/}
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginTop: 20,
            textAlign: "left",
          }}
        >
          {movie?.overview}
        </Text>
      </View>
      {/*cast*/}
      <Cast navigation={navigation} cast={cast} />

      {/** similar movies*/}
      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
};
