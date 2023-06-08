import "expo-dev-client";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import Home from "../src/Home";
import Login from "../src/Login";
import Register from "../src/Register";
import MainStack from "../src/MainStack";
import Header from "../shared/header";

const LoginStack = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{
          headerShown: true,
          headerBackVisible: false,
          headerTitle: () => <Header />,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>;
};
export default LoginStack;
