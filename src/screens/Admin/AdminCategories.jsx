import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import CategoryCard from "../../components/CategoryCard";
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addCategory, deleteCategory } from "../../../redux/actions/otherAction";
import { useMessageAndErrorOther, useSetCategories } from "../../../utils/hooks";
import Footer from "../../components/Footer";



const AdminCategories = ({ navigation}) => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useSetCategories(setCategories, isFocused);

  const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const submitHandler = () => {
    dispatch(addCategory(category));
  };
  return (
    <>
    <View style={{ marginTop: 20, backgroundColor: COLORS.white }}>
      <View
        style={{
          marginBottom: 20,
          paddingTop: 70,
        }}
      >
        {/* <Text style={styles.heading}> Categories </Text> */}
      </View>

      <ScrollView
        style={{
          marginBottom: 20,
       
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 20,
            minHeight: 400,
          }}
        >
          {categories?.map((i) => (
            <CategoryCard
              name={i.category}
              id={i._id}
              key={i._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TextInput
          mode={"outlined"}
          activeOutlineColor={COLORS.secondary}
          placeholder="Category"
          value={category}
          //   keyboardType="email-address"
          onChangeText={setCategory}
        />
        <Button
          disabled={!category}
          style={{
            backgroundColor: COLORS.secondary,
            margin: 20,
            padding: 6,
          }}
          loading={loading}
          textColor={COLORS.white}
          onPress={submitHandler}
        >
          Add
        </Button>
      </View>
    </View>
    <Footer />
    </>
  );
};

export default AdminCategories;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 10,
    backgroundColor: COLORS.grey,
    marginHorizontal : 16
  },
});
