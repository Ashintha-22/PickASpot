import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "../shared/styles";
import auth from "@react-native-firebase/auth";
import "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

const PickaSpot = ({ route, navigation }) => {
  const { user, userEmail, firstName, isBooked, providerFName, price } =
    route.params;
  console.log(isBooked);
  // useEffect(() => {
  //   if (!user || !userEmail) {
  //     navigation.replace("Home");
  //   }
  // }, []);
  const gotoSpotDetails = () => {
    navigation.navigate("Map");
  };

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
    // } catch (error)
    {
      //console.log(error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "#F6F8FF", alignItems: "center" },
      ]}
    >
      <View style={{ marginTop: 10, justifyContent: "center" }}>
        <Text style={styles.text}> Welcome {firstName}</Text>
      </View>
      {/* <Button style={{ marginTop: 300 }} title="Sign Out" onPress={signOut} /> */}
      <View>
        <TouchableOpacity
          style={[styles.LoginRegisterButton, { marginVertical: 20 }]}
          activeOpacity={0.5}
          onPress={gotoSpotDetails}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>GOTO MAP</Text>
        </TouchableOpacity>
      </View>
      {isBooked && (
        <View style={billStyles.formContainer}>
          <Text style={[styles.text, { fontSize: 25 }]}>Final Bill</Text>
          <Text style={[styles.text, { textAlign: "center" }]}>
            Provider's Name: {providerFName}
          </Text>
          <Text style={[styles.text, { textAlign: "center" }]}>
            Price per hour: {price}.00
          </Text>
          <Text style={[styles.text, { textAlign: "center" }]}>Time: s</Text>
          <TouchableOpacity
            style={[
              billStyles.locationButton,
              {
                marginHorizontal: 30,
                marginVertical: 20,
                backgroundColor: "#33DB15",
              },
            ]}
            activeOpacity={0.8}
            //onPress={}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>FINISH</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PickaSpot;

const billStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    width: width - 40,
    height: 600,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    zIndex: 1,
  },
  locationButton: {
    height: 50,
    width: 100,
    borderRadius: 150,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#BE1D1D",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});
