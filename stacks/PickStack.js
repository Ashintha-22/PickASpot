import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PickaSpot from "../src/PickaSpot";
import SpotDetails from "../src/SpotDetails";

const Stack = createNativeStackNavigator();

const PickStack = ({ route, navigation }) => {
  const { user, userEmail } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="PickaSpot"
        component={PickaSpot}
        initialParams={{ user, userEmail }}
      />
      <Stack.Screen
        name="SpotDetails"
        component={SpotDetails}
        initialParams={{ user, userEmail }}
      />
    </Stack.Navigator>
  );
};

export default PickStack;
