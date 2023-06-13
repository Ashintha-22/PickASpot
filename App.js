import "expo-dev-client";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import Home from "./src/Home";
import Login from "./src/Login";
import Register from "./src/Register";
import MainStack from "./src/MainStack";
import Header from "./shared/header";
import GetDetails from "./src/GetDetails";
import SpotForm from "./src/SpotForm";
import Map from "./src/Map";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db, colRef } from "./shared/firebase";

// initializeApp({ projectId: "pick-a-spot-mobile" });
// //init  services
// const db = getFirestore();

// //collection references
// const colRef = collection(db, "users");

//get collection data
getDocs(colRef).then((snapshot) => {
  console.log(snapshot.docs);
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="GetDetails" component={GetDetails} />
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{
            headerShown: true,
            headerBackVisible: false,
            headerTitle: () => <Header />,
          }}
        />
        <Stack.Screen name="SpotForm" component={SpotForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
