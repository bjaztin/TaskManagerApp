import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddDate from "../../../src/components/TaskScreenFeatures/AddDate";

describe("AddDate component", () => {
  test("Render AddDate function correctly", () => {
    const selectedDate = "2023-09-03"; 
    const onSelectedDateChange = jest.fn(); 

    const { getByTestId } = render(
      <AddDate
        selectedDate={selectedDate}
        onSelectedDateChange={onSelectedDateChange}
      />
    );

    expect(getByTestId("undefined.day_2023-09-03")).toBeDefined();
  });

  test("Date is change when a day is pressed", () => {
    const selectedDate = "2023-09-03";
    const onSelectedDateChange = jest.fn();

    const { getByText } = render(
      <AddDate
        selectedDate={selectedDate}
        onSelectedDateChange={onSelectedDateChange}
      />
    );
    fireEvent.press(getByText("3"));

    expect(onSelectedDateChange).toHaveBeenCalledWith("2023-09-03");
  });
});
