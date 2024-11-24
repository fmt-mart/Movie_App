import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import UpcomingSeeAll from "../screens/UpcomingSeeAll";
import TopratedSeeAll from "../screens/TopratedSeeAll";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        options={{ headerShown: false }}
        component={SignInScreen}
      />
      <Stack.Screen
        name="SignUp"
        options={{ headerShown: false }}
        component={SignUpScreen}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Movie"
        options={{ headerShown: false }}
        component={MovieScreen}
      />
      <Stack.Screen
        name="Person"
        options={{ headerShown: false }}
        component={PersonScreen}
      />
      <Stack.Screen
        name="SearchScreen"
        options={{ headerShown: false }}
        component={SearchScreen}
      />
      <Stack.Screen
        name="UpcomingMovies"
        options={{ headerShown: false }}
        component={UpcomingSeeAll}
      />
      <Stack.Screen
        name="TopRatedMovies"
        options={{ headerShown: false }}
        component={TopratedSeeAll}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: "black", width: 250 },
        drawerLabelStyle: { color: "white" },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
    </Drawer.Navigator>
  );
};

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const styles = StyleSheet.create({
    drawerContainer: {
      flex: 1,
      backgroundColor: "black",
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    headerText: {
      color: "#eab308",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    drawerItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: "#374151",
      borderRadius: 8,
    },
    drawerLabel: {
      color: "#ffffff",
      fontSize: 16,
      marginLeft: 10,
      fontWeight: "500",
    },
  });

  const navigation = props.navigation;
  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.headerText}>Menu</Text>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("HomeStack")}
      >
        <Ionicons name="home-outline" size={24} color="#ffffff" />
        <Text style={styles.drawerLabel}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person-outline" size={24} color="#ffffff" />
        <Text style={styles.drawerLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppNavigation;
