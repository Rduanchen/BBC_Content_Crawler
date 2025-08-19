import { getNewsTitle, getNewsContent } from "./function.js";
import { crawler, BBC_TITLE_PAGE_URL, setBBCEnvironment } from "./clawer.js";
import { NewsTitles, NewsContent, BBCEnviroment, BBCConfig } from "./model.js";

async function getBBCNewsTitles(): Promise<NewsTitles[]> {
  const body = await crawler(BBC_TITLE_PAGE_URL);
  return getNewsTitle(body);
}

async function getBBCNewsContent(url: string): Promise<NewsContent> {
  const body = await crawler(url);
  return getNewsContent(body);
}

function configBBC(config: BBCConfig = {}) {
  setBBCEnvironment({
    titlePageUrl: config.titlePageUrl || null,
    rootUrl: config.rootUrl || null,
    imageResolution: config.imageResolution || null,
  });
}

export {
  configBBC,
  getBBCNewsTitles,
  getBBCNewsContent,
  crawler,
  getNewsTitle,
  getNewsContent,
};
