import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TasksScreen from "./TasksScreen";
import PomodoroScreen from "./PomodoroScreen";
import MeditationScreen from "./MeditationScreen";
import React from "react";

const BottomTabNavigator = () => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 40,
          right: 40,
          elevation: 1,
          borderRadius: 50,
          height: 65,
          width: "80%",
          backgroundColor: "#D58258",
        },
        tabBarActiveTintColor: "#fbfaf8",
        tabBarInactiveTintColor: "#d7d1b5",
        tabBarLabelStyle: {
          top: 12,
          color: "#F2F0E7",
        },
        tabBarIconStyle: {
          top: 10,
        },
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-list" color={color} size={size} />
          ),
        }}
        testID="TasksTab" 
      />
      
      <Tab.Screen
        name="MeditationScreen"
        component={MeditationScreen}
        options={{
          tabBarLabel: "Meditation",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="meditation"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PomodoroScreen"
        component={PomodoroScreen}
        options={{
          tabBarLabel: "Pomodoro",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-timer" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
