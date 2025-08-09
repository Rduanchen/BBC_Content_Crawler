interface NewsContent {
  title: string;
  author: string;
  date: string;
  content: string;
}

interface NewsTitles {
  coverUrl: string | null;
  title: string;
  description: string;
  newsLink: string;
}

export { NewsContent, NewsTitles };
