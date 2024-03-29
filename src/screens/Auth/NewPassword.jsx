import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../components/Footer";

const NewPassword = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const changePasswordHandler = () => {
    navigation.navigate("Login");
  };
  return (
    <>
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 30,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}
        >
          New Password
        </Text>

        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
          }}
        >
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={COLORS.black}
            secureTextEntry={isPasswordShown}
            style={{
              width: "100%",
            }}
          />

          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)}
            style={{
              position: "absolute",
              right: 12,
            }}
          >
            {isPasswordShown == true ? (
              <Ionicons name="eye-off" size={24} color={COLORS.black} />
            ) : (
              <Ionicons name="eye" size={24} color={COLORS.black} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}
        >
          Confirm Password
        </Text>

        <View
          style={{
            width: "100%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
          }}
        >
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={COLORS.black}
            secureTextEntry={isPasswordShown}
            style={{
              width: "100%",
            }}
          />

          <TouchableOpacity
            onPress={() => setIsPasswordShown(!isPasswordShown)}
            style={{
              position: "absolute",
              right: 12,
            }}
          >
            {isPasswordShown == true ? (
              <Ionicons name="eye-off" size={24} color={COLORS.black} />
            ) : (
              <Ionicons name="eye" size={24} color={COLORS.black} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Button
        onPress={changePasswordHandler}
        title="Login"
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
      />
    </SafeAreaView>
    <Footer />
    </>
  );
};

export default NewPassword;
