import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import ReportUser from "./ReportUser";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();
export default function UserPage() {
    return (
        <Tab.Navigator
            initialRouteName="UserPage"
            screenOptions={{
                tabBarActiveTintColor: "black",
                activeColor: "#f0edf6",
                inactiveColor: "#3e2465",
            }}
            barStyle={{ paddingBottom: 48 }}
        >
            <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
                tabBarLabel: "Home",
                headerShown: true,
                headerStyle: {
                  backgroundColor: "#82BBFF",
                }, 
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color="black" size={18} />
                ),
              }}
            />
            <Tab.Screen
            name="ReportUser"
            component={ReportUser}
            options={{
                tabBarLabel: "Report",
                headerShown: true,
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="document-text" color="black" size={18} />
              ),
            }}
          />
            <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                tabBarLabel: "Profile",
                headerShown: true,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person" color="black" size={18} />
                ),
              }}
            />
        </Tab.Navigator>
    );
}