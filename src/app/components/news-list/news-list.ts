import { Component } from '@angular/core';
import { NewsCard } from '../news-card/news-card';
import { FormsModule } from '@angular/forms';
import { Article } from '../../models/article';
import { News } from '../../services/news';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
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

  loadingTime = 0;
  private timerInterval: any;

  public currentPage: number = 1;
  public pageSize: number = 10;
  public totalResults: number = 0;

  constructor(private newsService: News) {

  }

  public ngOnInit() {
    // this.loadNews();
  }




  private loadNews() {
    this.isLoading = true;
    this.errorMessage = '';
    this.loadingTime = 0;

    const startTime = performance.now();

    this.timerInterval = setInterval(() => {
      this.loadingTime = performance.now() - startTime;
    }, 50);

    this.newsService.getNews(this.searchQuery).subscribe({
      next: (response) => {
        this.articles = response.articles;
        this.totalResults = response.totalResults;

        this.stopTimer(startTime);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load news';
        console.error('Error fetching news:', error);

        this.stopTimer(startTime);
      }
    });
  }

  private stopTimer(startTime: number) {
    clearInterval(this.timerInterval);
    this.loadingTime = performance.now() - startTime;
    this.isLoading = false;
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }


  public onSearch() {
    this.currentPage = 1;
    this.loadNews();
  }

  public nextPage() {
    if (this.currentPage * this.pageSize < this.totalResults) {
      this.currentPage++;
      this.loadNews();
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadNews();
    }
  }
  public get totalPages(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }
  public goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadNews();
    }
  }

  get visiblePages(): number[] {
    const pages: number[] = [];

    let startPage = Math.max(1, this.currentPage - 5);
    let endPage = Math.min(this.totalPages, this.currentPage + 5);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
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
