import React from "react";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import TaskUrl from "../../../src/components/TaskDetail/TaskUrl";

describe("TaskUrl component", () => {
  test("Render the task url correctly", () => {
    const url = "https://exampleVideo1234.com";
    const isComplete = false;

    const { getByText } = render(
      <NavigationContainer>
        <TaskUrl url={url} isComplete={isComplete} />
      </NavigationContainer>
    );

    const urlText = getByText(url);
    expect(urlText).toBeDefined();
  });
});
