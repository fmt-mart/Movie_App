import { View, Text, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import React from "react";

const { width, height } = Dimensions.get("window");
export default Loading = () => {
  return (
    <View
      style={{
        height,
        width,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
      }}
    >
      <Progress.CircleSnail thickness={12} size={200} color={"#eab308"} />
      <Text>Loading</Text>
    </View>
  );
};
