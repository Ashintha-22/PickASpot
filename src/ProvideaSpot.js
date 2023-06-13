import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Spot from "../shared/spot";
import styles from "../shared/styles";

const ProvideaSpot = ({ navigation }) => {
  const [spot, setspot] = useState([
    { title: "home parking", id: "1" },
    { title: "Front of the Gate", id: "2" },
    { title: "mario", id: "3" },
    { title: "luigi", id: "4" },
    { title: "peach", id: "5" },
    { title: "toad", id: "6" },
    { title: "bowser", id: "7" },
  ]);

  const pressHandler = (key) => {
    setspot((prevspot) => {
      return prevspot.filter((spot) => spot.id != key);
    });
  };

  const gotoForm = () => {
    navigation.navigate("SpotForm");
  };

  return (
    <View style={pstyles.container}>
      <FlatList
        //numColumns={2}
        keyExtractor={(item) => item.id}
        data={spot}
        renderItem={({ item }) => (
          <Spot item={item} pressHandler={pressHandler} />
        )}
      />
      <View>
        <TouchableOpacity
          style={[styles.LoginRegisterButton, { marginVertical: 20 }]}
          activeOpacity={0.5}
          onPress={gotoForm}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            ADD A SPOT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const pstyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f6f8ff",
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 12,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 24,
  },
});

export default ProvideaSpot;
