import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import { Button, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../../../utils/hooks";
import Toast from "react-native-toast-message";
import axios from "axios";
import Loader from "../../components/Loader";
import { server } from "../../../redux/store";
import Footer from "../../components/Footer";
const Payment = ({ route, navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loaderLoading, setLoaderLoading] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // const { isAuthenticated } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart);

  // console.log("user", user)

  if (user?.address) {
    Toast.show({
      type: "error",
      text1: "User Adderess is not added yet!",
      text2: "Please Add.",
    });
    navigation.navigate("Profile");
    return;
  }

  // console.log("isAuthenticated....", !isAuthenticated, user, cartItems)

  // if(isAuthenticated){
    const redirectToLogin = () => {
      navigation.navigate("Login");
    };
  // }
  const codHandler = (paymentInfo) => {
    const shippingInfo = {
      address: user?.address || "Pune",
      city: user?.city || "Pune",
      country: user?.country || "India",
      pinCode: user?.pinCode || 400011,
    };

    const itemsPrice = route.params.itemsPrice;
    const shippingCharges = route.params.shippingCharges;
    const taxPrice = route.params.tax;
    const totalAmount = route.params.totalAmount;


    dispatch(
      placeOrder(
        cartItems,
        shippingInfo,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        paymentInfo ? paymentInfo : "COD"
      )

    );

    Toast.show({ type: "success", text1: "Ordered Successfully!" });
  };

  const onlineHandler = () => {
    return Toast.show({
      type: "error",
      text1: "online payment systems not integrated yet!",
    });
    // console.log("online payment systems not integrated yet!")
  };

  const loading = useMessageAndErrorOther(
    dispatch,
    navigation,
    "Profile",
    () => ({
      type: "clearCart",
    })
  );
  return loaderLoading ? (
    <Loader />
  ) : (
    <>
    <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
      <View style={style.container}>
        <RadioButton.Group
          onValueChange={setPaymentMethod}
          value={paymentMethod}
        >
          <View style={style.radioStyle}>
            <Text style={style.radioStyleText}>Cash on Delivery</Text>
            <RadioButton color={COLORS.white} value={"COD"} />
          </View>
          <View style={style.radioStyle}>
            <Text style={style.radioStyleText}>Online</Text>
            <RadioButton color={COLORS.white} value={"ONLINE"} />
          </View>
        </RadioButton.Group>
      </View>

       <TouchableOpacity
        onPress={
          isAuthenticated === false
            ? redirectToLogin
            : paymentMethod === "COD"
            ? () => codHandler()
            : onlineHandler
        }
      >
        <Button
          icon={
            paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"
          }
          style={style.btn}
          textColor={COLORS.white}
        >
          {" "}
          {paymentMethod === "COD" ? "Place Order" : "Pay"}
        </Button>
      </TouchableOpacity> 
    </View>
    <Footer />
    </>
  );
};

export default Payment;

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    // flex: 1,
    justifyContent: "center",
  },

  radioStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  radioStyleText: {
    fontWeight: "600",
    fontSize: 18,
    textTransform: "uppercase",
    color: COLORS.white,
  },
  btn: {
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
    margin: 10,
    padding: 5,
  },
});
