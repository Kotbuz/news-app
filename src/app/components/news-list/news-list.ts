import { Component } from '@angular/core';
import { NewsCard } from '../news-card/news-card';
import { FormsModule } from '@angular/forms';
import { Article } from '../../models/article';
import { News } from '../../services/news';
import { CommonModule } from '@angular/common';
@Component({
  imports: [FormsModule, NewsCard, CommonModule],
  selector: 'app-news-list',
  styleUrl: './news-list.css',
  templateUrl: './news-list.html',
})
export class NewsList {
  public articles: Article[] = [];
  public searchQuery: string = 'Россия';
  public isLoading: boolean = true;
  public errorMessage: string = '';

  constructor(private newsService: News) {
    this.loadNews()
  }

  private loadNews() {
    this.isLoading = true;
    this.newsService.getNews(this.searchQuery).subscribe({
      next: (response) => {
        this.articles = response.articles;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load news';
        this.isLoading = false;
        console.error('Error fetching news:', error);
      }
    });
  }
  public handleFavorite(article: Article) {
    alert(`Favorite toggled for article: ${article.title}`);
  }
  public get filteredArticles(): Article[] {
    if (!this.searchQuery) {
      return this.articles;
    }
    const query = this.searchQuery.toLowerCase();
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      (article.description && article.description.toLowerCase().includes(query))
    );
  }
}
