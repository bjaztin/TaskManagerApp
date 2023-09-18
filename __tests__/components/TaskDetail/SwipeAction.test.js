import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import SwipeAction from "../../../src/components/TaskDetail/SwipeAction";

describe("SwipeAction component", () => {
  test("Render SwipeAction function correctly", async () => {

    const onDeleteMock = jest.fn();

    const { getByText, getByTestId } = render(
      <SwipeAction onDelete={onDeleteMock} />
    );

    const onSwipe = getByTestId("onSwipe");

    act(() => {
      fireEvent(onSwipe, "isSwipeableOpen");
    });

    const deleteButton = getByTestId("deleteButton");
    act(() => {
      fireEvent.press(deleteButton);
    });
    
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
