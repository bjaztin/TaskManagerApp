import React from "react";
import { render } from "@testing-library/react-native";
import TaskTagIcon from "../../../src/components/TaskDetail/TaskTagIcon";

describe("TaskTagIcon component", () => {
  test("Renders the icon with the default tag", async () => {
    const { findByTestId } = render(
      <TaskTagIcon item={{ id: "1" }} isComplete={false} />
    );
    const iconContainer = await findByTestId("tagPickerModal");
    expect(iconContainer).toBeTruthy();
  });
});