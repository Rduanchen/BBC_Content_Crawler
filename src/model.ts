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

interface BBCEnviroment {
  titlePageUrl: string | null;
  rootUrl: string | null;
  imageResolution: "low" | "medium" | "high" | null;
}

interface BBCConfig {
  titlePageUrl?: string;
  rootUrl?: string;
  imageResolution?: "low" | "medium" | "high";
}

export { NewsContent, NewsTitles, BBCEnviroment, BBCConfig };
