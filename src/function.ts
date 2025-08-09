import * as cheerio from "cheerio";
import { NewsContent, NewsTitles } from "./model.js";
import { BBC_ROOT_URL } from "./clawer.js";

async function getNewsTitle(body: string): Promise<NewsTitles[]> {
  const $ = cheerio.load(body);
  // 所有新聞卡片
  const cards = $('[data-testid="dundee-card"]');
  const result: NewsTitles[] = [];

  cards.each((i, card) => {
    const cardElem = $(card);

    const title = cardElem.find('[data-testid="card-headline"]').text().trim();
    const description = cardElem
      .find('[data-testid="card-description"]')
      .text()
      .trim();

    // Find cover image URL
    let imgURL = "";
    const imgElem = cardElem.find("img");
    if (imgElem.length > 0) {
      imgURL = imgElem.attr("src") || "";
    }

    // News link
    let newsLink = "";
    const linkElem = cardElem.closest("a");
    if (linkElem.length > 0) {
      newsLink = linkElem.attr("href") || "";
    } else {
      const innerLink = cardElem.find("a");
      if (innerLink.length > 0) {
        newsLink = innerLink.attr("href") || "";
      }
    }

    result.push({
      coverUrl: imgURL,
      title,
      description,
      newsLink: newsLink.startsWith("/") ? BBC_ROOT_URL + newsLink : newsLink,
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
  textBlocks.each((i, block) => {
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
