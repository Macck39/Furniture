import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { AntDesign, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Searchbar, Button, TextInput } from "react-native-paper";
import { Card } from "react-native-paper";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productAction";
import { useSetCategories } from "../../utils/hooks";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
// import Carousel from 'react-native-reanimated-carousel';
import Carousel, { Pagination } from 'react-native-snap-carousel';


const DATA = {
  categories: [
    { key: 'chair', name: 'Chair', icon: 'seat' },
    { key: 'table', name: 'Table', icon: 'table-furniture' },
    { key: 'cupboard', name: 'Cupboard', icon: 'wardrobe' },
    { key: 'bed', name: 'Bed', icon: 'bed' },
  ],
  products: [
    { id: 'product1', name: 'Comfortable sofa', price: '$950', rating: 4.3, image: require('../../assets/hero3.jpg') },
    { id: 'product2', name: 'Comfortable sofa', price: '$950', rating: 4.3, image: require('../../assets/hero3.jpg') },
    { id: 'product3', name: 'Comfortable sofa', price: '$950', rating: 4.3, image: require('../../assets/hero3.jpg') },
    { id: 'product4', name: 'Comfortable sofa', price: '$950', rating: 4.3, image: require('../../assets/hero2.jpg') },
    { id: 'product5', name: 'Comfortable sofa', price: '$950', rating: 4.3, image: require('../../assets/hero1.jpg') },
    { id: 'product6', name: 'Comfortable sofa', price: '$950', rating: 4.3, image: require('../../assets/hero1.jpg') },

    // Add more products here
  ],
}


const categoryIcons = [
  { name: "Table", icon: "table-furniture" },
  { name: "Chair", icon: "chair-rolling" },
  { name: "Sofa", icon: "sofa" },
  { name: "BEDS", icon: "bed" }
];





const Home = ({ navigation, route }) => {
  const width = Dimensions.get("window").width;
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [categories, setCategories] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const carouselRef = useRef(null);

  // console.log("CATEGORY NAME IS", categoryName)

  // const navigate = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { products } = useSelector((state) => state.product);
  const handleSnapToItem = useCallback((index) => {
    setActiveSlide(index);
  }, []);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      const searchedProducts = products.filter((prod) =>
        prod?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(searchedProducts);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Update this effect to handle the initial load of products as well as category selection
    if (category) {
      const categoryFilteredProducts = products.filter((prod) => prod.category === category);
      setAllProducts(categoryFilteredProducts);
    } else {
      setAllProducts(products); // Reset to all products if no category is selected
    }
  }, [category]);


  useSetCategories(setCategories, isFocused);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(getAllProducts(searchQuery, category));
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, searchQuery, category, isFocused]);

  const onChangeSearch = (query) => setSearchQuery(query);

  // console.log("searching...", searchQuery);

  useEffect(() => { }, []);

  const gotoproductDetailsHandler = (id) => {
    navigation.navigate("ProductDetails", { id });
  };

  const categoryButtonHandler = (c) => {
    setCategory(c._id);
    setCategoryName(c?.category);
    setSearchQuery('');
    setSearchResults([]);
  };
  const searchToggleHandler = () => {
    setSearchToggle((prev) => !prev);
  };
  const renderSearchResults = () => {
    return (
      <FlatList
        data={searchResults}
        renderItem={renderItemHandler}
        keyExtractor={(item) => item._id}
        numColumns={2}
        style={{ marginTop: 10 }}
      />
    );
  };

  const renderItemHandler = ({ item }) => (
    <>
      <Pressable
        onPress={() => gotoproductDetailsHandler(item._id)}
        style={{ margin: 6 }}
      >
        <Card
          style={{
            width: 160,
            backgroundColor: COLORS.white,
            paddingBottom: 6,
            borderRadius: 15,

          }}
        >
          <View style={{ overflow: 'hidden', borderRadius: 8, marginHorizontal: 2, marginTop: 2 }}>
            <Image
              source={{
                uri: item.images[0].url,
              }}
              style={{ width: 160, height: 120 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal:4,
              overflow: 'hidden',
            }}
           >
            <View>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 14,
                  paddingHorizontal: 5,
                  overflow: 'hidden',

                }}
              >
                {" "}
                {item.name}{" "}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: COLORS.tomato,
                  fontSize: 14,
                  paddingHorizontal: 5,
                  overflow: 'hidden',
                }}
              >
                Rs.{item.price}
              </Text>
            </View>
          </View>
        </Card>
      </Pressable>
    </>
  );

  const images = [
    "https://media.designcafe.com/wp-content/uploads/2021/05/28195456/space-saving-living-room-furniture.jpg",
    "https://media.designcafe.com/wp-content/uploads/2021/02/11202306/interior-design-in-mumbai.jpg",
    "https://media.designcafe.com/wp-content/uploads/2021/01/13191315/top-10-interiors-in-bangalore.jpg"
  ]


  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <MaterialCommunityIcons name={item.icon} size={24} color="black" />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  // Render product item
  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      {/* Add more product details here */}
    </View>
  );
  const renderHorizontalProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      {/* Add more product details here */}
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      <ScrollView >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Best Furniture For Your Home.</Text>
          </View>
          <View >
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              icon={null}
              style={{
                marginBottom: 10,
                backgroundColor: COLORS.white,
                borderColor: '#CCCCCC', // Grey border color
                borderWidth: 2,
                borderRadius: 40,
                height: 55, // Reduced height
                marginHorizontal: 15,
              }}

            />
          </View>
          {searchQuery ? (
            renderSearchResults()
          ) : (
            <>



              <Carousel
                data={images}
                renderItem={({ item }) => (
                  <Card>
                    <Card.Cover
                      source={{
                        uri: item,
                      }}
                    />
                  </Card>
                )}
                sliderHeight={width * 0.2}
                sliderWidth={width}
                itemWidth={width}
                loop
                autoplay
                autoplayDelay={3000} // Change the delay as needed
                autoplayInterval={3000} // Change the interval as needed
                onSnapToItem={handleSnapToItem}
              />
              <View style={{ height: width * 0.16 }}>

                <Pagination
                  dotsLength={images.length}
                  activeDotIndex={activeSlide}
                  carouselRef={carouselRef}
                  tappableDots={!!carouselRef}
                  dotStyle={{
                    width: 12,
                    height: 7,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: COLORS.secondary,
                  }}
                  inactiveDotStyle={{
                    width: 12,
                    height: 7,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: COLORS.grey,
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
              </View>



              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <Text style={styles.sectionTitle}>Categories</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {categories.map((c, index) => (
                    <TouchableOpacity
                      key={c._id}
                      style={{
                        backgroundColor:
                          category === c._id ? COLORS.secondary : COLORS.white,
                        borderRadius: 40, // making it circular
                        height: 60, // specify the height
                        width: 70, // specify the width
                        margin: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => categoryButtonHandler(c)}
                    >
                      <MaterialCommunityIcons name={categoryIcons.find((icon) => icon.name === c.category).icon} size={24} color="black" />
                      <Text
                        style={{
                          fontSize: 13,
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
              <View >
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={allProducts}
                  renderItem={renderItemHandler}
                  keyExtractor={(item) => item._id}
                // numColumns={2}

                />
              </View>

              <View >
                <Text style={styles.sectionTitle} >Top Furniture</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={products}
                  renderItem={renderItemHandler}
                  keyExtractor={item => item._id}
                // Add other props here
                />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Popular</Text>
                <FlatList
                  horizontal
                  data={DATA.products}
                  renderItem={renderProductItem}
                  keyExtractor={item => item.id}
                // Add other props here
                />
              </View>
              <View>
                <Text style={{
                  textAlign: 'center', 
                  fontSize: 20,
                  fontWeight: 'bold',
                  margin: 10,
                }}>Offers & More </Text>
                <FlatList
                  horizontal
                  data={DATA.products}
                  renderItem={renderHorizontalProductItem}
                  keyExtractor={item => item.id}
                // Add other props here
                />
              </View>
            </>)}
        </View>

      </ScrollView>
      <Footer />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 10
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productCard: {
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'grey',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default Home;
