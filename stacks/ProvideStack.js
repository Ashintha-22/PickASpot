import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SpotForm from "../src/SpotForm";
import { View, Text } from "react-native";
import React from "react";
import ProvideaSpot from "../src/ProvideaSpot";

const Stack = createNativeStackNavigator();

const ProvideStack = ({ route, navigation }) => {
  const { user, userEmail } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProvideaSpot"
        component={ProvideaSpot}
        initialParams={{ user, userEmail }}
      />
      <Stack.Screen
        name="SpotForm"
        component={SpotForm}
        initialParams={{ user, userEmail }}
      />
    </Stack.Navigator>
  );
};

export default ProvideStack;
