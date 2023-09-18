import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import TaskDetails from "../../../src/components/TaskDetail/TaskDetails"
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock Haptics
jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Heavy: "Heavy" },
}));

// Mock TaskTagIcon
jest.mock("../../../src/components/TaskDetail/TaskTagIcon", () => ({}));

describe("TaskDetails component", () => {
  const taskItem = {
    id: "1",
    task: "This is task",
    note: "This is note",
    url: "https://example1234.com",
  };

  test("Renders task items correctly", async () => {
    // Mock functions and props
    const onDelete = jest.fn();
    const onImagePress = jest.fn();
    const onToggleComplete = jest.fn();
    const setIsTagPickerVisible = jest.fn();
    const selectedDate = "2023-09-01";
    const selectedTime = new Date("2023-09-01T11:00:00Z");
    const selectedEndTime = new Date("2023-09-01T12:00:00Z");
    const selectedImage = "https://example123.com/image.jpg";

    AsyncStorage.getItem.mockResolvedValueOnce(null);

    const { getByText, getByTestId } = render(
      <TaskDetails
        item={taskItem}
        onDelete={onDelete}
        onImagePress={onImagePress}
        onToggleComplete={onToggleComplete}
        setIsTagPickerVisible={setIsTagPickerVisible}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedEndTime={selectedEndTime}
        selectedImage={selectedImage}
      />
    );

    expect(getByText("This is task")).toBeTruthy();
    expect(getByText("This is note")).toBeTruthy();
    expect(getByText("https://example1234.com")).toBeTruthy();
  
    const completeButton = getByTestId("completeButton");

    expect(completeButton).toBeTruthy();

    fireEvent.press(completeButton);

    expect(onToggleComplete).toHaveBeenCalledWith(taskItem.id);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      `completedTask${taskItem.id}`,
      JSON.stringify(true)
    );

  });
});