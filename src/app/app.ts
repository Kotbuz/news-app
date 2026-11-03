import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewsList } from './components/news-list/news-list';


@Component({
  imports: [RouterOutlet, NewsList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

}
