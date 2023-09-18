import React from "react";
import { render } from "@testing-library/react-native";
import TaskTime from "../../../src/components/TaskDetail/TaskTime";

describe("TaskTime component", () => {
  test("Renders the selected time function correctly", () => {
    const selectedTime = new Date("2023-09-01T08:30:00");
    const selectedEndTime = new Date("2023-09-01T09:00:00");
    const isComplete = false;

    const { getByText } = render(
      <TaskTime
        selectedTime={selectedTime}
        selectedEndTime={selectedEndTime}
        isComplete={isComplete}
      />
    );
    expect(getByText(",\n8:30 AM")).toBeTruthy();
    expect(getByText("- 9:00 AM")).toBeTruthy();
  });
});
