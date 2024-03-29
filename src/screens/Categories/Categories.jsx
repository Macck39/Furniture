import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAllProducts } from "../../../redux/actions/productAction";
import { useSetCategories } from "../../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../constants/colors';
import Footer from '../../components/Footer';
import { all } from 'axios';
import { Card } from 'react-native-paper';




const categoryIcons = [
    { name: "Table", icon: "table-furniture" },
    { name: "Chair", icon: "chair-rolling" },
    { name: "Sofa", icon: "sofa" },
    { name: "BEDS", icon: "bed" }
];

const ProductsCategoriesScreen = ({ navigation }) => {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const { products } = useSelector((state) => state.product);
    const [allProducts, setAllProducts] = useState([]);
    // console.log(products, "products")


    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        // Update this effect to handle the initial load of products as well as category selection
        if (category) {
            const categoryFilteredProducts = products.filter((prod) => prod.category === category);
            setAllProducts(categoryFilteredProducts);
        } else {
            setAllProducts(products); // Reset to all products if no category is selected
        }
    }, [category]);


    const gotoproductDetailsHandler = (id) => {
        navigation.navigate("ProductDetails", { id });
    };


    const categoryButtonHandler = (c) => {
        // console.log("CATEGORY IS ==>>", c)
        setCategory(c._id);
        // setSearchQuery('');
        // setSearchResults([]);
    };
    useSetCategories(setCategories, isFocused);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            dispatch(getAllProducts());
        }, 500);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [dispatch, isFocused]);


    const renderItemHandler = ({ item }) => (
        <>
            <Pressable
                onPress={() => gotoproductDetailsHandler(item._id)}
            >

                <View style={styles.product}>
                    <Image
                        source={{
                            uri: item.images[0].url,
                        }}
                        style={styles.productImage}
                    />

                    <View>
                        <Text
                            style={styles.productName}
                        >
                            {" "}
                            {item.name}{" "}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={styles.productPrice}
                        >
                            Rs. {item.price}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </>
    );




    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.white }}
        >
            <View style={styles.container}>
                <View >
                    <Text style={styles.title}> Categories</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.categories}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {categories.map((c, index) => (
                                <TouchableOpacity
                                    key={c._id}
                                    style={{
                                        backgroundColor:
                                            category === c._id ? COLORS.secondary : COLORS.white,
                                        marginBottom: 8,
                                        paddingVertical: 10,
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        borderRadius: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => categoryButtonHandler(c)}
                                >
                                    <MaterialCommunityIcons name={categoryIcons.find((icon) => icon.name === c.category).icon} size={30} color="black" />
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            marginTop: 2,
                                            color: category === c._id ? COLORS.white : "black",
                                        }}
                                    >
                                        {" "}
                                        {c.category}{" "}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.products}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={allProducts}
                            renderItem={renderItemHandler}
                            keyExtractor={(item) => item._id}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: 'space-between', 
                                paddingHorizontal: 16,
                                paddingBottom: 16, 

                              }}
                        />
                    </View>

                </View>
            </View>
            <Footer />

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 14,

    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    categories: {
        flex: 1,
        // marginRight:8,
    },
    category: {
        marginBottom: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        fontSize: 16,
        marginTop: 8,
    },
    products: {
        flex: 6,        
    },
    product: {
        // backgroundColor:COLORS.grey,
        marginBottom: 2,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        width: '110%',
        alignItems: 'center',
        marginRight:8,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 2,
        marginBottom: 10,
    },
    productName: {
        fontSize: 15,
        marginVertical: 6,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ProductsCategoriesScreen;