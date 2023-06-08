import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import auth from "@react-native-firebase/auth";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Welcome");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/login_BG.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.formContainer}>
        <Text style={styles.pageTitle}>Let's get Registered!</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#676767"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#676767"
          style={styles.textInput}
        />
        <View style={styles.signincontainer}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 30,
              marginLeft: 35,
              color: "#5c8aff",
              marginBottom: 20,
            }}
          >
            Sign Up
          </Text>
          <TouchableOpacity style={styles.signinbutton} activeOpacity={0.5}>
            <Image
              source={require("../assets/arrowButton.png")}
              style={{
                resizeMode: "contain",
                width: 120,
                height: 120,
              }}
              onPress={handleRegister}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.googleSignInButton}
            activeOpacity={0.5}
            //onPress={onGoogleButtonPress}
          >
            <Image
              source={require("../assets/google.png")}
              style={{
                resizeMode: "contain",
                width: 35,
                height: 35,
                alignSelf: "center",
                marginLeft: 35,
              }}
            />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
