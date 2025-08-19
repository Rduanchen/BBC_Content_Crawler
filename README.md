# BBC News Scraper

This project is a simple web scraper for extracting news titles and content from the BBC News website.
Please note that this scraper is designed for educational purposes and may not comply with the BBC's terms of service. Use it responsibly and ensure you have permission to scrape their content.

## Features

- Crawl the BBC News homepage for article titles and links.
- Fetch the full content of individual news articles.

## Usage

1. Install dependencies:

```bash
npm install bbc-scraper
```

2. Example usage in a script:

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

## Function Explanation

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

## Issues

If you encounter any issues while using the BBC News Scraper, please check the [issues](https://github.com/Rduanchen/BBC_Scraper/issues) page for known problems and solutions. If your issue is not listed, feel free to open a new issue with a detailed description of the problem.

## Self-develop guide

1. Clone the repository:  
   You will need to fork this repository first, then clone your fork. you can fork this repository from [https://github.com/Rduanchen/BBC_Scraper](https://github.com/Rduanchen/BBC_Scraper).

```bash
git clone https://github.com/<yourusername>/BBC_Scraper.git
cd BBC_Scraper
```

2. Install dependencies:

```bash
npm install
```

3. Start developing:

```bash
npm run dev
```

4. Run tests:

```bash
npm test
```

## Collaboration

We welcome contributions to the BBC News Scraper project! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

## Author

My name is Rduan(Justin), you can contact me via email:
chenyouduan@gmail.com
