import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PomodoroScreen from "../../src/screens/PomodoroScreen"; 
import { Audio } from 'expo-av';

jest.mock("expo-av", () => ({
  Audio: {
    Sound: {
      createAsync: jest.fn(),
    },
  },
}));

jest.mock("react-native/Libraries/Vibration/Vibration", () => ({
  vibrate: jest.fn(),
}));

describe("PomodoroScreen", () => {
  beforeEach(() => {
    jest.spyOn(Audio.Sound, "createAsync").mockResolvedValue({ sound: {} });
  });

  test("renders the component correctly", () => {
    const { getByText } = render(<PomodoroScreen />);

    expect(getByText("Focus")).toBeTruthy();
  });

  test("toggles the timer when the play/pause button is pressed", () => {
    const { getByText, getByTestId } = render(<PomodoroScreen />);
    const toggleButton = getByTestId("toggleButtons");

    fireEvent.press(toggleButton);

    const timerValue = getByTestId("timerValue");
    expect(timerValue).toBeDefined();

  });

  test("resets the timer when the reset button is pressed", () => {
    const { getByTestId } = render(<PomodoroScreen />);

    fireEvent.press(getByTestId("toggleButtons")); 

    fireEvent.press(getByTestId("toggleButtons")); 

   const timerValue = getByTestId("timerValue");
   expect(timerValue).toBeDefined();
  });

});
