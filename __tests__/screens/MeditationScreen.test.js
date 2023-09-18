import React from "react";
import { render, act, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import MeditationScreen from "../../src/screens/MeditationScreen";
import * as Content from "../../src/utilities/Content";

jest.mock("../../src/utilities/Content", () => ({
  getContent: jest.fn().mockResolvedValue({ items: mockVideoData })
}));

const mockVideoData = [
  {
    id: "1",
    snippet: {
      title: "video title",
      playlistId: "playlistIdOne",
      resourceId: "resourceIdOne",
    },
  },
  {
    id: "2",
    snippet: {
      title: "video title",
      playlistId: "playlistIdTwo",
      resourceId: "resourceIdTwo",
    },
  },
];

describe("MeditationScreen component", () => {
  test("Renders the Meditation content correctly", () => {
    render(
      <NavigationContainer>
        <MeditationScreen />
      </NavigationContainer>
    );
  });

  test("Fetch the list of videos", async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <MeditationScreen />
      </NavigationContainer>
    );

    await act(async () => {
      await waitFor(() => {
        expect(getByTestId("api-content")).toBeDefined();
        expect(Content.getContent).toHaveBeenCalledTimes(2);
      });
    });
  });
});
