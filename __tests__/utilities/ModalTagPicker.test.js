import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ModalTagPicker from "../../src/utilities/ModalTagPicker";

describe("ModalTagPicker", () => {
  test("Renders ModalTagPicker correctly", () => {
    const { getByTestId } = render(<ModalTagPicker />);

    expect(getByTestId("modal")).toBeDefined();

    expect(getByTestId("labelTag_0")).toBeDefined();
    expect(getByTestId("labelTag_1")).toBeDefined();
    expect(getByTestId("labelTag_2")).toBeDefined();
    expect(getByTestId("labelTag_3")).toBeDefined();
  });

  test("calls the appropriate callback when an option is selected", () => {
    const onTagSelected = jest.fn();
    const changeTagPickerModal = jest.fn();

    const { getByText, getByTestId } = render(
      <ModalTagPicker
        onTagSelected={onTagSelected}
        changeTagPickerModal={changeTagPickerModal}
      />
    );

    //Simulate the tags
    fireEvent.press(getByTestId("labelTag_0"));
    fireEvent.press(getByTestId("labelTag_1"));
    fireEvent.press(getByTestId("labelTag_2"));
    fireEvent.press(getByTestId("labelTag_3"));     

    expect(onTagSelected).toHaveBeenCalledWith("Red Tag");
    expect(onTagSelected).toHaveBeenCalledWith("Orange Tag");
    expect(onTagSelected).toHaveBeenCalledWith("Green Tag");
    expect(onTagSelected).toHaveBeenCalledWith("label-outline");

    expect(changeTagPickerModal).toHaveBeenCalledWith(false);
  });

  test("modal becomes visible when component is rendered", () => {
    const { getByTestId } = render(<ModalTagPicker />);
    const modal = getByTestId("modal");
    expect(modal).toBeDefined();
  });
});
