import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OnBoarding from "../../src/screens/OnBoarding";

describe("OnBoarding Component", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId } = render(<OnBoarding />);

    expect(getByTestId("Taskly")).toBeTruthy();
    expect(
      getByText("Efficient task management at your fingertips")
    ).toBeTruthy();
    expect(getByTestId("getStarted")).toBeTruthy();
  });

  it("navigates to LogIn screen when 'Get Started' is pressed", () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByTestId } = render(<OnBoarding navigation={navigation} />);

    fireEvent.press(getByTestId("getStarted"));

    expect(navigation.navigate).toHaveBeenCalledWith("LogIn");
  });
});
