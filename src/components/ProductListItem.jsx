

import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";
import MyModal from "./MyModal";

const DeleteModal = ({ id, deletehandler,openConfirmModal,setOpenConfirmModal,onClose }) => {
 
  // console.log(openConfirmModal);
   if (!openConfirmModal) {
     return null;
   }
   const handleDelete = () => {
     deletehandler(id);
     onClose();
    }
   return (
     <Modal
       animationType="slide"
       transparent={true}
       visible={openConfirmModal}
      //  onRequestClose={onClose}
     >
       <View style={styles.centeredView}>
         <View style={styles.modalView}>
           <Text style={styles.modalText}>Are you sure you want to delete?</Text>
           <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
             <TouchableOpacity
               style={[styles.button, styles.buttonDelete]}
               onPress={handleDelete}
             >
               <Text style={styles.textStyle}>Delete</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={[styles.button, styles.buttonClose]}
               onPress={onClose}
             >
               <Text style={styles.textStyle}>Cancel</Text>
             </TouchableOpacity>
           </View>
         </View>
       </View>
     </Modal>
   );
 };
const ProductListItem = ({
  navigate,
  deletehandler,
  i,
  id,
  price,
  stock,
  name,
  category,
  imgSrc,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
 
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  }
  

  // console.log(name);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.2}
        onLongPress={() => setOpenModal((prev) => !prev)}
        onPress={() => navigate.navigate("ProductDetails", { id })}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: i % 2 === 0 ? COLORS.secondary : COLORS.primary,
          }}
        >
          <Image
            source={{
              uri: imgSrc,
            }}
            style={{ width: 40, height: 40 }}
          />

          <Text
            style={{
              width: 60,
              color: COLORS.white,
            }}
            numberOfLines={1}
          >
            Rs. {price}
          </Text>
          <Text
            style={{
              maxWidth: 120,
              color: COLORS.white,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            style={{
              maxWidth: 120,
              color: COLORS.white,
            }}
            numberOfLines={1}
          >
            {category}
          </Text>
          <Text
            style={{
              maxWidth: 120,
              color: COLORS.white,
            }}
            numberOfLines={1}
          >
            {stock}
          </Text>
        </View>
      </TouchableOpacity>

      {openModal && (
        <MyModal
          id={id}
          deletehandler={deletehandler}
          navigate={navigate}
          setOpenModal={setOpenModal}
          setOpenConfirmModal={setOpenConfirmModal}
        />
      )}
      {openConfirmModal &&
        <DeleteModal
          id={id}
          deletehandler={deletehandler}
          setOpenModal={setOpenModal}
          visible={true}
          openConfirmModal={openConfirmModal}
          setOpenConfirmModal={handleCloseConfirmModal}
          onClose={handleCloseConfirmModal}
        />}
    </>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    alignContent: "center",
    padding: 12,
    alignItems:"center",
    borderRadius: 10,
    marginVertical: 10,
  },
  centeredView: {
    // position: "absolute",
    zIndex: 100,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50, // Add this line
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width:80,
    elevation: 2,
    marginHorizontal:4,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonDelete: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});