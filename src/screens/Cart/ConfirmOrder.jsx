import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState} from "react";
import COLORS from "../../constants/colors";
import { cartItems } from "./Cart";
import ConfirmOrderItem from "../../components/ConfirmOrderItem";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";

const ConfirmOrder = () => {

    const navigate = useNavigation();

    const { cartItems } = useSelector((state) => state.cart);

  const [itemsPrice] = useState(
    cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
  );
  const [shippingCharges] = useState(itemsPrice > 10000 ? 0 : 200);
  const [tax] = useState(Number((0.18 * itemsPrice).toFixed()));
  const [totalAmount] = useState(itemsPrice + shippingCharges + tax);

  return (
    <>
    <View style={{ paddingTop : 36, paddingHorizontal : 20}}>
    

      <View
        style={{
          paddingVertical: 20,
        //   flex: 1,
        }}
      >
        <ScrollView>
          {cartItems.map((i, index) => (
            <ConfirmOrderItem
              key={i.product}
              image={i.image}
              name={i.name}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </ScrollView>
      </View>
      <PriceTag heading="Subtotal" value={itemsPrice} />
      <PriceTag heading="Shipping" value={shippingCharges} />
      <PriceTag heading="Tax" value={tax} />
      <PriceTag heading="Subtotal" value={totalAmount} />

      <TouchableOpacity onPress={()=> navigate.navigate('Payment', { itemsPrice, shippingCharges, tax, totalAmount})}>
        <Button textColor={COLORS.white} icon={'chevron-right'} style={{
            backgroundColor : COLORS.secondary,
            borderRadius : 100,
            padding : 5,
            margin : 10,
            
        }}> Payment </Button>
      </TouchableOpacity>

     
    </View> 
    <Footer />
    </>
  );
};

const PriceTag = ({ heading, value})=>{
    return (
        <View style={{
            flexDirection : "row",
            justifyContent : 'space-between',
            alignItems : "center",
            marginVertical : 5,
        }}>
            <Text style={{ fontWeight : "800"}}>{heading}</Text>
            <Text style={{ color: COLORS.secondary}}>${value}</Text>

        </View>
    )
}

export default ConfirmOrder;