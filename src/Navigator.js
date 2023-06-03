import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const screens = {
  Home: {
    screen: Home,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
};

const Navigator = createStackNavigator(screens, {
  defaultNavigationOptions: { headerShown: false },
});

export default createAppContainer(Navigator);
