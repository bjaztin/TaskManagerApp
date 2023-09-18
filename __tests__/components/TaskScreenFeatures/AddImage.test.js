import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddImage from "../../../src/components/TaskScreenFeatures/AddImage";

describe("AddImage component", () => {
  test("Render AddImage function correctly", async () => {
    const selectedImage = "https://example1234.com/image.jpg";
    const onSelectedImageMock = jest.fn();
    const { getByTestId } = render(
      <AddImage
        selectedImage={selectedImage}
        onSelectedImage={onSelectedImageMock}
      />
    );

    expect(getByTestId("image")).toBeDefined();

    const image = getByTestId("image");
    fireEvent.press(image);
  });
});
