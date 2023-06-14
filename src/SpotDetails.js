import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../shared/styles";
import Spot from "../shared/spot";
import formstyles from "../shared/formstyles";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db, colRef } from "../shared/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");

const SpotDetails = ({ route, navigation }) => {
  const { user, userEmail } = route.params || {}; // Add a null check here;

  const userEmailString = toString(userEmail);

  useEffect(() => {
    console.log("SpotDetails userEmail: ", userEmail);
  }, [userEmail]);

  const [userData, setuserData] = useState([]);

  // queries
  const q = query(colRef, where("email", "==", userEmail));

  useEffect(() => {
    // realtime collection data
    onSnapshot(q, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setuserData(users);
      console.log(users);
    });
  }, []);

  console.log("Array: ", userData);
  console.log("Email: ", userData.email);
  const Price = userData.price;
  console.log("Price: ", Price);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "#F6F8FF", alignItems: "center" },
      ]}
    >
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView>
          <ImageBackground
            source={require("../assets/home_parking.jpg")}
            resizeMode="contain"
            style={spotstyles.parkImage}
          />
          {userData.map((user) => (
            <View key={user.id} style={spotstyles.cardContainer}>
              <Spot item={user.spotName} title={"Spot Name:"} />
              <Spot item={user.firstName} title={"First Name:"} />
              <Spot item={user.address} title={"Address:"} />
              <Spot item={user.phone} title={"Phone:"} />
              <Spot item={user.price} title={"Price:"} />
              <Spot item={user.noOfSlots} title={"No of Slots:"} />
              <Spot item={user.availableSlots} title={"Available Slots:"} />
              <Spot item={user.NIC} title={"NIC:"} />
              <Spot item={user.email} title={"Email:"} />
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SpotDetails;

const spotstyles = StyleSheet.create({
  parkImage: {
    width: width,
    height: height,
    position: "relative",
    top: -290,
    //bottom: 265,
  },
  cardContainer: {
    marginTop: -height + 240,
  },
});
