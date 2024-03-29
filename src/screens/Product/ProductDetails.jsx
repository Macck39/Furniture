import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import COLORS from "../../constants/colors";
import { Avatar, Button, Card } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getProductDetails } from "../../../redux/actions/productAction";
// import { getProductDetails } from "../redux/actions/productAction";
import Footer from "../../components/Footer";

const ProductDetails = ({ navigation, route: { params } }) => {
  // console.log("jhcsdcn", params.id)
  const [quantity, setQuantity] = useState(1);
  // const {
  //   product: { name, price, stock, description, images },
  // } = useSelector((state) => state.product);
  const { product } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const incQuantity = () => {
    if (product?.stock <= quantity) return;
    setQuantity((prev) => prev + 1);
  };
  const decQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };


  const addToCartHandler = () => {
    if (product?.stock === 0)
      return Toast.show({
        type: "error",
        text1: "Out Of Stock",
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: params.id,
        name:product?.name,
        price:product?.price,
        image: product?.images[0]?.url,
        stock:product?.stock,
        quantity,
      },
    });
    Toast.show({
      type: "success",
      text1: "Added To Cart",
    });
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, isFocused]);

  if (!product) {
    return <View />;
  }

  return (
    <>

      <ScrollView style={{ paddingTop: 30, paddingHorizontal: 15 }}>
        {/* Images in horizontal scrolling  */}
        <Card>
          <Card.Cover
            source={{
              uri: product?.images[0]?.url,
            }}
            style={{
              height: 300,
              width: "100%",
              resizeMode: "contain",
            }}
          />
        </Card>

        <View
          style={{
            padding: 30,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 25,
              }}
            >
              {product?.name}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 25,
                fontWeight: "600",
                color: COLORS.secondary,
              }}
            >
              Rs.{product?.price}
            </Text>
          </View>
          <Text
            numberOfLines={10}
            style={{
              letterSpacing: 1,
              lineHeight: 20,
              marginVertical: 15,
            }}
          >
            {product?.description}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                fontWeight: "100",
              }}
            >
              Quantity
            </Text>

            <View
              style={{
                width: 80,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={decQuantity}>
                <Avatar.Icon
                  style={{
                    borderRadius: 5,
                    backgroundColor: COLORS.secondary,
                    height: 25,
                    width: 25,
                  }}
                  color="white"
                  icon={"minus"}
                  size={20}
                />
              </TouchableOpacity>
              <Text
                style={{
                  backgroundColor: COLORS.secondary,
                  height: 25,
                  width: 25,
                  textAlignVertical: "center",
                  textAlign: "center",
                  borderWidth: 1,
                  borderRadius: 5,
                  color: "white",
                  borderColor: COLORS.secondary,
                }}
              >
                {quantity}
              </Text>

              <TouchableOpacity onPress={incQuantity}>
                <Avatar.Icon
                  style={{
                    borderRadius: 5,
                    backgroundColor: COLORS.secondary,
                    height: 25,
                    width: 25,
                  }}
                  icon={"plus"}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={addToCartHandler}>
            <Button icon={"cart"} style={style.btn} textColor={COLORS.white}>
              {" "}
              Add To Cart{" "}
            </Button>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </>
  );
};

const style = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});

export default ProductDetails;
