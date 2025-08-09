import { getNewsTitle, getNewsContent } from "./function.js";
import { crawler, BBC_TITLE_PAGE_URL } from "./clawer.js";
import { NewsTitles, NewsContent } from "./model.js";

async function getBBCNewsTitles(): Promise<NewsTitles[]> {
  const body = await crawler(BBC_TITLE_PAGE_URL);
  return getNewsTitle(body);
}

async function getBBCNewsContent(url: string): Promise<NewsContent> {
  const body = await crawler(url);
  return getNewsContent(body);
}

export {
  getBBCNewsTitles,
  getBBCNewsContent,
  crawler,
  getNewsTitle,
  getNewsContent,
};
