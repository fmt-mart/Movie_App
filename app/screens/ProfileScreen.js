import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  Bars3CenterLeftIcon,
  PencilSquareIcon,
  PhoneIcon,
  EnvelopeIcon,
  CogIcon,
  HeartIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchUser } from "../api/moviedb";
import { useContext } from "react";
import { AppContext } from "../components/context";

export default function ProfileScreen() {
  //const [user, setUser] = useState({});
  const navigation = useNavigation();
  //const route = useRoute();
  const { data } = useContext(AppContext);
  const [fullname, setFullname] = useState(data.fullname);
  const [username, setUsername] = useState(data.username);
  const [phonenumber, setPhonenumber] = useState(data.phonenumber);
  const [email, setEmail] = useState(data.email);


  useEffect(() => {
    setFullname(data.fullname);
    setUsername(data.username);
    setPhonenumber(data.phonenumber);
    setEmail(data.email);
  }, [data]);

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", data);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      width: "100%",
      height: "100%",
    },

    text: {
      color: "white",
    },
  });

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
          onPress={() => navigation.openDrawer()}
        />
        <TouchableOpacity>
          <PencilSquareIcon
            size={30}
            strokeWidth={2}
            color="white"
            onPress={handleEditProfile}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../assets/images/movieTime.jpg")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            margin: 30,
          }}
        ></Image>

        <View>
          <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>
            {fullname}
          </Text>
          <Text style={{ fontSize: 15, color: "gray" }}>@{username}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", margin: 20 }}>
        <PhoneIcon size={20} strokeWidth={2} color="white" />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginLeft: 20,
          }}
        >
          {phonenumber}
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
      >
        <EnvelopeIcon size={20} strokeWidth={2} color="white" />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            marginLeft: 20,
          }}
        >
          {email}
        </Text>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: "gray",
          marginHorizontal: 20,
          marginTop: 20,
        }}
      ></View>

      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <HeartIcon size={20} strokeWidth={2} color="white" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              marginLeft: 20,
            }}
          >
            Your Favorite
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <CogIcon size={20} strokeWidth={2} color="white" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              marginLeft: 20,
            }}
          >
            Settings
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <UserCircleIcon size={20} strokeWidth={2} color="white" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              marginLeft: 20,
            }}
          >
            Support
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
