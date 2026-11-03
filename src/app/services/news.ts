import { Service } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApiResponse } from '../models/article';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class News {
    private apiKey: string = '64d7bce4600c4308a469b62dcee39ca7';
    constructor(private http: HttpClient) { }

    public getNews(query: string = 'Russia', page: number = 1, pageSize = 10): Observable<NewsApiResponse> {
        let params = new HttpParams().set('q', query).set('page', page.toString()).set('pageSize', pageSize.toString()).set('apiKey', this.apiKey);
        const apiUrl = `https://newsapi.org/v2/everything`;
        return this.http.get<NewsApiResponse>(apiUrl, { params });
    }

}

