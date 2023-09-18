import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import SetTime from "../../../src/components/TaskScreenFeatures/SetTime";

describe("SetTime component", () => {
  test("Render SetTime function correctly", async () => {
    const selectedTimeMock = new Date();
    const onSelectedTimeChangeMock = jest.fn();

    const { getByText, getByTestId, queryByTestId } = render(
      <SetTime
        selectedTime={selectedTimeMock}
        onSelectedTimeChange={onSelectedTimeChangeMock}
      />
    );

    expect(getByText("Start Time")).toBeDefined();
    expect(getByTestId("timeSwitch")).toBeDefined();

    expect(queryByTestId("timePicker")).toBeNull();

    const timeSwitch = getByTestId("timeSwitch");
    act(() => {
      fireEvent.press(timeSwitch);
    });

    await waitFor(() => {
      expect(queryByTestId("timePicker")).toBeDefined();
    });
  });

});
