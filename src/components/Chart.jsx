
import { View, Text, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";
import COLORS from "../constants/colors";

const screenWidth = Dimensions.get("screen").width - 50;

const Chart = ({ inStock = 0, outOfStock = 0 }) => {
  const data = [
    {
      name: "Out of Stock",
      population: outOfStock,
      color: COLORS.grey,
      legendFontColor: COLORS.white,
    },

    {
      name: "In Stock",
      population: inStock,
      color: COLORS.primary,
      legendFontColor: COLORS.white,
    },
  ];

  const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
 
  }

  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={150}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={COLORS.secondary}
        paddingLeft={"15"}
        // center={[10, 50]}
        absolute
      />
    </View>
  );
};

export default Chart;