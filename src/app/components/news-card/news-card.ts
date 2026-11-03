import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article';
@Component({
  imports: [CommonModule],
  selector: 'app-news-card',
  styleUrl: './news-card.css',
  templateUrl: './news-card.html',
})
export class NewsCard {
  @Input() article!: Article;
  @Output() toggleFavorite = new EventEmitter<Article>();

  public onFavoriteClick(): void {
    this.toggleFavorite.emit(this.article);
  }

}
