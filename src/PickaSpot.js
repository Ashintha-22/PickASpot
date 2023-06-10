import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import "react-native-gesture-handler";

const PickaSpot = ({ route, navigation }) => {
  //const route = useRoute();
  const { user, userEmail } = route.params;

  // useEffect(() => {
  //   if (!user || !userEmail) {
  //     navigation.replace("Home");
  //   }
  // }, []);

  const signOut = async () => {
    auth()
      .signOut()
      .then(() => {
        console.log("User signed out!");
      });

    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      navigation.navigate("MainStack");
    } catch (error) {
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
        <Text style={styles.text}> Welcome, {user}</Text>
        <Text style={styles.text}> {userEmail}</Text>
      </View>
      <Button style={{ marginTop: 300 }} title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default PickaSpot;
