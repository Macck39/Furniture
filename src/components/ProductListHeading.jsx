
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import COLORS from "../constants/colors";

const ProductListHeading = () => {
  return (
    
    <View style={styles.container}>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
        <Text style={styles.text}>Image</Text>
        <Text style={styles.text}>Price</Text>
        <Text style={styles.text}>Name</Text>
        <Text style={styles.text}>Category</Text>
        <Text style={styles.text}>Stock</Text>
      {/* </ScrollView> */}
    </View>
   
  );
};

export default ProductListHeading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  text: {
    width: 40,
    color: COLORS.white,
    fontWeight: "900",
  },
});