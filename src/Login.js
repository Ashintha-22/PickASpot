import { StatusBar } from "expo-status-bar";
import {
  Button,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Svg, Rect } from "react-native-svg";
import "expo-dev-client";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";
import styles from "./styles";

const Login = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      "646634016430-96colfmkjkiaumrodp76467f8ei0f1vf.apps.googleusercontent.com",
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/login_BG.jpg")}
          style={styles.image}
          position="absolute"
        />
        <View style={styles.formContianer}>
          <Text style={styles.pageTitle}>Welcome Back!</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#676767"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#676767"
            style={styles.textInput}
          />
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
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
              Sign in
            </Text>
            <TouchableOpacity style={styles.signinbutton} activeOpacity={0.5}>
              <Image
                source={require("../assets/arrowButton.png")}
                style={{
                  resizeMode: "contain",
                  width: 120,
                  height: 120,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.googleSignInButton}
              activeOpacity={0.5}
              onPress={onGoogleButtonPress}
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
            {/* <GoogleSigninButton
          style={{ width: 300, height: 65, marginTop: 10}}
          onPress={onGoogleButtonPress}
        /> */}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100, alignItems: "center" }}>
        <Text style={styles.text}> Welcome, {user.displayName}</Text>
      </View>
      <Button style={{ marginTop: 300 }} title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default Login;
