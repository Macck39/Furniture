

import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../../constants/colors";
import Loader from "../../components/Loader";
import { Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/SelectComponent";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorOther, useSetCategories } from "../../../utils/hooks";
import { getProductDetails } from "../../../redux/actions/productAction";
import { updateProduct } from "../../../redux/actions/otherAction";
import Footer from "../../components/Footer";



const UpdateProduct = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // console.log("id from route", route.params);

  const { product, loading } = useSelector((state) => state.product);
  // console.log(route.params)
  const [id] = useState(route.params.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Laptop");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  // const loadingOther = false;


  useSetCategories(setCategories, isFocused);

  const submitHandler = () => {
    dispatch(updateProduct(id, name, description, price, stock, categoryID));
  };

  const loadingOther = useMessageAndErrorOther(
    dispatch,
    navigation,
    "AdminPanel"
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, isFocused]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setCategory(product.category?.category);
      setCategoryID(product.category?._id);
    }
  }, [product]);

 
  return (
    <>
      <View
        style={{
          paddingTop : 20,
          paddingHorizontal : 16
        }}
      >
        <View
          style={{
            marginBottom: 20,
            paddingTop: 70,
          }}
        >
          {/* <Text style={styles.heading}> Update Product </Text> */}
        </View>

        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              elevation: 10,
              padding: 20,
              backgroundColor: COLORS.secondary,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                height: 650,
                // backgroundColor : colors.
              }}
            >
              <Button
                onPress={() =>
                  navigation.navigate("ProductImages", {
                    id,
                    images: product.images,
                  })
                }
                textColor={COLORS.primary}
              >
                Manage Images
              </Button>

              <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{ marginVertical : 8}}

              />
              <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={{ marginVertical : 8}}
              />
              <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="Price"
                // keyboardType="numeric-pad"
                value={price}
                onChangeText={setPrice}
                style={{ marginVertical : 8}}
              />
              <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="Stock"
                value={stock}
                // keyboardType="numeric-pad"
                onChangeText={setStock}
                style={{ marginVertical : 8}}
              />

              <Text
                style={styles.inputStyling}
                onPress={() => setVisible(true)}
              >
                {category}
              </Text>

              <Button
                textColor={COLORS.white}
                style={{
                  backgroundColor: COLORS.secondary,
                  margin: 20,
                  padding: 6,
                }}
                onPress={submitHandler}
                loading={loadingOther}
                disabled={loadingOther}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>

      <SelectComponent
        visible={visible}
        setVisible={setVisible}
        setCategory={setCategory}
        setCategoryID={setCategoryID}
        categories={categories}
      />

      <Footer />
    </>
  );
};

export default UpdateProduct;

const styles = StyleSheet.create({
  inputStyling: {
    height: 50,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    // marginHorizontal: 20,
    textAlign: "center",
    borderRadius: 3,
    textAlignVertical: "center",
  },
});