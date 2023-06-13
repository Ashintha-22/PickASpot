import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";

const { height, width } = Dimensions.get("window");

const signOut = async () => {
  auth()
    .signOut()
    .then(() => {
      console.log("User signed out!");
    });

  // try {
  //   await GoogleSignin.revokeAccess();
  //   await auth().signOut();
  //   navigation.navigate("MainStack");
  // } catch (error) {
  //   //console.log(error);
  // }
};

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../assets/PickASpot.png")}
          style={[styles.headerLogo, { alignSelf: "flex-start" }]}
        />
        <Text style={styles.headerText}>PICK A SPOT</Text>
        <Ionicons
          name="exit-outline"
          size={30}
          style={{ alignSelf: "center", marginLeft: 150 }}
          color="white"
          onPress={signOut}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#000B7B",
    marginLeft: -16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  headerLogo: {
    height: 30,
    width: 50,
    marginLeft: 15,
  },
});

export default Header;
