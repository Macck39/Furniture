import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import COLORS from "../../constants/colors";
  import { Avatar, Button, TextInput } from "react-native-paper";

  import { useDispatch, useSelector } from "react-redux";
  import { update_Profile } from "../../../redux/actions/otherAction";
  import { useMessageAndErrorOther } from "../../../utils/hooks";
  import Footer from "../../components/Footer";

  // import { updateProfile } from "../redux/actions/otherAction";
  // import { useMessageAndErrorOther } from "../utils/hooks";
  

  
  const defaultImg =
    "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png";
  
  const UpdateProfile = ({ navigation }) => {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = useState(user?.name ?  user?.name : "");
    const [email, setEmail] = useState(user?.email);
    const [address, setAddress] = useState(user?.address ? user?.address : "");
    const [city, setCity] = useState(user?.city ? user?.city :  '');
    const [country, setCountry] = useState(user?.country ? user?.country : "");
    const [pinCode, setPinCode] = useState(user?.pinCode?.toString() ? user?.pinCode?.toString() : "");
  

  
    // console.log("user is", user)
  
    const dispatch = useDispatch();

    const loading = useMessageAndErrorOther(dispatch, navigation, "Profile");
  
    const submitHandler = () => {
      dispatch(update_Profile(name, email, address, city, country, pinCode));
      // console.log("in profile",name, email, address, city, country, pinCode)
    };
  
  
    const disableBtn = !name || !email || !address ||!city || !country || !pinCode;
  
    return (
      <>
        <View style={{ paddingTop: 40, paddingHorizontal : 16 }}>
           
      
          <ScrollView  showsVerticalScrollIndicator={false}>
           
          <View style={style.container} >
  
              {/* input boxes  */}
              <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="Name"
                value={name}
                // keyboardType="email-address"
                onChangeText={setName}
                style={{ marginVertical : 13}}
              />
              <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="Email"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
                style={{ marginVertical : 13}}
              />
           
              <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                style={{ marginVertical : 13}}
              />
                <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="City"
                value={city}
                onChangeText={setCity}
                style={{ marginVertical : 13}}
              />
                <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
                style={{ marginVertical : 13}}
              />
                <TextInput
                mode={"outlined"}
                activeOutlineColor={COLORS.secondary}
                placeholder="Pin Code"
                value={pinCode}
                onChangeText={setPinCode}
                style={{ marginVertical : 13}}
              />
  
              <Button
                disabled={disableBtn}
                textColor={COLORS.white}
                style={style.btn}
                onPress={submitHandler}
                loading={loading}
                
               
              >
               update
              </Button>
              </View>
              </ScrollView>
            </View>

            <Footer />
         
       
       
      </>
    );
  };
  
  export default UpdateProfile;
  
  const style = StyleSheet.create({
   
    container: {
    //   flex: 1,
      padding: 20,
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      justifyContent: "center",
      elevation: 8,
    },
    forget: {
      color: COLORS.tomato,
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
      color: COLORS.primary,
      fontSize: 18,
      textTransform: "uppercase",
      marginVertical: 10,
      marginHorizontal: 20,
    },
  });
  