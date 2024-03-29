import { View, Text, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import Footer from "../../components/Footer";
const OtpVarify = ({ navigation }) => {

    const newpasswordhandler = ()=> {
        navigation.navigate("NewPassword");
        
    }
  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ marginBottom: 12, marginTop: 30, paddingHorizontal : 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}
        >
          Verify OTP
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
            placeholder="Enter OTP"
            placeholderTextColor={COLORS.black}
            // keyboardType="n"
            style={{
              width: "100%",
            }}
          />
        </View>

        <Button
          onPress={newpasswordhandler}
          title="Verify OTP"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
      </View>
    </SafeAreaView>
    <Footer />
    </>
  );
};

export default OtpVarify;
