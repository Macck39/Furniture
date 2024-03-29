import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import COLORS from "../constants/colors";

const Loader = () => {
  return (
    <ActivityIndicator
      style={{
        top: "50%",
        position: "absolute",
        alignSelf: "center",
      }}
      size={100}
      color={COLORS.secondary}
    />
  );
};

export default Loader;