import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import styles from "../shared/styles";
import formstyles from "../shared/formstyles";

const { height, width } = Dimensions.get("window");

const SpotDetails = ({ route, navigation }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "#F6F8FF", alignItems: "center" },
      ]}
    >
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView style>
          <ImageBackground
            source={require("../assets/home_parking.jpg")}
            resizeMode="contain"
            style={[spotstyles.parkImage, { marginTop: 0 }]}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SpotDetails;

const spotstyles = StyleSheet.create({
  parkImage: {
    width: width,
    height: height,
    //bottom: 265,
  },
});
