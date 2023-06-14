import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

export default function Spot({ item, title }) {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <Text style={styles.item}>
        {title} {item}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 18,
    fontWeight: "bold",
    borderColor: "#DDDDDD",
    alignSelf: "center",
    borderRadius: 10,
    width: width - 30,
    lineHeight: 35,
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
