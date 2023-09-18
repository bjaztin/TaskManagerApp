import React from "react";
import { render } from "@testing-library/react-native";
import CustomGreeting from "../../../src/components/TaskScreenFeatures/CustomGreeting";

describe("CustomGreeting component", () => {
  test('Greet "Good Morning!" when it is morning', () => {
    const morningTime = new Date(2023, 0, 1, 10, 0, 0); 
    const date = jest
      .spyOn(global, "Date")
      .mockImplementation(() => morningTime);

    const { getByText } = render(<CustomGreeting />);
    const text = getByText(/Good Morning/);

    expect(text).toBeDefined();

    date.mockRestore();
  });

  test('Greet "Good Afternoon!" when it is afternoon', () => {
    const afternoonTime = new Date(2023, 0, 1, 15, 0, 0); 
    const date = jest
      .spyOn(global, "Date")
      .mockImplementation(() => afternoonTime);

    const { getByText } = render(<CustomGreeting />);
    const text = getByText(/Good Afternoon/);

    expect(text).toBeDefined();

    date.mockRestore();
  });

  test('Greet "Good Evening!" when it is evening', () => {
    const eveningTime = new Date(2023, 0, 1, 19, 0, 0); 
    const date = jest
      .spyOn(global, "Date")
      .mockImplementation(() => eveningTime);
    ``;
    const { getByText } = render(<CustomGreeting />);
    const text = getByText(/Good Evening/);

    expect(text).toBeDefined();

    date.mockRestore();
  });
});
