import {
  Button,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
//import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";
import styles from "../shared/styles";

const Login = ({ route, navigation }) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const handleLogin = () => {
    setErrortext("");
    if (!email) {
      alert("Please fill Email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }

    auth()
      .fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        if (signInMethods.length === 0) {
          alert("If new user. Please Register");
          navigation.navigate("Register", {
            userEmail: email,
            userPassword: password,
          });
        } else {
          auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
              const user = userCredentials.user;
              console.log("Logged in with: ", user.email);
            })
            .catch((error) => {
              console.log(error);
              if (error.code === "auth/invalid-email") {
                setErrortext("Invalid email address");
              } else if (error.code === "auth/user-not-found")
                setErrortext("No User Found");
              else {
                setErrortext("Please check your email or password");
                alert("Incorrect Password");
              }
            });
        }
      });
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user && user.email) {
        navigation.replace(
          "MainStack",
          {
            user: user.displayName,
            userEmail: user.email,
          },
          {
            screenName: "Home",
            params: { user: user.displayName, userEmail: user.email },
          }
        );
        console.log("Logged in with: ", user.email);
      }
    });
    return unsubscribe;
  }, []);

  // GoogleSignin.configure({
  //   webClientId:
  //     "1017882151115-u2ki65sbjmr6db53cej5mvcad9mh4qro.apps.googleusercontent.com",
  // });

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // const onGoogleButtonPress = async () => {
  //   // Check if your device supports Google Play
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   // Sign-in the user with the credential
  //   //const user_sign_in = auth().signInWithCredential(googleCredential);

  //   auth()
  //     .signInWithCredential(googleCredential)
  //     .then(({ user }) => {
  //       auth()
  //         .fetchSignInMethodsForEmail(user.email)
  //         .then((signInMethods) => {
  //           if (signInMethods.length === 0) {
  //             alert("If new user. Please Register");
  //             navigation.navigate("Register", {
  //               userEmail: user.email,
  //             });
  //           } else {
  //             console.log(user.email);
  //             user
  //               .then((user) => {
  //                 console.log(user);
  //               })
  //               .catch((error) => {
  //                 console.log(error);
  //               });
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     });
  // };

  // if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container} position="relative">
        <ImageBackground
          source={require("../assets/login_BG.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
        <View position="absolute" style={styles.formContainer}>
          <Text style={styles.pageTitle}>Welcome Back!</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#676767"
            style={styles.textInput}
          />
          {errortext !== "" && (
            <Text style={styles.errorText}>{errortext}</Text>
          )}
          <TextInput
            placeholder="Password"
            valur={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#676767"
            style={styles.textInput}
            secureTextEntry={true}
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
              onPress={() => navigation.navigate("Welcome")}
            >
              Sign in
            </Text>
            <TouchableOpacity
              style={styles.signinbutton}
              activeOpacity={0.5}
              onPress={handleLogin}
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
    );
  }

  // return (
  //   <View style={styles.container}>
  //     <View style={{ marginTop: 100, alignItems: "center" }}>
  //       <Text style={styles.text}> Welcome, {user.displayName}</Text>
  //     </View>
  //     <Button style={{ marginTop: 300 }} title="Sign Out" onPress={signOut} />
  //   </View>
  // );
};

export default Login;
