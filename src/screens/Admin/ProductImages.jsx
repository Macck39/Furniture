

import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState , useEffect} from "react";
import { Avatar, Button } from "react-native-paper";
import COLORS from "../../constants/colors";
import ImageCard from "../../components/ImageCard";
import { useDispatch } from "react-redux";
import mime from "mime";
import { useMessageAndErrorOther } from "../../../utils/hooks";
import { deleteProductImage, updateProductImage } from "../../../redux/actions/otherAction";
import Footer from "../../components/Footer";


const ProductImages = ({ navigation, route }) => {
  const [images] = useState(route.params.images);
  const [productId] = useState(route.params.id);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  // const loading = false;
  const dispatch = useDispatch();

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  const deleteHandler = (imageId) => {
    dispatch(deleteProductImage(productId, imageId));
  };

  const submitHandler = () => {
    const myForm = new FormData();

    myForm.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    }); 

    dispatch(updateProductImage(productId, myForm));
  };

  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params.image);
      setImageChanged(true);
    }
  }, [route.params]);




  return (
    <>
    <View
      style={{
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          marginBottom: 20,
        //   paddingTop: 70,
        }}
      >
        {/* <Text > Product Images </Text> */}
      </View>

      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 40,
            minHeight: 300,
          }}
        >
          {images.map((i) => (
            // _id = id of image not product
            <ImageCard
              key={i._id}
              src={i.url}
              id={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>


      <View
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}
      >
        <Image
          style={{
            backgroundColor: COLORS.grey,
            width: 100,
            height: 100,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={{ uri: image }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("CameraComponent", { UpdateProduct: true })
            }
          >
            <Avatar.Icon
              icon={"camera"}
              size={30}
              color={COLORS.primary}
              style={{
                backgroundColor: COLORS.grey,
                margin: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <Button style={{
            backgroundColor : COLORS.secondary,
            padding : 6

        }}
        textColor={COLORS.primary}
        loading={loading}
        onPress={submitHandler}
        disabled={!imageChanged}
        >Add</Button>
      </View>
    </View>
    <Footer />
    </>
  );
};

export default ProductImages;



