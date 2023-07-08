import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PickaSpot from "../src/PickaSpot";
import BookSpotDetails from "../src/BookSpotDetails";
import Map from "../src/Map";

const Stack = createNativeStackNavigator();

const PickStack = ({ route, navigation }) => {
  const { user, userEmail, firtName } = route.params;

  console.log("PickStack userEmail: ", userEmail);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="PickaSpot"
        component={PickaSpot}
        initialParams={{ user, userEmail, firtName }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        initialParams={{ user, userEmail }}
      />
      <Stack.Screen
        name="BookSpotDetails"
        component={BookSpotDetails}
        initialParams={{ user, userEmail }}
      />
    </Stack.Navigator>
  );
};

export default PickStack;
