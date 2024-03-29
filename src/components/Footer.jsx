import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { Badge } from "react-native-paper";

const Footer = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const homePageNavigator = () => {
    navigation.navigate("Home");
  };
  const categoriesPageNavigator = () => {
    navigation.navigate("Categories");
  };
  const cartPageNavigator = () => {
    navigation.navigate("Cart");
  };
  const profilePageNavigator = () => {
    navigation.navigate("Profile");
  };
  const authPageNavigator = () => {
    navigation.navigate("Login");
  };
  return (
    <View
      style={{
        // flex: 1,
        flexDirection : 'row',
        justifyContent: "flex-end",
        // marginBottom: 10,
        paddingHorizontal: 10,
        marginTop:10,
        backgroundColor : COLORS.white,
        position : "absolute",
        bottom : 0,
        right : 1,
        zIndex : 999
      }}
    >
      <View style={styles.iconWrapper}>
        <Pressable onPress={homePageNavigator}>
          {/* <Text>HOME</Text> */}
          <AntDesign name="home" size={32} color={COLORS.secondary} />
        </Pressable>
        <Pressable onPress={categoriesPageNavigator}>
          <AntDesign name="appstore-o" size={32} color={COLORS.secondary} />
        </Pressable>
        <Pressable onPress={cartPageNavigator}>
          {/* <Text>CART</Text> */}
          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Badge>{cartItems.length}</Badge>
            </View>
          )}

          <AntDesign name="shoppingcart" size={32} color={COLORS.secondary} />
        </Pressable>
       
        {isAuthenticated ? (
          <Pressable onPress={profilePageNavigator}>
            {/* <Text>PROFILE</Text> */}
            {/* <Ionicons name="person-sharp" size={34} color={COLORS.secondary}/> */}
            <Octicons name="person" size={34} color={COLORS.secondary} />
          </Pressable>
        ) : (
          <Pressable onPress={authPageNavigator}>
            <AntDesign name="login" size={32} color={COLORS.secondary} />
            {/* <Text>AUTH</Text> */}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  iconWrapper: {
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    // position: "absolute",
    // bottom: 10,
    // right: 10,
    // zIndex: 99,
  },
  badge: {
    position: "absolute",
    top: -15,
    right: -10,
  },
});
