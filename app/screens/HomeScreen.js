import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import MovieListUpcoming from "../components/movieListUpcoming";
import MovieListTopRated from "../components/movieListTopRated";
import Loading from "../components/loading";
import { fetchTrendingMovies } from "../api/moviedb";
import { fetchPopularMovies } from "../api/moviedb";
import { fetchTopRatedMovies } from "../api/moviedb";
import { AppContext } from "../components/context";
// const android = Platform.OS === "android";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
});

const HomeScreen = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("black");
    }
    StatusBar.setBarStyle("light-content", true);
  }, []);

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { params: user } = route;
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopratedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log(data);
    if (data && data.results) {
      setTrending(data.results);
    }
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchPopularMovies();
    // console.log(data);
    if (data && data.results) {
      setUpcoming(data.results);
    }
    setLoading(false);
  };

  const getTopratedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log(data);
    if (data && data.results) {
      setToprated(data.results);
    }
    setLoading(false);
  };

  const handleDrawer = () => {
    // if (user && user.userId) {
    //   setData({
    //     userId: user.userId,
    //     fullname: user.fullname,
    //     username: user.username,
    //     email: user.email,
    //     phonenumber: user.phonenumber,
    //     password: user.password,
    //   });
     
    // } else {
    //   console.error("User data is not available for drawer.");
    // }

    navigation.openDrawer();
    console.log(user);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Bars3CenterLeftIcon
          size={30}
          strokeWidth={2}
          color="white"
          onPress={handleDrawer}
        />
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
          <Text style={{ color: "#eab308" }}>M</Text>ovies
        </Text>
        <TouchableOpacity>
          <MagnifyingGlassIcon
            size={30}
            strokeWidth={2}
            color="white"
            onPress={() => navigation.navigate("HomeStack", { screen: "Search" })}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/**Trending movies */}
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {/**Upcoming movies row*/}
          {upcoming.length > 0 && (
            <MovieListUpcoming title="Upcoming" data={upcoming} />
          )}
          {/**Top rated movies row*/}
          {toprated.length > 0 && (
            <MovieListTopRated title="Top Rated" data={toprated} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
