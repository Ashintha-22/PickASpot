import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";

const Register = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/login_BG.jpg")}
        style={styles.image}
        position="absolute"
      />
      <View style={styles.formContainer}>
        <Text style={styles.pageTitle}>Let's get Registered!</Text>
        <TextInput
          placeholder="Email"
          value="E-mail"
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#676767"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          value="Password"
          onChangeText={(text) => setPassword(text)}
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
};

export default Register;
