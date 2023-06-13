import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import PickaSpot from "./PickaSpot";
import ProvideStack from "../stacks/ProvideStack";
import PickStack from "../stacks/PickStack";
import ProvideaSpot from "./ProvideaSpot";
import SpotForm from "./SpotForm";

const Tab = createBottomTabNavigator();

const MainStack = ({ route, navigation }) => {
  const { user, userEmail } = route.params;

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (!user || !userEmail) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 16, // Adjust the font size to your desired value
          },
          tabBarLabel: ({ focused, color }) => {
            let labelName;

            if (route.name === "PickStack") {
              labelName = "Pick a Spot";
            } else if (route.name === "ProvideStack") {
              labelName = "Provide a Spot";
            }

            return <Text style={{ color }}>{labelName}</Text>;
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "PickStack") {
              iconName = focused ? "car-sport" : "car-sport-outline";
            } else if (route.name === "ProvideStack") {
              iconName = focused ? "location" : "location-outline";
            }

            // Adjust the size value to your desired icon size
            const iconSize = 30; // Change this to your preferred size

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: "#2660CB",
          tabBarActiveBackgroundColor: "#f6f8ff",
          //tabBarInactiveTintColor: "#2660CB",
          //tabBarInactiveBackgroundColor: "#f6f8ff",
        })}
      >
        <Tab.Screen
          name="PickStack"
          component={PickStack}
          initialParams={{ user, userEmail }}
        />
        <Tab.Screen
          name="ProvideStack"
          component={ProvideStack}
          initialParams={{ user, userEmail }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
