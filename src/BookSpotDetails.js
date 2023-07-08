import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../shared/styles";
import Spot from "../shared/spot";
import formstyles from "../shared/formstyles";
import { getDocs, query, where, onSnapshot, setDoc } from "firebase/firestore";
import { ref, onValue, getDatabase, update } from "firebase/database";
import { db, colRef } from "../shared/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");

const BookSpotDetails = ({ route, navigation }) => {
  const { user, userEmail, latitude, longitude, firstName } =
    route.params || {}; // Add a null check here;

  const db = getDatabase();
  const realRef = ref(db, "Location/" + firstName);

  let isBooked = false;
  const userEmailString = toString(userEmail);

  const [fName, setfName] = useState();

  useEffect(() => {
    console.log("BookSpotDetails firstName: ", firstName);
  }, [latitude, longitude]);

  const [userData, setuserData] = useState([]);
  const [isPressed, setIsPressed] = useState(false);

  const [price, setPrice] = useState();

  const [userRealtimeData, setuserRealtimeData] = useState([]);

  useEffect(() => {
    onValue(realRef, (snapshot) => {
      //
      const data = snapshot.val();
      console.log("Realtime data: ", data);

      setuserRealtimeData(data);
      //});
    });
  }, []);

  // const handlePress = () => {
  //   setIsPressed(true);
  //   // Perform additional actions on press if needed
  // };

  // queries
  const q = query(colRef, where("firstName", "==", firstName));

  useEffect(() => {
    // realtime collection data
    onSnapshot(q, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setuserData(users);
    });
  }, []);

  const onBook = async () => {
    try {
      if (userRealtimeData.available > 0) {
        update(realRef, {
          available: userRealtimeData.available - 1,
        });
        console.log("slotsssss: ", userRealtimeData.available);

        setIsPressed(true);
        setPrice(userRealtimeData.rate);
      } else {
        alert("No available slots");
      }

      const slotquery = query(colRef, where("firstName", "==", firstName));

      // Fetch the document reference instead of querying the collection again.
      getDocs(slotquery).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          const user = querySnapshot.docs[0].data();

          // console.log("After getting array index: ", user.email);
          if (user.availableSlots > 0) {
            setDoc(
              docRef,
              {
                availableSlots: user.availableSlots - 1,
              },
              { merge: true }
            )
              .then(() => {
                console.log("Document updated successfully");
                console.log("availableSlots: ", user.availableSlots);
                Alert.alert(
                  "Confirmation",
                  "Do you want to proceed with booking?",
                  [
                    {
                      text: "No",
                      Style: "cancel",
                      onPress: () => {
                        isBooked = false;
                        console.log("Pressed State : ", isBooked);
                        // Handle "No" button press if needed
                      },
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        isBooked = true;
                        console.log("Pressed State : ", isBooked);

                        navigation.navigate("PickaSpot", {
                          isBooked: isBooked,
                          providerFName: firstName,
                          price: price,
                        });
                        // Handle "Yes" button press if needed
                        // Start counting time or perform other actions
                      },
                    },
                  ]
                );
              })
              .catch((error) => {
                console.log("Error updating document: ", error);
              });
          } else {
            alert("No available slots");
          }
        }
      });
    } catch (error) {}

    // realtime collection data
    // onSnapshot(slotquery, (snapshot) => {
    //   let users = [];
    //   snapshot.docs.forEach((doc) => {
    //     users.push({ ...doc.data(), id: doc.id });
    //   });
    //   setuserData(users);
    //   console.log("AGAIN: ", users);

    //   // Get the first user from the users array
    //   const user = users[0];
    //   console.log("After getting array index: ", user.email);
    //   if (user) {
    //     // Access the noOfSlots field from the user object
    //     if (user.availableSlots > 0) {
    //       setDoc(
    //         slotquery,
    //         {
    //           availableSlots: user.availableSlots - 1,
    //         },
    //         { merge: true }
    //       )
    //         .then(() => {
    //           console.log("Document updated successfully");
    //         })
    //         .catch((error) => {
    //           console.log("Error updating document: ", error);
    //         });
    //     } else {
    //       alert("No available slots");
    //     }

    //     console.log("availableSlots: ", user.availableSlots);
    //   }
    // });
  };

  const onCancel = async () => {
    try {
      if (userRealtimeData.available < userRealtimeData.total) {
        update(realRef, {
          available: userRealtimeData.available + 1,
        });
        setIsPressed(false);
        console.log("Pressed State : ", isPressed);
        // Clear the interval timer
      } else {
        alert("All the slots are available");
      }

      const slotquery = query(colRef, where("firstName", "==", firstName));

      // Fetch the document reference instead of querying the collection again
      getDocs(slotquery).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;

          const user = querySnapshot.docs[0].data();
          // console.log("After getting array index: ", user.email);
          if (user.availableSlots < user.noOfSlots) {
            setDoc(
              docRef,
              {
                availableSlots: user.availableSlots + 1,
              },
              { merge: true }
            )
              .then(() => {
                console.log("Document updated successfully");
              })
              .catch((error) => {
                console.log("Error updating document: ", error);
              });
          } else {
            alert("No available slots");
          }
        }
      });
    } catch (error) {}
    // realtime collection data
    // onSnapshot(slotquery, (snapshot) => {
    //   let users = [];
    //   snapshot.docs.forEach((doc) => {
    //     users.push({ ...doc.data(), id: doc.id });
    //   });
    //   setuserData(users);
    //   console.log("AGAIN: ", users);

    //   // Get the first user from the users array
    //   const user = users[0];
    //   console.log("After getting array index: ", user.email);
    //   if (user) {
    //     // Access the noOfSlots field from the user object
    //     if (user.availableSlots > 0) {
    //       setDoc(
    //         slotquery,
    //         {
    //           availableSlots: user.availableSlots - 1,
    //         },
    //         { merge: true }
    //       )
    //         .then(() => {
    //           console.log("Document updated successfully");
    //         })
    //         .catch((error) => {
    //           console.log("Error updating document: ", error);
    //         });
    //     } else {
    //       alert("No available slots");
    //     }

    //     console.log("availableSlots: ", user.availableSlots);
    //   }
    // });
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
              <Spot item={user.NIC} title={"NIC:"} />
              <Spot item={user.email} title={"Email:"} />
              <Spot item={user.price} title={"Price:"} />
              <Spot item={user.noOfSlots} title={"No of Slots:"} />
              <Spot
                item={userRealtimeData.available}
                title={"Available Slots:"}
              />
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={
                isPressed
                  ? [
                      newStyle.locationButton,
                      {
                        marginHorizontal: 30,
                        marginVertical: 20,
                        backgroundColor: "#33DB15",
                        opacity: 0.5,
                      },
                    ]
                  : [
                      newStyle.locationButton,
                      {
                        marginHorizontal: 30,
                        marginVertical: 20,
                        backgroundColor: "#33DB15",
                      },
                    ]
              }
              activeOpacity={0.8}
              onPress={onBook}
              disabled={isPressed} // Disable the TouchableOpacity if isPressed is true
            >
              <Text style={[styles.buttonText, { color: "white" }]}>BOOK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                !isPressed
                  ? [
                      newStyle.locationButton,
                      {
                        marginHorizontal: 30,
                        marginVertical: 20,

                        opacity: 0.5,
                      },
                    ]
                  : [
                      newStyle.locationButton,
                      {
                        marginHorizontal: 30,
                        marginVertical: 20,
                      },
                    ]
              }
              activeOpacity={0.8}
              disabled={!isPressed} // Disable the TouchableOpacity if isPressed is true
              onPress={onCancel}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BookSpotDetails;

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
