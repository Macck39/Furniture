import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../../constants/colors";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../../components/ButtonBox";
import Loader from "../../components/Loader";
import { loadUser, logout } from "../../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorOther, useMessageAndErrorUser } from "../../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
// import mime from "mime";
// import { updatePic } from "../redux/actions/otherAction";
import Footer from "../../components/Footer";


// const user = {
//   name: "Ram Kumar",
//   email: "sample@gmail.com",
// };

const defaultImg =
  "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png";

const Profile = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState(defaultImg);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const loading = useMessageAndErrorUser(navigation, dispatch, "Login");
  const { user } = useSelector((state) => state.user);
  // console.log("role", user?.role)

  // console.log("hshdfkjsdhkdjk,d nd,s",route.params.image)

  // useEffect(() => {
  //   if (route.params?.image) {
  //     setAvatar(route.params.image);
  //   }

  // }, [route.params]);

  // const loading = false;
  const logoutHandler = () => {
    dispatch(logout());
  };

  const loadingPic = useMessageAndErrorOther(dispatch, null, null, loadUser);

  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params.image);
      // dispatch updatePic Here
      const myForm = new FormData();
      myForm.append("file", {
        uri: route.params.image,
        type: mime.getType(route.params.image),
        name: route.params.image.split("/").pop(),
      });
      dispatch(updatePic(myForm));
    }

    dispatch(loadUser());
  }, [route.params, dispatch, isFocused]);

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar.url);
    }
  }, [user]);

  const navigateHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("AdminPanel");
        break;
      case "Orders":
        navigation.navigate("AllOrders");
        break;
      case "Profile":
        navigation.navigate("UpdateProfile");
        break;
      case "Password":
        navigation.navigate("ChangePassword");
        break;
      case "Log Out":
        logoutHandler();
        break;
      default:
      case "Orders":
        navigation.navigate("AllOrders");
        break;
    }
  };
  return (
    <>
      <View style={{ paddingTop: 50, paddingHorizontal: 16 }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View style={style.container}>
              <Avatar.Image
                source={{
                  uri: avatar,
                }}
                size={100}
                style={{
                  backgroundColor: COLORS.white,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CameraComponent", {
                    updateProfile: true,
                  })
                }
              >
                <Button textColor={COLORS.grey}> Change Photo </Button>
              </TouchableOpacity>

              <Text style={style.name}>{user?.name}</Text>
              <Text
                style={{
                  fontWeight: "300",
                  color: COLORS.white,
                }}
              >
                {user?.email}
              </Text>
            </View>

            <View style={{ marginTop: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-evenly",
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Orders"}
                  icon={"format-list-bulleted-square"}
                />

                {user?.role === "admin" && (
                  <ButtonBox
                    handler={navigateHandler}
                    icon={"view-dashboard"}
                    text={"Admin"}
                    reverse={true}
                  />
                )}
                <ButtonBox
                  handler={navigateHandler}
                  text={"Profile"}
                  icon={"pencil"}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-evenly",
                }}
              >
                <ButtonBox
                  handler={navigateHandler}
                  text={"Password"}
                  icon={"pencil"}
                />
                <ButtonBox
                  handler={navigateHandler}
                  text={"Log Out"}
                  icon={"exit-to-app"}
                />
              </View>
            </View>
          </>
        )}
      </View>
      <Footer />
    </>
  );
};

export default Profile;
const style = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: COLORS.primary,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: COLORS.white,
  },
});
