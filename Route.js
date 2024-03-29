import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from './src/screens/Auth/Welcome';
import Login from './src/screens/Auth/Login';
import Signup from './src/screens/Auth/Signup';
import Forgetpassword from './src/screens/Auth/Forgetpassword';
import Home from './src/screens/Home';
import ProductDetails from './src/screens/Product/ProductDetails';
import Toast from 'react-native-toast-message';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './src/screens/Cart/Cart';
import Profile from './src/screens/Profile/Profile';
import Categories from './src/screens/Categories/Categories'

import { Entypo } from '@expo/vector-icons';
import COLORS from './src/constants/colors';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Orders from './src/screens/Orders/Orders';
import ConfirmOrder from './src/screens/Cart/ConfirmOrder';
import Payment from './src/screens/Cart/Payment';
import OtpVarify from './src/screens/Auth/OtpVarify';
import NewPassword from './src/screens/Auth/NewPassword';
import UpdateProfile from './src/screens/Profile/UpdateProfile';
import ChangePassword from './src/screens/Profile/ChangePassword';
import AllOrders from './src/screens/Profile/AllOrders';
import AdminPanel from './src/screens/Admin/AdminPanel';
import AdminCategories from './src/screens/Admin/AdminCategories';
import AdminOrders from './src/screens/Admin/AdminOrders';
import UpdateProduct from './src/screens/Admin/UpdateProduct';
import NewProduct from './src/screens/Admin/NewProduct';
import ProductImages from './src/screens/Admin/ProductImages';
import Camera from './src/CameraComponent';
import CameraComponent from './src/CameraComponent';
import { useSelector } from 'react-redux';






const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
      // options={{
      //   headerShown: false
      // }}
      />
    </Stack.Navigator>
  )
}


const CartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Cart'
    >
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AllOrders"
        component={AllOrders}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AdminPanel"
        component={AdminPanel}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AdminCategories"
        component={AdminCategories}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AdminOrders"
        component={AdminOrders}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="NewProduct"
        component={NewProduct}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ProductImages"
        component={ProductImages}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CameraComponent"
        component={CameraComponent}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={Forgetpassword}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="OtpVarify"
        component={OtpVarify}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}




export default function Route() {
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user)



  return (


    <NavigationContainer>
      {/* <Tab.Navigator>
          <Tab.Screen name="HomeStack" component={HomeStack}
          listeners={({ navigation, route}) => ( { tabPress : ()=> navigation.navigate("HomeStack", { screen : "Home" })} )}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Entypo name="home" size={30} color={COLORS.secondary} />
              ),
              headerShown: false
            }}
          />
          <Tab.Screen name="CartStack" component={CartStack}
           listeners={({ navigation, route}) => ( { tabPress : ()=> navigation.navigate("HomeStack", { screen : "Cart" })} )}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="shopping-cart" size={24} color="black" />
              ),
              headerShown: false
            }}
          />


          {isAuthenticated ? (<Tab.Screen name="ProfileStack" component={ProfileStack}
           listeners={({ navigation, route}) => ( { tabPress : ()=> navigation.navigate("HomeStack", { screen : "Profile" })} )}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={24} color="black" />

              ),
              headerShown: false
            }}
          />) : (<Tab.Screen name="AuthStack" component={AuthStack}
          listeners={({ navigation, route}) => ( { tabPress : ()=> navigation.navigate("HomeStack", { screen : "Login" })} )}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="login" size={24} color="black" />

              ),
              headerShown: false
            }}
          />)}
        </Tab.Navigator> */}

      <Stack.Navigator>
        <Stack.Screen name="Home"
          component={Home}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
         <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false
        }}
      />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={Forgetpassword}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="OtpVarify"
          component={OtpVarify}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
        // options={{
        //   headerShown: false
        // }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="AllOrders"
          component={AllOrders}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="AdminPanel"
          component={AdminPanel}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="AdminCategories"
          component={AdminCategories}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="AdminOrders"
          component={AdminOrders}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="UpdateProduct"
          component={UpdateProduct}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="NewProduct"
          component={NewProduct}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="ProductImages"
          component={ProductImages}
        // options={{
        //   headerShown: false
        // }}
        />
        <Stack.Screen
          name="CameraComponent"
          component={CameraComponent}
          options={{
            headerShown: false
          }}
        />


        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ConfirmOrder"
          component={ConfirmOrder}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>

      <Toast position="top" topOffset={40} />
    </NavigationContainer>
  )
}


