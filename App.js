import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "@react-native-firebase/app";
import "react-native-gesture-handler";
import Home from "./src/Home";
import Login from "./src/Login";
import Register from "./src/Register";
import Welcome from "./src/Welcome";

//export default function App() {
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
//}
