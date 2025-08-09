import axios from "axios";

const BBC_TITLE_PAGE_URL = "https://www.bbc.com/news"; // Default BBC News title page URL
// You can override this by setting the BBC_TITLE_PAGE_URL environment variable
const BBC_ROOT_URL = "https://www.bbc.com"; // Default BBC root URL
// You can override this by setting the BBC_ROOT_URL environment variable

async function crawler(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MockBot/1.0; +http://example.com/bot)",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching page:", error.message);
    }
    return "";
  }
}

export { crawler, BBC_TITLE_PAGE_URL, BBC_ROOT_URL };
