// spiski spopki
export interface ArticleSource {
    id: string | null;
    name: string;
}
export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}
export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}