import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CartItem from "../../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Toast from 'react-native-toast-message';

const Cart = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const incrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity + 1;
    if (stock <= quantity)
      return Toast.show({
        type: "error",
        text1: "Maximum value added",
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };
  const decrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) return dispatch({ type: "removeFromCart", payload: id });

    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };

  return (
    <>
    <ScrollView style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
      <View
        style={{
          paddingVertical: 20,
          // flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.length > 0 ? (
            cartItems?.map((i, index) => (
              <CartItem
                key={i.product}
                id={i.product}
                name={i.name}
                stock={i.stock}
                amount={i.price}
                imgSrc={i.image}
                index={index}
                qty={i.quantity}
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                navigate={navigate}
              />
            ))
          ) : (
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              No Items Yet
            </Text>
          )}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}
      >
        <Text>{ cartItems.length} Items</Text>
        <Text>   ₹
          {cartItems.reduce(
            (prev, curr) => prev + curr.quantity * curr.price,
            0
          )}</Text>
      </View>

      <TouchableOpacity
        onPress={
          cartItems.length > 0 ? () => navigate.navigate("ConfirmOrder") : null
        }
      >
        <Button
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: 100,
            padding: 5,
            margin: 20,
          }}
          icon={"cart"}
          textColor={COLORS.white}
        >
          Checkout
        </Button>
      </TouchableOpacity>
    </ScrollView>
    <Footer />
    </>
  );
};

export default Cart;
