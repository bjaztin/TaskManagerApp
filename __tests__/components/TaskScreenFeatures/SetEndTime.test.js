import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import SetEndTime from "../../../src/components/TaskScreenFeatures/SetEndTime";

describe("SetEndTime component", () => {
  test("Render SetEndTime function correctly", async () => {
    const selectedEndTime = new Date();
    const onSelectedEndTimeChangeMock = jest.fn();

    const { getByText, getByTestId, queryByTestId } = render(
      <SetEndTime
        selectedEndTime={selectedEndTime}
        onSelectedEndTimeChange={onSelectedEndTimeChangeMock}
      />
    );

    expect(getByText("End Time")).toBeDefined();
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
