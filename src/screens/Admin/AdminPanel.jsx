import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import COLORS from "../../constants/colors";
import Loader from "../../components/Loader";
import ButtonBox from "../../components/ButtonBox";
import ProductListHeading from "../../components/ProductListHeading";
// import { products } from "../Home";
import Chart from "../../components/Chart";
import ProductListItem from "../../components/ProductListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../../redux/actions/productAction";
import { useIsFocused } from "@react-navigation/native";
import { useAdminProducts, useMessageAndErrorOther } from "../../../utils/hooks";
import Footer from "../../components/Footer";
import { deleteProduct } from "../../../redux/actions/otherAction";

const AdminPanel = ({ navigation }) => {
  // const loading = false;
  // // console.log("navigation", navigation)
  // const inStock = 2;
  // const outOfStock = 10;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { loading, products, inStock, outOfStock } = useAdminProducts(
    dispatch,
    isFocused
  );

  // console.log("products in admin", products)






  const navigationHandler = (text) => {

    switch (text) {
      case "Category":
        navigation.navigate('AdminCategories')
        break;
      case "All Orders":
        navigation.navigate('AdminOrders')
        break;
      case "Product":
        navigation.navigate('NewProduct')
        break;

      default:
        navigation.navigate('AdminOrders')
        break;
    }
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const loadingDelete = useMessageAndErrorOther(
    dispatch,
    null,
    null,
    getAdminProducts
  );

  return (
    <>
      <View
        style={{
          paddingTop: 10, paddingHorizontal: 12,marginBottom:50
        }}
      >


        {loading ? (
          <Loader />
        ) : (
          <>
            <View
              style={{
                backgroundColor: COLORS.secondary,
                borderRadius: 20,
                alignItems: "center",

              }}
            >
              <Chart inStock={inStock} outOfStock={outOfStock} />
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  icon={"plus"}
                  text={"Product"}
                  handler={navigationHandler}
                />
                <ButtonBox
                  icon={"format-list-bulleted-square"}
                  text={"All Orders"}
                  handler={navigationHandler}
                  reverse={true}
                />
                <ButtonBox
                  icon={"format-list-bulleted-square"}
                  text={"Category"}
                  handler={navigationHandler}
                />
              </View>
            </View>

            <ProductListHeading />
            <ScrollView
              style={{
                backgroundColor: COLORS.grey,
                marginBottom: 50,
              }}
              // showsVerticalScrollIndicator={false}
              >
              <View>
                {
                  !loadingDelete &&
                  products?.map((item, index) => (
                    <ProductListItem
                      navigate={navigation}
                      deletehandler={deleteProductHandler}
                      key={item._id}
                      i={index}
                      id={item._id}
                      price={item.price}
                      stock={item.stock}
                      name={item.name}
                      category={item.category?.category}
                      //   imgSrc={item.images[0].url}
                      imgSrc={item.images[0]?.url}
                    />

                  ))}
              </View>
            </ScrollView>
          </>
        )}
      </View>
      <Footer />
    </>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({

});