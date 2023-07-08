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
  Button,
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
  updateDoc,
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

  const onBook = () => {
    const slotquery = query(colRef, where("email", "==", userEmail));
    // realtime collection data
    onSnapshot(slotquery, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setuserData(users);
      console.log("AGAIN: ", users);

      // Get the first user from the users array
      const user = users[0];
      console.log("user: ", user.email);
      if (user) {
        // Access the noOfSlots field from the user object
        if (user.availableSlots > 0) {
          updateDoc(colRef, user.id, {
            availableSlots: user.availableSlots - 1,
          })
            .then(() => {
              console.log("Document updated successfully");
            })
            .catch((error) => {
              console.log("Error updating document: ", error);
            });
        } else {
          alert("No available slots");
        }

        console.log("availableSlots: ", user.availableSlots);
      }
    });
  };

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
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {/* <TouchableOpacity
              style={[
                newStyle.locationButton,
                {
                  marginHorizontal: 30,
                  marginVertical: 20,
                  backgroundColor: "#33DB15",
                },
              ]}
              activeOpacity={0.8}
              //onPress={onBook}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>BOOK</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[
                newStyle.locationButton,
                { marginHorizontal: 30, marginVertical: 20 },
              ]}
              activeOpacity={0.8}
              //onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                RELEASE
              </Text>
            </TouchableOpacity>
          </View>
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

const newStyle = StyleSheet.create({
  locationButton: {
    height: 50,
    width: 120,
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
