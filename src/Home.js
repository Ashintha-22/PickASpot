import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import styles from "../shared/styles";
import "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";

const { height, width } = Dimensions.get("window");

const Home = ({ route, navigation }) => {
  const { user, userEmail } = route.params || {}; // Add a null check here;

  const signOut = async () => {
    navigation.navigate("RegisterMap");
    // auth()
    //   .signOut()
    //   .then(() => console.log("User signed out!"));
    // try {
    //   await GoogleSignin.revokeAccess();
    //   await auth().signOut();
    //   navigation.navigate("MainStack");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    if (userEmail || user) {
      navigation.navigate("MainStack", {
        user,
        userEmail,
      });
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#e9edfe",
      }}
    >
      <Image
        source={require("../assets/TEXT.png")}
        position="absolute"
        style={{ resizeMode: "contain", width: "80%" }}
      />

      <Image
        source={require("../assets/carPost.png")}
        position="absolute"
        style={{ resizeMode: "contain", width: "80%", top: 180 }}
      />

      <View
        position="absolute"
        justifyContent="center"
        alignItems="center"
        style={{
          flex: 0.28,
          backgroundColor: "white",
          top: "70%",
          width: "100%",
          height: "30%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <TouchableOpacity
          style={styles.LoginRegisterButton}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.LoginRegisterButton, { marginTop: 25 }]}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>REGISTER</Text>
        </TouchableOpacity>
        {/* {<Button style={{ marginTop: 0 }} title="TEST" onPress={signOut} />} */}
      </View>
    </View>
  );
};

export default Home;
