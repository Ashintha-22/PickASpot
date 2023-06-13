import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

export default function Spot({ item, pressHandler }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => pressHandler(item.id)}>
      <Text style={styles.item}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderColor: "#DDDDDD",
    alignSelf: "center",
    borderRadius: 3,
    width: width - 30,
    marginVertical: 5,
    backgroundColor: "white",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 1,
    elevation: 3,
  },
});
