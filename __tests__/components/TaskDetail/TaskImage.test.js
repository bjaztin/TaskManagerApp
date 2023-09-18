import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskImage from "../../../src/components/TaskDetail/TaskImage";

describe("TaskImage component", () => {
  test("Renders TaskImage function correctly", () => {
    const onImagePress = jest.fn();
    const selectedImage = "https://image123.com/photo.jpg";
    const isComplete = false;

    const { getByTestId } = render(
      <TaskImage
        selectedImage={selectedImage}
        isComplete={isComplete}
        onImagePress={onImagePress}
      />
    );

    const taskImage = getByTestId("taskImage");
    expect(taskImage).toBeDefined();

    fireEvent.press(taskImage);

    expect(onImagePress).toHaveBeenCalledWith(selectedImage);
  });
});
