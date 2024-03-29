
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import { Avatar } from "react-native-paper";

const ButtonBox = ({
  icon,
  text,
  handler,
  reverse = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
    activeOpacity={0.9}
      style={{
        backgroundColor: reverse ? COLORS.tomato : COLORS.secondary,
        height: 80,
        width: 80,
        borderRadius: 20,
        alignItems: "center",
      }}
      onPress={() => handler(text)}
      disabled={loading}
    >
      <Avatar.Icon
        size={50}
        color={COLORS.white}
        icon={icon}
        style={{ backgroundColor: reverse ? COLORS.tomato : COLORS.secondary }}
      />
      <Text style={{
        color : COLORS.white,
        textAlign : "center"
      }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBox;