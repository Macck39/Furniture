

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import { Avatar } from "react-native-paper";

const CategoryCard = ({ name, id , deleteHandler}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{name}</Text>
      <TouchableOpacity onPress={()=> deleteHandler(id)}>
        <Avatar.Icon icon={"delete"} color={COLORS.tomato} size={30} style={{
            backgroundColor : COLORS.white,
        }} />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.secondary,
    elevation: 5,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});