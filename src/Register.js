import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import auth from "@react-native-firebase/auth";
import "react-native-gesture-handler";

const Register = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const { userEmail, userPassword } = route.params || {}; // Add a null check here;

  const handleRegister = async () => {
    setErrortext("");
    if (!email) {
      alert("Please fill Email");
      setErrortext("Please fill Email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      setErrortext("Please fill Password");
      return;
    }
    try {
      auth()
        //.createUserWithEmailAndPassword(email, password)
        .fetchSignInMethodsForEmail(email)
        .then((signInMethods) => {
          if (signInMethods.length !== 0) {
            alert("That email address is already in use!");
            setErrortext("That email address is already in use!");
          } else {
            gotoDetails();
          }
        });
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  // auth()
  //   //.createUserWithEmailAndPassword(email, password)
  //   .fetchSignInMethodsForEmail(email)
  //   .then((signInMethods) => {
  //     if (signInMethods.length !== 0) {
  //       alert("That email address is already in use!");
  //       setErrortext("That email address is already in use!");
  //     } else {
  //       auth()
  //         .createUserWithEmailAndPassword(email, password)
  //         .then((userCredentials) => {
  //           const user = userCredentials.user;
  //           console.log(user.email);
  //         })
  //         .catch((error) => {
  //           if (error.code === "auth/email-already-in-use") {
  //             setErrortext("That email address is already in use!");
  //             alert("That email address is already in use!");
  //           } else if (error.code === "auth/invalid-email") {
  //             setErrortext("Invalid email address");
  //             alert("Invalid email address");
  //           } else {
  //             setErrortext("Please check your email or password");
  //             alert(error.message);
  //           }
  //         });
  //     }
  //   });
  // };

  const gotoDetails = () => {
    if (errortext === "") {
      navigation.navigate("GetDetails", {
        userEmail: email,
        userPassword: password,
      });
    } else {
      alert(errortext);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate("GetDetails", {
  //         userEmail: user.email,
  //         userPassword: password,
  //       });
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  return (
    <ScrollView>
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
            secureTextEntry={true}
          />
          {errortext !== "" && (
            <Text style={styles.errorText}>{errortext}</Text>
          )}
          <View style={styles.signincontainer}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 30,
                marginLeft: 35,
                marginRight: -5,
                color: "#5c8aff",
                marginBottom: 20,
              }}
            >
              Sign Up
            </Text>
            <TouchableOpacity
              style={styles.signinbutton}
              activeOpacity={0.5}
              onPress={handleRegister}
            >
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
              <Text style={[styles.buttonText, { marginLeft: 20 }]}>
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
