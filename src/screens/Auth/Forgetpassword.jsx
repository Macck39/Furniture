import { View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import Button from '../../components/Button';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../constants/colors';
import Footer from '../../components/Footer';

const Forgetpassword = ({ navigation }) => {


  const otpHandler = ()=>{
    navigation.navigate("OtpVarify")

}
  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                
            <View style={{ marginVertical : 30}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Mobile Number
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="+91"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "12%",
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: "100%",
              }}
            />

            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "80%",
              }}
            />
          </View>
        </View>
                <Button
                onPress={otpHandler}
                    title="Forget Password"
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
  )
}

export default Forgetpassword