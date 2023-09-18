import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Register from "../../src/screens/Register";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; 

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getFirestore: jest.fn(),
}));

jest.mock("firebase/auth", () => ({

  createUserWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({ user: { email: "adminTest@example.com" } })
  ),
  getReactNativePersistence: jest.fn(),
  initializeAuth: jest.fn(),
}));

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  initializeAuth: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  ReactNativeAsyncStorage: jest.fn(),
  getReactNativePersistence: jest.fn(),
}));

const navigateMock = jest.fn();

describe("Register Component", () => {
  test("renders the Register screen correctly", () => {
    const { getByTestId, getByText } = render(<Register />);

    expect(getByText("Create Account")).toBeTruthy();
    expect(getByTestId("name")).toBeDefined();
    expect(getByTestId("email")).toBeDefined();
    expect(getByTestId("password")).toBeDefined();
    expect(getByTestId("signup")).toBeDefined();
  });

  test("handles user input and registration correctly", async () => {
    const { getByTestId } = render(
      <Register navigation={{ navigate: navigateMock }} />
    );

      const name = "Addison Dae";
      const email = "addison.dae@example.com";
      const password = "testpassword";
  
    fireEvent.changeText(getByTestId("name"), name);
    fireEvent.changeText(getByTestId("email"), email);
    fireEvent.changeText(getByTestId("password"), password);

    fireEvent.press(getByTestId("signup"));

     await waitFor(() => {
       expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
         auth,
         email,
         password
       );
       expect(navigateMock).toBeDefined();
     });

  });
});