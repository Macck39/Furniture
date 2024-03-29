import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";
import { Headline } from "react-native-paper";
import OrderItem from "../../components/OrderItem";
import Loader from "../../components/Loader";
import { useIsFocused } from "@react-navigation/native";
// import { useGetOrders } from '../'
import { useGetOrders } from "../../../utils/hooks";
import Footer from "../../components/Footer";




const AlOrders = () => {
  const isFocused = useIsFocused();
  const { loading, orders } = useGetOrders(isFocused);

  // console.log("all orders...", orders)

  return (
    <>
    <View
      style={{
  
        backgroundColor: COLORS.white,
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            paddingTop: 30,
            paddingHorizontal : 16
            // flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  orderedOn={item.createdAt?.split('T')[0]}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country}, ${item.shippingInfo.pincode}`}
                //   admin={true}
                //   loading={false}
                />
              ))
            ) : (
              <Headline style={{ textAlign: "center" }}>
                No Orders yet!
              </Headline>
            )}
          </ScrollView>
        </View>
      )}
    </View>
    <Footer />
    </>
  );
};

export default AlOrders;

const styles = StyleSheet.create({

});