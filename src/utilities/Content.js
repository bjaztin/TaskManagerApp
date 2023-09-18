const url =
  "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLgdxvG3UlbicDUrlxlbsrTY_gfY0Wyx2a&key=AIzaSyBsUhTk0nrXdJPItqOYLwD16JtozFkJJ18";

export async function getContent() {
  try {
    let response = await fetch(url);
    let result = await response.json();

    console.log("This is the data:", result.items);
    return result.items;
  } catch (error) {
    console.error(error);
    return [];
  }
}
