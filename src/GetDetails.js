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
import auth from "@react-native-firebase/auth";
import formstyles from "../shared/formstyles";
import { db, colRef } from "../shared/firebase";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const { height, width } = Dimensions.get("window");

const GetDetails = ({ route, navigation }) => {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [nic, setnic] = useState("");
  const [gender, setgender] = useState("");

  const [ErrorText, setErrortext] = useState("");
  const [errortext, seterrortext] = useState({
    fName: "",
    lName: "",
    address: "",
    phone: "",
    nic: "",
  });

  const genders = ["Male", "Female"];

  const { userEmail, userPassword } = route.params || {}; // Add a null check here;

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("MainStack", {
          userEmail: user.email,
        });
      }
    });
    return unsubscribe;
  }, []);

  const handleErrors = () => {
    let newErrorText = {}; // Create a new empty object

    errortext.fName = "";
    errortext.lName = "";
    errortext.address = "";
    errortext.phone = "";
    errortext.nic = "";

    if (fName.trim() === "") {
      newErrorText = { ...newErrorText, fName: "Please enter your first name" };
    }
    if (lName.trim() === "") {
      newErrorText = { ...newErrorText, lName: "Please enter your last name" };
    }
    if (phone.trim() === "") {
      alert("Please enter your mobile number");
      newErrorText = {
        ...newErrorText,
        phone: "Please enter your mobile number",
      };
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number");
      newErrorText = {
        ...newErrorText,
        phone: "Please enter a valid 10-digit mobile number",
      };
    }
    if (nic.trim() === "") {
      newErrorText = { ...newErrorText, nic: "Please enter your NIC" };
    }
    if (address.trim() === "") {
      newErrorText = { ...newErrorText, address: "Please enter your address" };
    }

    seterrortext({ ...errortext, ...newErrorText }); // Merge the new error messages with the existing state object
  };

  const handleAuth = () => {
    auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        setErrortext("");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrortext("That email address is already in use!");
          alert("That email address is already in use!");
        } else if (error.code === "auth/invalid-email") {
          setErrortext("Invalid email address");
          alert("Invalid email address");
        } else {
          setErrortext("Please check your email or password");
          alert(error.message);
        }
      });
  };

  const handleSubmit = () => {
    handleErrors();
    if (Object.values(errortext).every((value) => value === "")) {
      handleAuth();
    } else {
      alert("Please fill the form correctly");
    }

    if (ErrorText === "") {
      addDoc(colRef, {
        email: userEmail,
        firstName: fName,
        lastName: lName,
        gender: gender,
        phone: phone,
        NIC: nic,
        address: address,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          navigation.navigate("MainStack", {
            userEmail: userEmail,
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      alert("Please check your email and password");
    }
  };

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
              placeholder={userEmail}
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
            {errortext.fName !== "" && (
              <Text style={styles.errorText}>{errortext.fName}</Text>
            )}
            <TextInput
              placeholder="LastName"
              value={lName}
              onChangeText={(text) => setlName(text)}
              placeholderTextColor="#676767"
              style={formstyles.textInput}
            />
            {errortext.lName !== "" && (
              <Text style={styles.errorText}>{errortext.lName}</Text>
            )}
            <SelectDropdown
              data={genders}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setgender(selectedItem);
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
            {errortext.phone !== "" && (
              <Text style={styles.errorText}>{errortext.phone}</Text>
            )}
            <TextInput
              placeholder="NIC"
              value={nic}
              onChangeText={(text) => setnic(text)}
              placeholderTextColor="#676767"
              style={formstyles.textInput}
            />
            {errortext.nic !== "" && (
              <Text style={styles.errorText}>{errortext.nic}</Text>
            )}
            <TextInput
              placeholder={"Address line 1\n\nAddress line 2\n\nAddress line 3"}
              value={address}
              multiline={true}
              onChangeText={(text) => setaddress(text)}
              placeholderTextColor="#676767"
              style={[formstyles.textInput, { height: 120, lineHeight: 30 }]}
            />
            {errortext.address !== "" && (
              <Text style={styles.errorText}>{errortext.address}</Text>
            )}

            <TouchableOpacity
              style={[styles.LoginRegisterButton, { marginTop: 20 }]}
              activeOpacity={0.5}
              onPress={handleSubmit}
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

export default GetDetails;
