import React from "react";
import { render } from "@testing-library/react-native";
import TaskTitle from "../../../src/components/TaskDetail/TaskTitle";

describe("TaskTitle component", () => {
  test("Render TaskTitle function correctly", () => {
    const task = "This is task";
    const isComplete = false;

    const { getByText } = render(
      <TaskTitle task={task} isComplete={isComplete} />
    );

    const taskTitle = getByText(task);
    expect(taskTitle).toBeDefined();
  });

  test("When task is complete, change the text to gray", () => {
    const task = "This task is completed";
    const isComplete = true;

    const { getByText } = render(
      <TaskTitle task={task} isComplete={isComplete} />
    );

    const taskTitle = getByText(task);
    expect(taskTitle).toBeDefined();
    const textStyleComplete = taskTitle.props.style[1].color;
    expect(textStyleComplete).toBe("gray");
  });
});
