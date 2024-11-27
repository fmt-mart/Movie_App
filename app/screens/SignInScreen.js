import React, { useEffect, useState, useContext } from "react";
import { Platform, StatusBar, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { user_login } from "../api/user_api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../components/context";

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

  iconContainer: {
    padding: 8,
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: "gray",
    marginHorizontal: 25,
  },
});

export default SignInScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("black");
    }
    StatusBar.setBarStyle("light-content", true);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setData } = useContext(AppContext);
  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // try {
    //   // Login logic here
    //   const response = await fetch("http://10.0.2.2:3000/users");
    //   const users = await response.json();

    //   //Tim nguoi dung co email va mat khau trung khop
    //   const user = users.find(
    //     (u) =>
    //       (u.email === email.trim() && u.password === password.trim()) ||
    //       (u.username === username.trim() && u.password === password.trim())
    //   );

    //   if (user) {
    //     console.log("Login successful:", user);
    //     //alert("Login successful");
    //     navigation.navigate("AppNavigation"); 
    //     setData({
    //       userId: user.id,
    //       fullname: user.fullname,
    //       username: user.username,
    //       email: user.email,
    //       phonenumber: user.phonenumber,
    //       password: user.password,
    //     });
    //   } else {
    //     alert("Invalid email or password");
    //   }
    // } catch (error) {
    //   console.log("Login error:", error);
    //   alert("Login failed");
    // }


    if (password && password.trim()) {
      user_login({
        email: email,
        password: password,
      }).then((result) => {
        if (result.status === 200) {
          AsyncStorage.setItem("AccessToken", result.data.token);
          navigation.navigate("AppNavigation");
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      alert(password);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Login
      </Text>

      <View style={{ flex: 1, flexDirection: "column", marginTop: 50 }}>
        <TextInput
          style={{
            color: "white",
            fontSize: 20,
            borderColor: "gray",
            marginHorizontal: 20,
            padding: 10,
            borderBottomWidth: 3,
            marginTop: 20,
          }}
          placeholder="Email Address Or Username"
          placeholderTextColor={"lightgray"}
          value={email}
          onChangeText={(text) => setEmail(text) || setUsername(text)}
        ></TextInput>

        <View
          style={{
            fontSize: 20,
            borderColor: "gray",
            marginHorizontal: 20,
            padding: 10,
            marginTop: 40,
            borderBottomWidth: 3,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              color: "white",
              fontSize: 20,
            }}
            placeholder="Password"
            placeholderTextColor={"lightgray"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          ></TextInput>

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            {showPassword ? (
              <EyeSlashIcon color="white" size={24} />
            ) : (
              <EyeIcon color="white" size={24} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              marginTop: 20,
              marginHorizontal: 20,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleLogin()}
          style={{
            backgroundColor: "#eab308",
            padding: 10,
            marginHorizontal: 20,
            marginTop: 40,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            justifyContent: "center",
          }}
        >
          <View style={styles.line} />
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontWeight: "bold",
              marginTop: -15,
            }}
          >
            Or
          </Text>
          <View style={styles.line} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginTop: 40,
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "gray",
                padding: 5,
                borderRadius: 25,
                justifyContent: "center",
                width: 200,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/google-icon-1.png")}
                style={{ width: 40, height: 40 }}
              ></Image>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Google
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "gray",
                padding: 5,
                borderRadius: 25,
                justifyContent: "center",
                width: 200,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/facebook.png")}
                style={{ width: 60, height: 40 }}
              ></Image>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                color: "#eab308",
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 5,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
