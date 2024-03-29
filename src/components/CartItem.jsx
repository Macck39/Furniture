import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import { Avatar } from "react-native-paper";

const CartItem = ({
  navigate,
  name,
  amount,
  qty,
  index,
  imgSrc,
  id,
  decrementHandler,
  incrementHandler,
  stock 
}) => {

  return (
    <View style={{ flexDirection : "row", alignItems : 'center', height : 100, marginVertical: 20}}>
        <View style={{ 
            width : "40%",
            borderTopRightRadius : 100,
            borderBottomRightRadius : 100,
            elevation : 1,
            paddingVertical : 12,
            paddingHorizontal : 14
            }}>
                <Image style={{
                    width : 100,
                    height: 60,
                    resizeMode :'contain',
                    // top: -20
                }} source={{
                    uri : imgSrc
                }} />

        </View>
        <View style={{
            width : "40%",
            paddingHorizontal : 25,

        }}>
            <Text onPress={()=> navigate.navigate('productdetails')} numberOfLines={1} style={{
                fontSize : 17,
                color : COLORS.black

            }}>{name}</Text>
            <Text numberOfLines={1} style={{
                fontSize : 17,
                fontWeight : "900",
                color : COLORS.secondary
                

            }}>Rs. {amount}</Text>

        </View>
        <View style={{
            alignItems : "center",
            width : "20%",
            height : 80,
            justifyContent : "space-between",
            alignSelf : "center"
        }}>
            <TouchableOpacity onPress={ ()=> decrementHandler(id, name, amount, imgSrc, stock, qty)}>
                <Avatar.Icon style={{
                    borderRadius : 5,
                    backgroundColor : COLORS.secondary,
                    height : 25,
                    width : 25
                }} icon={"minus"}  size={20}/>
            </TouchableOpacity>
            <Text
              style={{
                backgroundColor: COLORS.white,
                height: 25,
                width: 25,
                textAlignVertical: "center",
                textAlign: "center",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: COLORS.secondary,
              }}
            >
              {qty}
            </Text>
            <TouchableOpacity onPress={ ()=> incrementHandler(id, name, amount, imgSrc, stock, qty)}>
            {/* <TouchableOpacity onPress={ ()=> incrementHandler(id, qty, stock)}> */}
                <Avatar.Icon style={{
                    borderRadius : 5,
                    backgroundColor : COLORS.secondary,
                    height : 25,
                    width : 25
                }} icon={"plus"}  size={20}/>
            </TouchableOpacity>

        </View>
      <Text>CartItem</Text>
    </View>
  );
};

export default CartItem;