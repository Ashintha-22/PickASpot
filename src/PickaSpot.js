import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useRoute } from "@react-navigation/native";
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
      console.error(error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "#F6F8FF", alignItems: "center" },
      ]}
    >
      <TouchableOpacity
        style={[styles.LoginRegisterButton, { marginTop: 30 }]}
        activeOpacity={0.5}
        onPress={() => navigation.navigate("PickaSpot")}
      >
        <Text style={[styles.buttonText, { color: "white", marginLeft: 105 }]}>
          PICK A SPOT
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.LoginRegisterButton, { marginTop: 30 }]}
        activeOpacity={0.5}
      >
        <Text style={[styles.buttonText, { color: "white", marginLeft: 85 }]}>
          PROVIDE A SPOT
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10, justifyContent: "center" }}>
        <Text style={styles.text}> Welcome, {user}</Text>
        <Text style={styles.text}> {userEmail}</Text>
      </View>
      <Button style={{ marginTop: 300 }} title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default PickaSpot;
