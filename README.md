# BBC News Scraper

This project is a simple web scraper for extracting news titles and content from the BBC News website.
Please note that this scraper is designed for educational purposes and may not comply with the BBC's terms of service. Use it responsibly and ensure you have permission to scrape their content.

## Features

- Crawl the BBC News homepage for article titles and links.
- Fetch the full content of individual news articles.

## Usage

1. Install dependencies:

```bash
npm install
```

2. Run the scraper:

```bash
npm start
```

3. Example usage in a script:

```typescript
import { getBBCNewsTitles, getBBCNewsContent, configBBC } from "bbc-scraper";
async function main() {
  configBBC({
    imageResolution: "low", // "medium", "high"
  });
  const titles = await getBBCNewsTitles();
  console.log("Latest BBC News Titles:");
  titles.forEach((title) => {
    console.log(`${title.title} - ${title.newsLink}`);
  });

  if (titles.length > 0) {
    const content = await getBBCNewsContent(titles[0].newsLink);
    console.log(`Content of the first article: ${content.content}`);
  }
}
main().catch(console.error);
```

4. Main functions:

- `configBBC(config: BBCConfig): void`: Configures the BBC scraper environment.
  Parameters:

  - imageResolution: you can use "low", "medium", or "high".
  - titlePageUrl: the URL of the BBC News title page. PLEASE DO NOT SET THIS UNLESS YOU KNOW WHAT YOU'RE DOING.
  - rootUrl: the root URL of the BBC News website. PLEASE DO NOT SET THIS UNLESS YOU KNOW WHAT YOU'RE DOING.

- `crawler(url: string): Promise<string>`: Fetches the HTML content of a given URL. This function returns a promise that resolves to the HTML content as a string.

- `getBBCNewsTitles(): Promise<NewsTitles[]>`: Fetches the titles and links of the latest news articles from the BBC News homepage.

- `getBBCNewsContent(url: string): Promise<NewsContent>`: Fetches the full content of a news article given its URL.

- `getNewsTitle(body: string): NewsTitles[]`: Extracts news titles and links from the HTML content.
- `getNewsContent(body: string): NewsContent`: Extracts the full content of a news article from the HTML content.

## Models

- `NewsTitles`: Represents a news title with its text and link.

```json
{
  "coverUrl": "string | null",
  "title": "string",
  "description": "string",
  "newsLink": "string"
}
```

- `NewsContent`: Represents the full content of a news article.

```json
{
  "title": "string",
  "author": "string",
  "date": "string",
  "content": "string"
}
```

- `BBCEnvironment`: Represents the environment configuration for the BBC scraper.

```json
{
  "titlePageUrl": "string | null",
  "rootUrl": "string | null",
  "imageResolution": "string | null" // "low", "medium", "high"
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
