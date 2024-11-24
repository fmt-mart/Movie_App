import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../api/moviedb";
export default Cast = ({ cast }) => {
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      marginBottom: 10,
    },
    scrollContainer: {
      paddingHorizontal: 10,
    },
    castItem: {
      marginRight: 10,
      alignItems: "center",
    },
    characterText: {
      color: "white",
      fontWeight: "bold",
    },
    personText: {
      color: "#d3d3d3",
      fontSize: 12,
    },
    noCastText: {
      color: "#d3d3d3",
      fontStyle: "italic",
    },
  });

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
        }}
      >
        Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {cast && cast.length > 0 ? (
          cast.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.castItem}
              onPress={() => navigation.navigate("Person", item)}
            >
              <View style={{ marginRight: 10, marginTop: 20 }}>
                <Image
                  style={{
                    borderRadius: 50,
                    height: 100,
                    width: 100,
                    marginBottom: 10,
                  }}
                  // source={require("../assets/images/castImage1.jpg")}
                  source={{ uri: image185(item?.profile_path) }}
                ></Image>
              </View>
              <Text style={styles.characterText}>
                {item?.character.length > 10
                  ? item?.character.slice(0, 10) + "..."
                  : item?.character}
              </Text>
              <Text style={styles.personText}>
                {item?.original_name.length > 10
                  ? item?.original_name.slice(0, 10) + "..."
                  : item?.original_name}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noCastText}>No cast available</Text>
        )}
      </ScrollView>
    </View>
  );
};
