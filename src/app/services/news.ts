import { Service } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApiResponse } from '../models/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class News {
    private apiKey: string = '64d7bce4600c4308a469b62dcee39ca7'; // Replace with your API key

    constructor(private http: HttpClient) { }

    public getNews(query: string): Observable<NewsApiResponse> {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2026-10-30&sortBy=publishedAt&apiKey=${this.apiKey}`;
        return this.http.get<NewsApiResponse>(apiUrl);
    }

}

