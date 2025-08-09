# BBC News Crawler

This project is a simple web crawler for extracting news titles and content from the BBC News website.
Please note that this crawler is designed for educational purposes and may not comply with the BBC's terms of service. Use it responsibly and ensure you have permission to scrape their content.

## Features

- Crawl the BBC News homepage for article titles and links.
- Fetch the full content of individual news articles.

## Usage

1. Install dependencies:

```bash
npm install
```

2. Run the crawler:

```bash
npm start
```

3. Example usage in a script:

```typescript
import { getBBCNewsTitles, getBBCNewsContent } from "./src/index.js";
async function main() {
  const titles = await getBBCNewsTitles();
  console.log("Latest BBC News Titles:");
  titles.forEach((title) => {
    console.log(`${title.title} - ${title.link}`);
  });

  if (titles.length > 0) {
    const content = await getBBCNewsContent(titles[0].link);
    console.log(`Content of the first article: ${content.content}`);
  }
}
main().catch(console.error);
```

4. Main functions:

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
