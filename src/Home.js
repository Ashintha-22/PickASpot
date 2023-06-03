import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";

const { height, width } = Dimensions.get("window");

const Home = ({ navigation }) => {
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
          <Text
            style={[styles.buttonText, { color: "white", marginLeft: 135 }]}
          >
            LOGIN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.LoginRegisterButton, { marginTop: 25 }]}
          activeOpacity={0.5}
        >
          <Text
            style={[styles.buttonText, { color: "white", marginLeft: 118 }]}
          >
            REGISTER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
