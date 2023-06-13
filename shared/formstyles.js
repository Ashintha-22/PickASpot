import { StyleSheet, Dimensions } from "react-native";

//set window properties
const { height, width } = Dimensions.get("window");

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

export default formstyles;
