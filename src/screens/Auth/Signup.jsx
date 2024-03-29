import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState , useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorUser } from "../../../utils/hooks";
import { register } from "../../../redux/actions/userAction";
import Footer from "../../components/Footer";
import Toast from 'react-native-toast-message';

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState(null);
  const { loading, message, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  // const loading = useMessageAndErrorUser(navigation, dispatch, "Login");

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      navigation.replace("Login")
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({
        type: "clearMessage",
      });
      // dispatch(loadUser());
    }

  }, [error, message, dispatch]);

  const emailChangeHandler = (text) => {
    setEmail(text);
  };
  const mobileChangeHandler = (text) => {
    setMobile(text);
  };

  const passwordHnadler = (text) => {
    setPassword(text);
  };

  const submitHandler = () => {
    const signUpObj = { email, password, mobile}

    dispatch(register(signUpObj));
  };

  console.log("testing in sign up screen...")

  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Connect with your friend today!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Email address
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
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              onChangeText={emailChangeHandler}
              style={{
                width: "100%",
              }}
            />
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
              onChangeText={mobileChangeHandler}
              style={{
                width: "80%",
              }}
            />
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
            Password
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
              onChangeText={passwordHnadler}
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

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>I aggree to the terms and conditions</Text>
        </View>

        {/* <Button
          title="Sign Up"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        /> */}
        <Button onPress={submitHandler}    loading={loading}
          disabled={email === "" || password === "" || mobile === ""}>Sign Up</Button>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
          <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Already have an account
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
    <Footer />
    </>
  );
};

export default Signup;
