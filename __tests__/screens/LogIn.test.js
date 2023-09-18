import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import LogIn from "../../src/screens/LogIn";

describe("LogIn Component", () => {
  it("renders the LogIn screen correctly", () => {
    const { getByTestId, getByText } = render(<LogIn />);

    expect(getByText("Sign In")).toBeTruthy();
    expect(getByTestId("email-input")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();
    expect(getByTestId("login-button")).toBeTruthy();
  });

  it("Handle users input", () => {
    const { getByTestId } = render(<LogIn />);

    fireEvent.changeText(getByTestId("email-input"), "admin@example.com");
    fireEvent.changeText(getByTestId("password-input"), "adminpassword");
    fireEvent.press(getByTestId("login-button"));
  });
});
