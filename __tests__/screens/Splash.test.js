import React from "react";
import { render, act } from "@testing-library/react-native";
import Splash from "../../src/screens/Splash";
import * as soundModule from "../../assets/sounds/openingSound.mp3";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  initializeAuth: jest.fn(() => ({})),
  getReactNativePersistence: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(),
}));

jest.mock("firebase/app", () => ({
  auth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
  })),
}));
jest.mock("expo-av", () => ({
  Audio: {
    Sound: {
      createAsync: jest.fn(() => ({
        sound: {
          playAsync: jest.fn(),
          getStatusAsync: jest.fn(() => ({
            isLoaded: true,
          })),
          setVolumeAsync: jest.fn(),
          stopAsync: jest.fn(),
          unloadAsync: jest.fn(),
        },
      })),
    },
  },
}));
jest.mock("../../firebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));


describe('Splash Component', () => {
  test('Renders the Splash Screen', async () => {
    // Mock the navigation prop
    const navigation = {
      addListener: jest.fn(),
      navigate: jest.fn(),
    };
    const { getByText } = render(<Splash navigation={navigation} />);

  });
});