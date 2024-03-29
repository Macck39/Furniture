import axios from "axios";
import { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import { useSelector } from "react-redux";
import { loadUser } from "../redux/actions/userAction";
import { server } from "../redux/store";
import { getAdminProducts } from "../redux/actions/productAction";

export const useMessageAndErrorUser  = (
  navigation,
  dispatch,
  navigateTo
) => {
  const { loading, message, error } = useSelector((state) => state.user);

  // console.log("value is middlewware..", loading, message, error, navigateTo) 

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
    // console.log("working...", message);

    if (message) {
      // user cannot get back sometimes 
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: navigateTo }],
      // });
      // navigation.navigate( "AuthStack", { screen : navigateTo } )
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: navigateTo }],
      // });
      console.log("NAVIGATE TO  ===>>>>>", navigateTo)
      navigation.replace(navigateTo)
      // navigation.
      // console.log("working 2")
      Toast.show({
        type: "success",
        text1: message,
      });
      // console.log("working..3")
      dispatch({
        type: "clearMessage",
      });
      dispatch(loadUser());
    }

    // console.log("last working...")
  }, [error, message, dispatch]);

  return loading;
};

export const useMessageAndErrorOther = (
  dispatch,
  navigation,
  navigateTo,
  func
) => {
  const { loading, message, error } = useSelector((state) => state.other);

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
      Toast.show({
        type: "success",
        text1: message,
      });
      dispatch({
        type: "clearMessage",
      });

      // console.log("profile page navigation")

      navigateTo && navigation.navigate(navigateTo);

      func && dispatch(func());
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useSetCategories = (setCategories, isFocused) => {

  useEffect(() => {
    axios
      .get(`${server}/product/categories`)
      .then((res) => {
        setCategories(res?.data?.categories);
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: e.response.data.message,
        });
      });
  }, [isFocused]);
};

export const useGetOrders = (isFocused, isAdmin = false) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async() =>{
    setLoading(true);
    axios
      .get(`${server}/order/${isAdmin ? "admin" : "my"}`)
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: e.response.data.message,
        });
        setLoading(false);
      });

  }
 
  useEffect(() => {
    getOrders()
  }, [isFocused]);

  return {
    loading,
    orders,
  };
};


// console.log(" clg in hooks page...", )

export const useAdminProducts = (dispatch, isFocused) => {
  const { products, inStock, outOfStock, error, loading } = useSelector(
    (state) => state.product
  );

  // console.log("products in admin", products)
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

    dispatch(getAdminProducts());
  }, [dispatch, isFocused, error]);

  return {
    products,
    inStock,
    outOfStock,
    loading,
  };
};