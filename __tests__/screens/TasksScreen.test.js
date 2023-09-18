import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TasksScreen from "../../src/screens/TasksScreen";
import { NavigationContainer } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

jest.mock("expo-haptics", () => ({
  Haptics: {
    impactAsync: jest.fn(),
    ImpactFeedbackStyle: {
      Light: "Light", 
    },
  },
}));

jest.mock("../../firebase", () => ({
  auth: {
    currentUser: {
      uid: "kbooz37ipoWcOL9GRFXLfnOthov2", 
    },
  },
  createUserWithEmailAndPassword: jest.fn(),
  getReactNativePersistence: jest.fn(),
  initializeAuth: jest.fn(),
}));

jest.mock('expo-notifications', () => ({
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
}));

jest.mock("expo-image-picker", () => ({
}));

jest.mock("expo-calendar", () => ({
  requestCalendarPermissionsAsync: jest
    .fn()
    .mockResolvedValue({ status: "granted" }),
  getCalendarsAsync: jest.fn().mockResolvedValue([
    {
      id: "1",
      allowsModifications: true,
      type: "local",
    },
  ]),
  createEventAsync: jest.fn(),
  deleteEventAsync: jest.fn(),
  EntityTypes: {
    EVENT: "event",
  },
}));

const mockRoute = {
  params: {
    openBottomSheetModal: false,
    title: "Sample Task",
    resourceId: {
      videoId: "sampleVideoId",
    },
  },
};

test("Renders TasksScreen correctly", () => {
  const { getByText, getByTestId } = render(
    <NavigationContainer>
      <TasksScreen route={mockRoute} />
    </NavigationContainer>
  );

 const greetingElement = getByText("Your Tasks");
 const newTaskButton = getByTestId("newTaskButton");

 expect(greetingElement).toBeTruthy();
 expect(newTaskButton).toBeTruthy();
 
});

test('Handle the "New Task" button press', () => {
const { getByTestId } = render(
  <NavigationContainer>
    <TasksScreen route={mockRoute} />
  </NavigationContainer>
);
const newTaskButton = getByTestId("newTaskButton");

fireEvent.press(newTaskButton);
});
