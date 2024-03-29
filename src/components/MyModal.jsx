import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";
import { Avatar, Button } from "react-native-paper";

const MyModal = ({ id, setOpenConfirmModal, deletehandler, setOpenModal, navigate }) => {


  return (
    <View>
      <View style={styles.container}>

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            right: 10,

          }}
          onPress={() => setOpenModal(false)}
        >
          <Avatar.Icon
            icon={"close"}
            size={30}
            style={{
              backgroundColor: COLORS.black,
            }}
          />
        </TouchableOpacity>


        <TouchableOpacity
          style={{
            borderColor: COLORS.black,
            backgroundColor:"#2196F3",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 5,
            height: 42,
            width: 100,
            marginBottom: 2,
            marginRight:15,
            paddingTop: 8,
          }}
          onPress={() => navigate.navigate("UpdateProduct", { id })}
        >
          <Text style={styles.text}>Edit</Text>
        </TouchableOpacity>
        <Button
          style={{
            backgroundColor:"red",
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 5,
            // padding: 2,
            // height: 30,
            width: 100,
          }}
          textColor="white"
          onPress={() => setOpenConfirmModal((prev) => !prev)}>

          Delete
        </Button>
      </View>
    </View>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 75,
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: "sapce-between",
    alignItems: "center",
    zIndex: 99,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    position: "relative",
    elevation: 12,
  },
  text: {
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },

});
