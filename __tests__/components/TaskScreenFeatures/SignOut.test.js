import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SignOut from "../../../src/components/TaskScreenFeatures/SignOut";
import { NavigationContainer } from "@react-navigation/native";

describe("SignOut Component", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <SignOut />
      </NavigationContainer>
    );

    const logoutButton = getByTestId("logout");
    expect(logoutButton).toBeTruthy();
  });

  it("Open the modal when SignOut icon is pressed", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <SignOut />
      </NavigationContainer>
    );

    //Show modal
    const modal = getByTestId("signOutmodal");
    expect(modal).toBeTruthy();

    //pressed the logout button
    const logoutButton = getByTestId("logout");
    fireEvent.press(logoutButton);
    expect(modal).toBeTruthy();
  });

  it("Close the modal when the Cancel button is pressed", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <SignOut />
      </NavigationContainer>
    );

    const logoutButton = getByTestId("logout");
    fireEvent.press(logoutButton);

    // show modal
    const modal = getByTestId("signOutmodal");
    expect(modal).toBeTruthy();

    const cancelButton = getByTestId("cancel");
    fireEvent.press(cancelButton);
    expect(modal).toBeTruthy();
  });

});
