import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ApiCalls from "../../src/utilities/ApiCalls";

describe("ApiCalls component", () => {
  test("Calls the selected Api content correctly", () => {
    
    const mockSnippet = {
      title: "title",
      thumbnails: {
        maxres: {
          url: "https://example1234.com/thumbnail.jpg",
        },
      },
      resourceId: {
        videoId: "videoId",
      },
    };

    const onVideoSelectMock = jest.fn();
    const onAddToTaskMock = jest.fn();

    const { getByText, getByTestId } = render(
      <ApiCalls
        snippet={mockSnippet}
        onVideoSelect={onVideoSelectMock}
        onAddToTask={onAddToTaskMock}
      />
    );

    expect(getByText("title")).toBeDefined();

    const addTask = getByTestId("addTask");
    expect(addTask).toBeDefined();

    fireEvent.press(addTask);

    expect(onAddToTaskMock).toHaveBeenCalledWith("title", {
      videoId: "videoId",
    });

    fireEvent.press(getByText("title"));

    expect(onVideoSelectMock).toHaveBeenCalledWith(
      "https://www.youtube.com/watch?v=videoId"
    );
  });
});
