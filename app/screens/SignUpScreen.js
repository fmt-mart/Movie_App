import React, { useEffect, useState } from "react";
import { Platform, StatusBar, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";

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
    height: 40,
    width: 40,
    justifyContent: "center",
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

export default SignUpScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("black");
    }
    StatusBar.setBarStyle("light-content", true);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const handleSignUp = async () => {
    console.log("Fullname:", fullname);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Phonenumber:", phonenumber);

    if (!fullname || !username || !email || !password || !phonenumber) {
      alert("Please enter fullname, username, email, password, and phonenumber");
      return;
    }

    try {
      // Fetch danh sách người dùng từ Fake API
      const usersResponse = await fetch("http://10.0.2.2:3000/users");
      const users = await usersResponse.json();

      // Kiểm tra email hoặc username đã tồn tại
      const isDuplicate = users.some(
        (user) =>
          user.email === email.trim() || user.username === username.trim()
      );

      if (isDuplicate) {
        alert("Email or Username already exists. Please use a different one.");
        return;
      }
    } catch (error) {
      console.log("Sign up error:", error);
      alert("Sign up failed");
    }

    try {
      // Sign up logic here
      const response = await fetch("http://10.0.2.2:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, username, phonenumber, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sign up successful:", data);
        alert("Sign up successful");
        navigation.navigate("SignIn");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Invalid login credentials");
      }
    } catch (error) {
      console.log("Sign up error:", error);
      alert("Sign up failed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <ChevronLeftIcon color="white" size={24} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Sign Up
      </Text>

      <View style={{ flex: 1, flexDirection: "column", marginTop: 10 }}>
        <TextInput
          style={{
            color: "white",
            fontSize: 20,
            borderColor: "gray",
            marginHorizontal: 20,
            marginBottom: 20,
            padding: 10,
            borderBottomWidth: 3,
          }}
          placeholder="Fullname"
          value={fullname}
          onChangeText={setFullname}
          placeholderTextColor={"lightgray"}
        ></TextInput>

        <TextInput
          style={{
            color: "white",
            fontSize: 20,
            borderColor: "gray",
            marginHorizontal: 20,
            marginBottom: 20,
            padding: 10,
            borderBottomWidth: 3,
            marginTop: 20,
          }}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={"lightgray"}
        ></TextInput>

        <TextInput
          style={{
            color: "white",
            fontSize: 20,
            borderColor: "gray",
            marginHorizontal: 20,
            marginBottom: 20,
            padding: 10,
            borderBottomWidth: 3,
            marginTop: 20,
          }}
          placeholder="Phone Number"
          value={phonenumber}
          onChangeText={setPhonenumber}
          placeholderTextColor={"lightgray"}
        ></TextInput>

        <TextInput
          style={{
            color: "white",
            fontSize: 20,
            borderColor: "gray",
            marginHorizontal: 20,
            padding: 10,
            marginTop: 40,
            borderBottomWidth: 3,
            marginTop: 20,
          }}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={"lightgray"}
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
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor={"lightgray"}
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
          onPress={() => handleSignUp()}
          style={{
            backgroundColor: "#eab308",
            padding: 10,
            marginHorizontal: 20,
            marginTop: 20,
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
            Sign Up
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
      </View>
    </View>
  );
};
