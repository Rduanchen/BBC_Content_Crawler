import axios from "axios";
import { BBCEnviroment } from "./model.js";

let BBC_TITLE_PAGE_URL = "https://feeds.bbci.co.uk/news/rss.xml"; // Default BBC News title page URL
// You can override this by setting the BBC_TITLE_PAGE_URL environment variable
let BBC_ROOT_URL = "https://www.bbc.com"; // Default BBC root URL
// You can override this by setting the BBC_ROOT_URL environment variable
let BBC_IMAGE_RESOLUTION = 480; // Default BBC image resolution
// You can override this by setting the BBC_IMAGE_RESOLUTION environment variable

function imageResolutionSetting(resolution: "low" | "medium" | "high"): void {
  switch (resolution) {
    case "low":
      BBC_IMAGE_RESOLUTION = 240;
      break;
    case "medium":
      BBC_IMAGE_RESOLUTION = 480;
      break;
    case "high":
      BBC_IMAGE_RESOLUTION = 1024;
      break;
  }
}

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

function setBBCEnvironment(BBCEnvironment: BBCEnviroment): void {
  BBC_TITLE_PAGE_URL = BBCEnvironment.titlePageUrl
    ? BBCEnvironment.titlePageUrl
    : BBC_TITLE_PAGE_URL;
  BBC_ROOT_URL = BBCEnvironment.rootUrl ? BBCEnvironment.rootUrl : BBC_ROOT_URL;
  if (BBCEnvironment.imageResolution) {
    imageResolutionSetting(BBCEnvironment.imageResolution);
  }
}

export {
  crawler,
  BBC_TITLE_PAGE_URL,
  BBC_ROOT_URL,
  setBBCEnvironment,
  BBC_IMAGE_RESOLUTION,
};
