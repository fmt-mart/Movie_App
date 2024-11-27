import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
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
import { AppProvider } from "../components/context";

// SignStack Component - Quản lý đăng nhập và đăng ký
const SignStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="AppNavigation" component={AppNavigation} />
    </Stack.Navigator>
  );
};

// HomeStack Component - Quản lý các màn hình liên quan đến Home
const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Person"
        component={PersonScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpcomingMovies"
        component={UpcomingSeeAll}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopRatedMovies"
        component={TopratedSeeAll}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

//ProfileStack Component - Quản lý các màn hình liên quan đến Profile
const ProfileStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// AppNavigation Component - Quản lý Navigation và Drawer
const AppNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <AppProvider>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: { backgroundColor: "black", width: 250 },
          drawerLabelStyle: { color: "white" },
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Profile" component={ProfileStack} />
        <Drawer.Screen name="SignIn" component={SignStack} />
      </Drawer.Navigator>
    </AppProvider>
  );
};

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const styles = StyleSheet.create({
    drawerContainer: {
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
        onPress={() => navigation.navigate("Home")}
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
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Ionicons name="log-out-outline" size={24} color="#ffffff" />
        <Text style={styles.drawerLabel}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignStack;
