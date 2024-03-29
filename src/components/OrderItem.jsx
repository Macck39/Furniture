import { View, Text, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import { Button } from "react-native-paper";

const OrderItem = ({
  id,
  price,
  address,
  orderedOn,
  status,
  paymentMethod,
  updateHandler,
  admin = false,
  loading,
  i = 0,
}) => {

  // console.log("loading in order item", loading)
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: i % 2 === 0 ? COLORS.secondary : COLORS.primary,
      }}
    >
      <Text
        style={{
          ...styles.text,
          backgroundColor: i % 2 === 0 ? COLORS.primary : COLORS.secondary,
        }}
      >
        {id}
      </Text>

      <TextBox title={"address"} value={address} i={i} />
      <TextBox title={"Ordered On"} value={orderedOn} i={i} />
      <TextBox title={"price"} value={price} i={i} />
      <TextBox title={"Status"} value={status} i={i} />
      <TextBox title={"Payment Method"} value={paymentMethod} i={i} />

      {admin && (
        <Button icon={"update"}  mode={"outlined"} textColor={i % 2 === 0 ? COLORS.white : COLORS.white} style={{
            width : 120,
            alignSelf : "center",
            marginTop : 10,
        }}
        onPress={()=> updateHandler(id)}
        // disabled={loading}
        >
          update
        </Button>
      )}
    </View>
  );
};

export default OrderItem;

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? COLORS.white : COLORS.white,
    }}
  >
    <Text style={{ fontWeight: "900" }}>{title}</Text>
    {title === "price" ? " $ " : ""}
    {" " + value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    Padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    elevation: 5,
    padding: 10,
    // marginBottom : 20,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});