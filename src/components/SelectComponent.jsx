

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React from "react";
  import { Avatar, Headline } from "react-native-paper";
  import COLORS from "../constants/colors";
  
  const SelectComponent = ({
    visible,
    setVisible,
    setCategory,
    setCategoryID,
    categories =[],
  }) => {
    const selectCategoryHandler = (item) => {
  
      // console.log(item)
      setCategory(item.category);
      setCategoryID(item._id);
      setVisible(false)
    };
    return (
      visible && (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Avatar.Icon
              style={{
                alignSelf: "flex-end",
                backgroundColor: COLORS.black,
              }}
              size={30}
              icon={"close"}
            />
          </TouchableOpacity>
  
          <Headline style={{ color : COLORS.white}}>Select a Category</Headline>
          <ScrollView>
            {categories?.map((i) => (
              <Text key={i._id} style={styles.text} onPress={() => selectCategoryHandler(i)}>
                {i.category}
              </Text>
            ))}
          </ScrollView>
        </View>
      )
    );
  };
  
  export default SelectComponent;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.secondary,
      position: "absolute",
      padding: 35,
      borderRadius: 20,
      width: "90%",
      height: "90%",
      alignSelf: "center",
      elevation: 5,
      top: 50,
    },
   
    text: {
      fontSize: 17,
      fontWeight: "100",
      textTransform: "uppercase",
      marginVertical: 10,
      backgroundColor : COLORS.primary,
      paddingHorizontal : 12,
      paddingVertical : 5,
      color : COLORS.white
    },
  });