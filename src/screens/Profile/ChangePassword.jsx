import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../redux/actions/otherAction";
import { useMessageAndErrorOther } from "../../../utils/hooks";
import Footer from "../../components/Footer";

// import { updatePassword } from "../redux/actions/otherAction";
// import { useMessageAndErrorOther } from "../utils/hooks";


const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useMessageAndErrorOther(dispatch);

  const oldPasswordHandler = (text) => {
    setOldPassword(text);
  };
  const newPasswordHandler = (text) => {
    setNewPassword(text);
  };

  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword))
    // console.log("password changed!", oldPassword, newPassword);
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <>
      <View style={{ paddingTop: 40, paddingHorizontal: 16 }}>
        <View style={style.container}>
          <TextInput
            mode={"outlined"}
            activeOutlineColor={COLORS.secondary}
            placeholder=" Old Password"
            value={oldPassword}
            onChangeText={oldPasswordHandler}
            secureTextEntry={true}
            style={{ marginVertical: 13 }}
          />
          <TextInput
            mode={"outlined"}
            activeOutlineColor={COLORS.secondary}
            placeholder="New Password"
            value={newPassword}
            onChangeText={newPasswordHandler}
            secureTextEntry={true}
            style={{ marginVertical: 13 }}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgetpassword")}
          >
            <Text style={style.forget}>Forgot Password</Text>
          </TouchableOpacity>

          <Button
            disabled={oldPassword === "" || newPassword === ""}
            textColor={COLORS.white}
            style={style.btn}
            onPress={submitHandler}
            loading={loading}
          >
            Change
          </Button>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default ChangePassword;

const style = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 8,
  },
  forget: {
    color: COLORS.black,
    marginVertical: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
    fontWeight: "100",
  },
  btn: {
    backgroundColor: COLORS.secondary,
    margin: 20,
    padding: 6,
  },
  or: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: COLORS.grey,
  },
  link: {
    alignSelf: "center",
    color: COLORS.black,
    fontSize: 18,
    textTransform: "uppercase",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
