import React from "react";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabNavigator from "../../src/screens/BottomTab"; 

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
}));


// Mock the navigation components
jest.mock("@react-navigation/native", () => ({
  NavigationContainer: ({ children }) => <>{children}</>,
}));

jest.mock("@react-navigation/bottom-tabs", () => {
  const { View } = require("react-native");
  return {
    createBottomTabNavigator: jest
      .fn()
      .mockReturnValue({
        Navigator: ({ children }) => <View>{children}</View>,
        Screen: jest.fn(),
      }),
  };
});

describe("BottomTabNavigator", () => {
    it("Renders BottomTabNavigator correctly", () => {
      const { getByTestId } = render(<BottomTabNavigator />);
    
    });

});

