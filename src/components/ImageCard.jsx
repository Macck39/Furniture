
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import { Avatar } from "react-native-paper";

const ImageCard = ({ src, id, deleteHandler }) => {
  return (
    <View style={styles.container}>
      <Image style={{
        width : "100%",
        height : "70%",
        resizeMode : "contain"
      }} source ={{
        uri : src
      }} />
      <TouchableOpacity onPress={()=> deleteHandler(id)}>
        <Avatar.Icon size={30} icon={"delete"} color={COLORS.tomato} style={{
          backgroundColor : COLORS.grey
        }} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    elevation: 5,
    margin: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    height: 200,
  },
});