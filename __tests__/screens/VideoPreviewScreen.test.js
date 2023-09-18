import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import VideoPreviewScreen from "../../src/screens/VideoPreviewScreen";

jest.mock("react-native-webview", () => ({
  WebView: "WebView",
}));

describe("VideoPreviewScreen Component", () => {
    test("Render VideoPreviewScreen correctly", () => {
      render(
        <NavigationContainer>
          <VideoPreviewScreen
            route={{
              params: { url: "https://www.youtube.com/watch?v=rrLkhg3fA0M" },
            }}
          />
        </NavigationContainer>
      );
    });
  test('Navigate to TaskScreen when the "Back" button is pressed', () => {

    const mockNavigate = jest.fn();
    const { getByText } = render(
      <VideoPreviewScreen
        route={{ params: { url: "https://example.com" } }}
        navigation={{ navigate: mockNavigate }}
      />
    );

    const backButton = getByText("Back");
    fireEvent.press(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("Tasks");
  });
});

