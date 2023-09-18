import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ImagePreview from "../../src/components/TaskScreenFeatures/ImagePreview";

describe("ImagePreview component", () => {
  test("Render ImagePreview function correctly", () => {
    const onCloseMock = jest.fn();
    const imageUrl = "https://example.com/photo.jpg";

    // Render the component
    const { getByTestId, getByText } = render(
      <ImagePreview visible={true} imageUrl={imageUrl} onClose={onCloseMock} />
    );

    const imagePreview = getByTestId("imagePreview");
    expect(imagePreview).toBeTruthy();

    const buttonClose = getByTestId("buttonClose");
    expect(buttonClose).toBeTruthy();

    fireEvent.press(buttonClose);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
