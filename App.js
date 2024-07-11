import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./screens/Register";
import UserPage from "./screens/UserPage";
import AdminPage from "./screens/AdminPage";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

const horizontalAnimation = {
  gestureDirection: "horizontal",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={horizontalAnimation}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            title: "หน้า LoginScreen",
            headerStyle: {
              backgroundColor: "#FF7F50",
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            title: "Login",
            headerStyle: {
              backgroundColor: "#0075FF",
            },
          }}
        />
        <Stack.Screen
          name="AdminPage"
          component={AdminPage}
          options={{
            headerShown: true,
            title: "หน้า Admin",
            headerStyle: {
              backgroundColor: "#FF7F50",
            },
          }}
        />
        <Stack.Screen
          name="UserPage"
          component={UserPage}
          options={{
            headerShown: false,
            title: "หน้า User",
            headerStyle: {
              backgroundColor: "#FF7F50",
            },
          }}
        />
    </NavigationContainer>
  );
};
export default App;
