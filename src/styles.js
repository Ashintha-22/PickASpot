import { StyleSheet, Dimensions } from "react-native";

//set window properties
const { height, width } = Dimensions.get("window");
console.log(height, width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  image: {
    resizeMode: "contain",
    width: width,
    height: height,
    bottom: 265,
    zIndex: 0,
  },
  rectangle: {
    width: width,
    height: height,
    backgroundColor: "blue",
    position: "absolute",
    bottom: 0,
  },
  formContianer: {
    flex: 1,
    justifyContent: "center",
    width: width,
    height: 600,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 250,
    backgroundColor: "#F6F8FF",
    zIndex: 1,
  },
  textInput: {
    height: 60,
    width: width - 60,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    paddingLeft: 20,
    elevation: 2,
  },
  pageTitle: {
    fontSize: 30,
    color: "#273189",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: 20,
    fontFamily: "Raleway",
    margin: 10,
  },
  forgotPassword: {
    fontSize: 15,
    color: "#5C8AFF",
    alignSelf: "flex-end",
    textAlign: "right",
    fontFamily: "Raleway",
    marginTop: 5,
    marginRight: 32,
  },
  googleSignInButton: {
    height: 60,
    width: width - 60,
    borderRadius: 30,
    backgroundColor: "white",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
      alignItems: "center",
      justifyContent: "center",
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    color: "#676767",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Raleway",
    alignSelf: "center",
    marginLeft: 20,
  },
  signincontainer: {
    marginTop: 10,
    width: width - 60,
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signinbutton: {
    marginLeft: 160,
    alignItems: "flex-end",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default styles;