import React from "react";
import { render } from "@testing-library/react-native";
import TaskNote from "../../../src/components/TaskDetail/TaskNote";

describe("TaskNote component", () => {
  test("Render TaskNote function correctly", () => {
    const note = "This is the task note";
    const isComplete = false;

    const { getByText } = render(
      <TaskNote note={note} isComplete={isComplete} />
    );

    const noteTask = getByText(note);
    expect(noteTask).toBeDefined();
  });

  test(" Change the text to gray, when task note is completed", () => {
    const note = "This task note is completed";
    const isComplete = true;

    const { getByText } = render(
      <TaskNote note={note} isComplete={isComplete} />
    );

    const noteTask = getByText(note);
    expect(noteTask).toBeDefined();
    const textStyleComplete = noteTask.props.style[1].color;
    expect(textStyleComplete).toBe("gray");
  });
});
