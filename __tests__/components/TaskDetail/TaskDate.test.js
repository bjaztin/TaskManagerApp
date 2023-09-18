import React from "react";
import { render } from "@testing-library/react-native";
import TaskDate from "../../../src/components/TaskDetail/TaskDate";

describe("TaskDate component", () => {
  test("Renders the task date function correctly ", () => {
    const selectedDate = "2023-09-07";
    const isComplete = false;

    const { getByText } = render(
      <TaskDate selectedDate={selectedDate} isComplete={isComplete} />
    );

    expect(getByText("9/7/2023")).toBeDefined();
  });

  test("When task is complete, change the selected date text to gray", () => {
    const selectedDate = "2023-09-07";
    const isComplete = true;

    const { getByText } = render(
      <TaskDate selectedDate={selectedDate} isComplete={isComplete} />
    );

    const text = getByText("9/7/2023");
    expect(text).toBeDefined();
    const textStyleComplete = text.props.style[1].color;
    expect(textStyleComplete).toBe("gray");
  });
});
