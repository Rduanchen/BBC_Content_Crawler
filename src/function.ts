import * as cheerio from "cheerio";
import { NewsContent, NewsTitles } from "./model.js";
import { BBC_IMAGE_RESOLUTION } from "./clawer.js";

function imageResolutionChanger(
  imageUrl: string,
  resolution: number = 480
): string {
  if (resolution !== 240 && resolution !== 480 && resolution !== 1024) {
    throw new Error("Invalid image resolution. Use 240, 480, or 1024.");
  }

  let pattern = `/\/standard\/(\d+)\/cpsprodpb/`;
  const match = imageUrl.match(pattern);
  const newUrl = imageUrl.replace(
    /\/standard\/\d+\/cpsprodpb/,
    `/standard/${resolution}/cpsprodpb`
  );

  return newUrl;
}

async function getNewsTitle(body: string): Promise<NewsTitles[]> {
  const $ = cheerio.load(body, { xmlMode: true }); // XML 模式
  const items = $("item");
  const result: NewsTitles[] = [];

  items.each((_i, item) => {
    const el = $(item);

    const title = el.find("title").first().text().trim();
    const description = el.find("description").first().text().trim();
    const newsLink = el.find("link").first().text().trim();

    // 嘗試從 media:thumbnail 或 enclosure 中找圖片
    let coverUrl = "";
    const mediaThumbnail = el.find("media\\:thumbnail, thumbnail");
    if (mediaThumbnail.length > 0) {
      coverUrl = mediaThumbnail.attr("url") || "";
    } else {
      const enclosure = el.find("enclosure");
      if (enclosure.length > 0 && enclosure.attr("type")?.startsWith("image")) {
        coverUrl = enclosure.attr("url") || "";
      }
    }

    coverUrl = imageResolutionChanger(coverUrl, BBC_IMAGE_RESOLUTION);
    result.push({
      coverUrl,
      title,
      description,
      newsLink,
    });
  });

  return result;
}
async function getNewsContent(body: string): Promise<NewsContent> {
  const $ = cheerio.load(body);
  const result = {
    title: "",
    author: "",
    date: "",
    content: "",
  };

  result.title = $('[data-component="headline-block"]').text().trim();
  const authorElem = $('[data-testid="byline-new-contributors"]');
  let authorText = "";
  authorElem.find("span").each((i, span) => {
    const spanText = $(span).text().trim();
    if (spanText) {
      if (i !== 0) {
        authorText += `  `;
      }
      authorText += `${spanText}`;
    }
  });
  const dateText = $("time").attr("datetime");
  console.log(dateText, authorText);

  result.author = authorText ? authorText : "";
  result.date = dateText ? dateText : "";

  let content = "";
  const textBlocks = $('[data-component="text-block"]');
  textBlocks.each((_i, block) => {
    const blockElem = $(block);
    const text = blockElem.text().trim();
    if (text) {
      content += `${text}\n`;
    }
  });
  result.content = content;
  return result;
}

export { getNewsTitle, getNewsContent };
