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
  import React, { useState, useEffect } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import COLORS from "../constants/colors";
  import { AntDesign,MaterialCommunityIcons} from "@expo/vector-icons";
  import { Searchbar, Button } from "react-native-paper";
  import { Card } from "react-native-paper";
  import axios from "axios";
  import { useDispatch, useSelector } from "react-redux";
  import { getAllProducts } from "../../redux/actions/productAction";
  import { useSetCategories } from "../../utils/hooks";
  import { useIsFocused, useNavigation } from "@react-navigation/native";
  import Footer from "../components/Footer";
  import Carousel from 'react-native-snap-carousel';
  
  
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
    const [searchToggle, setSearchToggle] = useState(false);
    const [categories, setCategories] = useState([]);
    const { isAuthenticated } = useSelector((state) => state.user);
    const [allProducts, setAllProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
  
    // console.log("CATEGORY NAME IS", categoryName)
  
    // const navigate = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
  
    const { products } = useSelector((state) => state.product);
  
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
    }, [category]); // Add 'products' to the dependency array
  
  
    // console.log("SEARCHED PRODUCTS ARE ==>>>", allProducts.length);
    // console.log("All products length", products.length);
  
    // console.log("products are...", products)
  
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
   
    useEffect(() => {}, []);
  
    const gotoproductDetailsHandler = (id) => {
      navigation.navigate("ProductDetails", { id });
    };
  
    const categoryButtonHandler = (c) => {
      // console.log("CATEGORY IS ==>>", c)
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
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 12,
              }}
            >
              <View>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 14,
                    paddingHorizontal: 5,
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
                  Rs. {item.price}
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
  
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.white }}
      >
        <ScrollView>
          <View style={{ padding: 12, marginBottom: 30 }}>
            {/* logo and search icon  */}
            <View style={styles.header}>
              <View>
                <Text
                  style={{
                    color: COLORS.secondary,
                    fontWeight: "bold",
                    fontSize: 25,
                  }}
                >
                  FURNITURE SHOP
                </Text>
              </View>
  
              {/* <AntDesign
                onPress={searchToggleHandler}
                name="search1"
                size={25}
                color={COLORS.secondary}
              /> */}
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
  
                  marginHorizontal: 10,
                }}
  
              />
            </View>
  
            {/* search box r */}
            {searchToggle && (
              <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{
                  marginBottom: 10,
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.grey,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              />
            )}
  
            {searchQuery ? (
              renderSearchResults()
            ) : (
              <>
  
            {/* BANNER  */}
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
              sliderWidth={width}
              itemWidth={width}/>
  
            {/* <Card>
              <Card.Cover
                source={{
                  uri: "https://media.designcafe.com/wp-content/uploads/2021/05/28195456/space-saving-living-room-furniture.jpg",
                }}
              />
            </Card> */}
  
            {/* CATEGORIES  */}
  
            <View
              style={{
                flexDirection: "row",
                paddingTop: 20,
              }}
            >
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
  
            {/* PRODUCTS  */}
            <View style={styles.product_container}>
              <FlatList
              horizontal
                data={allProducts}
                renderItem={renderItemHandler}
                keyExtractor={(item) => item._id}
                // numColumns={2}
  
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
    header: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingTop: 18,
      paddingBottom: 10,
      // backgroundColor: COLORS.secondary,
    },
    product_container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      flexWrap: "wrap",
      // height : 350,
      // backgroundColor: COLORS.white,
      marginTop: 20,
    },
    row: {
      flex: 1,
      justifyContent: "space-around"
    }
  });
  
  export default Home;
  