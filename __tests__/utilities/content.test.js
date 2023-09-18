import { getContent } from "../../src/utilities/Content";

describe("Content component", () => {
  test("Get and returns the Api content", async () => {
    const mockResponse = {
      items: [
        { id: 1, snippet: { title: "title 1" } },
        { id: 2, snippet: { title: "title 2" } },
      ],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const apiContent = await getContent();

    expect(global.fetch).toHaveBeenCalledWith(
     "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLgdxvG3UlbicDUrlxlbsrTY_gfY0Wyx2a&key=AIzaSyDEjpzg6DdhkX5j9MnScPHOfKH3_YzfVWQ"
    );

    expect(apiContent).toEqual(mockResponse.items);
  });
});
