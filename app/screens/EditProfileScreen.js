import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import { useContext, useState } from "react";
import { AppContext } from "../components/context";
import { useNavigation } from "@react-navigation/native";

export default EditProfileScreen = () => {
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

  const { data } = useContext(AppContext);
  const { setData } = useContext(AppContext);
  const navigation = useNavigation();
  const [fullname, setFullname] = useState(data.fullname);
  const [username, setUsername] = useState(data.username);
  const [phonenumber, setPhonenumber] = useState(data.phonenumber);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);

  useEffect(() => {
    setFullname(data.fullname);
    setUsername(data.username);
    setPhonenumber(data.phonenumber);
    setEmail(data.email);
  }, [data]);

  const handleUpdate = async () => {
    try {
      // Update logic here
      const response = await fetch(
        `http://10.0.2.2:3000/users/${data.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: data.userId,
            fullname: fullname,
            username: username,
            phonenumber: phonenumber,
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data_new = await response.json();
        console.log("Update successful:", data_new);
        alert("Update successful");
        setData(data_new);
        navigation.navigate("Profile", data_new);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Invalid login credentials");
      }
    } catch (error) {
      console.log("Update error:", error);
      alert("Update failed");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", data)}
        >
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
        Edit Profile
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
          value={fullname}
          placeholderTextColor={"lightgray"}
          onChangeText={setFullname}
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
          value={phonenumber}
          onChangeText={setPhonenumber}
          placeholderTextColor={"lightgray"}
        ></TextInput>

        <Text
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
        >
          {data.email}
        </Text>

        <TouchableOpacity
          onPress={handleUpdate}
          style={{
            backgroundColor: "#eab308",
            padding: 10,
            marginHorizontal: 20,
            marginTop: 50,
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
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
