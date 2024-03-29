

import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../../constants/colors";
import Loader from "../../components/Loader";
import { Button, TextInput, Avatar } from "react-native-paper";
import SelectComponent from "../../components/SelectComponent";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import { createProduct } from "../../../redux/actions/otherAction";
import { useSetCategories, useMessageAndErrorOther } from "../../../utils/hooks";
import Footer from "../../components/Footer";





const NewProduct = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // console.log(route.params)
  const [image, setImage] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Choose Category");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
 
  useSetCategories(setCategories, isFocused);

  // console.log("route in new product", route)

  const disableBtnCondition =
    !name || !description || !price || !stock || !image;

    const submitHandler = () => {
      const myForm = new FormData();
      myForm.append("name", name);
      myForm.append("description", description);
      myForm.append("price", price);
      myForm.append("stock", stock);
      myForm.append("file", {
        uri: image,
        type: mime.getType(image),
        name: image.split("/").pop(),
      });
  
      if (categoryID) myForm.append("category", categoryID);
  
      dispatch(createProduct(myForm));
    };

    const loading = useMessageAndErrorOther(dispatch, navigation, "AdminPanel");

    useEffect(() => {
      if (route.params?.image) setImage(route.params.image);
    }, [route.params]);
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
               <Avatar.Image
                size={80}
                style={{
                  backgroundColor: COLORS.grey,
                }}
                source={{
                  uri: image ? image : null,
                }}
              />
              <Button
                onPress={() =>
                  navigation.navigate("CameraComponent", {
                 NewProduct : true
                  })
                }
                textColor={COLORS.primary}
              >
                Add Images
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
                loading={loading}
                disabled={disableBtnCondition || loading}
              >
                Add Product
              </Button>
            </View>
          </ScrollView>
        
      </View>

      <SelectComponent
        visible={visible}
        setVisible={setVisible}
        setCategory={setCategory}
        setCategoryID={setCategoryID}
        categories={categories}
      />

      <Footer/>
    </>
  );
};

export default NewProduct;

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