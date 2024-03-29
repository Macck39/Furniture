import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import COLORS from '../../constants/colors';
import Loader from '../../components/Loader';
import OrderItem from '../../components/OrderItem';
import { Headline } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { processOrder} from '../../../redux/actions/otherAction';
import { useGetOrders, useMessageAndErrorOther } from '../../../utils/hooks';
import { useIsFocused } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer';




// console.log("orders....", orders)

const AdminOrders = ( { navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { loading, orders } = useGetOrders(isFocused, true);

  const processOrderLoading = useMessageAndErrorOther(
    dispatch,
    navigation,
    "AdminPanel"
  );


  const updateHandler = (id) => {
    // console.log("updated..")
    dispatch(processOrder(id));
  };
  return (
    <>
    <View style={{
        paddingTop : 30,
      backgroundColor : COLORS.white,
    }}>

      <View
        style={{
          marginBottom: 20,
          paddingTop: 70,
        }}
      >
        {/* <Text style={styles.heading}>All Orders </Text> */}
      </View>

      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            padding: 10,
            // flex: 1,
          }}
        >
          <ScrollView style={{ marginBottom : 160}} showsVerticalScrollIndicator={false}>

            {orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  orderedOn={item.createdAt.split('T')[0]}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country}, ${item.shippingInfo.pincode}`}
                  admin={true}
                //   loading={false}
                updateHandler={updateHandler}
                loading ={processOrderLoading}
                />
              ))
            ) : (
              <Headline style={{ textAlign: "center" }}>
                No Orders yet!
              </Headline>
            )}
          </ScrollView>
        </View>
      )}
      
    </View>
    <Footer/>
    </>
  )
}

export default AdminOrders;

const styles = StyleSheet.create({
 
})