import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskCompleteButton from "../../../src/components/TaskDetail/TaskCompleteButton";

describe("TaskCompleteButton component", () => {
  test("Renders TaskCompleteButton function when isComplete is false", () => {
    const onPress = jest.fn();

    const { getByTestId } = render(
      <TaskCompleteButton isComplete={false} onPress={onPress} />
    );

    // Find the button by test ID
    const button = getByTestId("completeButton");

    // Ensure that the unchecked button is rendered
    expect(button).toBeTruthy();
  });

  test("When the checked button is pressed, call the onPress function", () => {
    const onPress = jest.fn();

    // Render the component with onPress function
    const { getByTestId } = render(
      <TaskCompleteButton isComplete={false} onPress={onPress} />
    );

    // Find the button by test ID
    const button = getByTestId("completeButton");

    fireEvent.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
