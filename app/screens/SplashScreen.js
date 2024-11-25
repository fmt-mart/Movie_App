import { View, Text, StyleSheet, StatusBar } from "react-native";
import { PlayIcon } from "react-native-heroicons/outline";
const SplashScreen = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      width: "100%",
      height: "100%",
    },

    logo_background: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "#eab308",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: [{ translateX: -75 }, { translateY: -75 }],
    },

    logo_inside: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5, 
        borderColor: "#000000", 
        backgroundColor: "#eab308",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.logo_background}>
        <View style={styles.logo_inside}>
          <PlayIcon size={50} color="#000000" style={{}} />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
