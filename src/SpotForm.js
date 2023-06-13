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
import styles from "../shared/styles";
import SelectDropdown from "react-native-select-dropdown";
import formstyles from "../shared/formstyles";

const { height, width } = Dimensions.get("window");

const SpotForm = ({ route, navigation }) => {
  const { user, userEmail } = route.params;

  const [spotName, setspotName] = useState("");
  const [location, setlocation] = useState("");
  const [noOfSlots, setNoOfSlots] = useState("");
  const [phone, setphone] = useState("");
  const [nic, setnic] = useState("");

  const [errortext, seterrortext] = useState({
    spotName: "",
    location: "",
    noOfSlots: "",
  });

  const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim, purus non euismod varius, purus odio ultrices felis, id consectetur massa turpis nec velit. Praesent tincidunt velit eu mauris aliquam, id sollicitudin dolor feugiat. Curabitur sodales convallis scelerisque. Nam venenatis sem eu velit pellentesque, in iaculis urna rhoncus. Ut suscipit semper nulla, sed laoreet nisi elementum nec. Donec semper, mauris at ultricies efficitur, urna lorem tincidunt nulla, ac consectetur arcu mauris a tellus. Aliquam sed leo ac lacus fringilla varius nec eget felis. Sed sed erat eu massa tempus malesuada. Quisque facilisis fermentum fringilla. Etiam sed elit sed nunc vulputate elementum. Aliquam erat volutpat. Vivamus malesuada convallis neque, vitae pharetra purus tempus nec.`;

  return (
    <View
      style={[
        styles.container,
        { alignItems: "center", justifyContent: "flex-start" },
      ]}
    >
      <ImageBackground
        source={require("../assets/addSpot_background.png")}
        style={formstyles.backImage}
      />
      <View
        style={[
          formstyles.scrollViewContainer,
          {
            alignItems: "center",
            justifyContent: "center",
            marginTop: -20,
            height: height - 160,
            backgroundColor: "rgba(255,255,255, 0.5)",
          },
        ]}
      >
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <ScrollView>
            <Text style={formstyles.pageTitle}>Spot Details!</Text>
            <TextInput
              placeholder="Spot Name"
              value={spotName}
              onChangeText={(text) => setspotName(text)}
              placeholderTextColor="#676767"
              style={[formstyles.textInput, { marginTop: 20 }]}
            />
            {errortext.spotName !== "" && (
              <Text style={styles.errorText}>{errortext.spotName}</Text>
            )}
            <TextInput
              placeholder="No of Slots"
              value={noOfSlots}
              keyboardType="numeric"
              onChangeText={(text) => setNoOfSlots(text)}
              placeholderTextColor="#676767"
              style={formstyles.textInput}
            />
            {errortext.noOfSlots !== "" && (
              <Text style={styles.errorText}>{errortext.noOfSlots}</Text>
            )}
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={(text) => setlocation(text)}
              placeholderTextColor="#676767"
              style={formstyles.textInput}
            />
            {errortext.location !== "" && (
              <Text style={styles.errorText}>{errortext.location}</Text>
            )}
            {/* <SelectDropdown
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
            /> */}

            <TouchableOpacity
              style={[
                styles.LoginRegisterButton,
                { marginTop: 20, marginBottom: 20 },
              ]}
              activeOpacity={0.5}
              //onPress={handleSubmit}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                SUBMIT
              </Text>
            </TouchableOpacity>
            {/* <Text style={[styles.text, { fontSize: 25 }]}>
              {loremIpsumText}
            </Text> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SpotForm;
