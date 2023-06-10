import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";

const { height, width } = Dimensions.get("window");

const GetDetails = ({ route, navigation }) => {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [nic, setnic] = useState("");

  const genders = ["Male", "Female"];

  const { userEmail, userPassword } = route.params || {}; // Add a null check here;

  const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim, purus non euismod varius, purus odio ultrices felis, id consectetur massa turpis nec velit. Praesent tincidunt velit eu mauris aliquam, id sollicitudin dolor feugiat. Curabitur sodales convallis scelerisque. Nam venenatis sem eu velit pellentesque, in iaculis urna rhoncus. Ut suscipit semper nulla, sed laoreet nisi elementum nec. Donec semper, mauris at ultricies efficitur, urna lorem tincidunt nulla, ac consectetur arcu mauris a tellus. Aliquam sed leo ac lacus fringilla varius nec eget felis. Sed sed erat eu massa tempus malesuada. Quisque facilisis fermentum fringilla. Etiam sed elit sed nunc vulputate elementum. Aliquam erat volutpat. Vivamus malesuada convallis neque, vitae pharetra purus tempus nec.`;
  return (
    <View
      style={[
        styles.container,
        { alignItems: "center", justifyContent: "flex-start" },
      ]}
    >
      <ImageBackground
        source={require("../assets/getdetails_background.jpg")}
        style={formstyles.backImage}
      />
      <View
        style={[
          formstyles.scrollViewContainer,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <ScrollView>
            <Text style={formstyles.pageTitle}>Give us your details!</Text>
            <TextInput
              placeholder="Email"
              value={userEmail}
              placeholderTextColor="#676767"
              style={formstyles.textInput}
              editable={false}
            />
            <TextInput
              placeholder="First Name"
              value={fName}
              onChangeText={(text) => setfName(text)}
              placeholderTextColor="#676767"
              style={formstyles.textInput}
            />
            <TextInput
              placeholder="LastName"
              value={lName}
              onChangeText={(text) => setlName(text)}
              placeholderTextColor="#676767"
              style={formstyles.textInput}
            />
            <SelectDropdown
              data={genders}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText="Gender"
              buttonStyle={formstyles.textInput}
              buttonTextStyle={formstyles.buttonText}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              rowStyle={[formstyles.rowStyle, { alignSelf: "center" }]}
              rowTextStyle={[formstyles.buttonText]}
              dropdownStyle={formstyles.dropdownStyle}
            />
            <TextInput
              placeholder="Mobile Number (e.g. 07#########)"
              keyboardType="numeric"
              value={phone}
              onChangeText={(text) => setphone(text)}
              placeholderTextColor="#676767"
              style={formstyles.textInput}
            />
            <TextInput
              placeholder="NIC"
              value={nic}
              onChangeText={(text) => setnic(text)}
              placeholderTextColor="#676767"
              style={formstyles.textInput}
            />
            <TextInput
              placeholder={"Address line 1\n\nAddress line 2\n\nAddress line 3"}
              value={address}
              multiline={true}
              onChangeText={(text) => setaddress(text)}
              placeholderTextColor="#676767"
              style={[formstyles.textInput, { height: 120, lineHeight: 30 }]}
            />

            <TouchableOpacity
              style={[styles.LoginRegisterButton, { marginTop: 20 }]}
              activeOpacity={0.5}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                SUBMIT
              </Text>
            </TouchableOpacity>
            <Text style={[styles.text, { fontSize: 25 }]}>
              {loremIpsumText}
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default GetDetails;

const formstyles = StyleSheet.create({
  scrollViewContainer: {
    width: width - 30,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    zIndex: 1,
    top: 40,
    paddingTop: 20,
    height: height - 80,
    position: "absolute",
  },
  textInput: {
    height: 60,
    width: width - 60,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    paddingLeft: 20,
    elevation: 2,
    alignSelf: "center",
  },
  backImage: {
    width: width,
    height: height,
  },
  pageTitle: {
    fontSize: 30,
    color: "#273180",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Raleway",
    margin: 10,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    color: "#676767",
    fontFamily: "Raleway",
    textAlign: "left",
  },
  rowStyle: {
    height: 50,
    width: width - 60,
    backgroundColor: "white",
    paddingLeft: 10,
  },
  dropdownStyle: {
    height: 100,
    width: width - 60,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
