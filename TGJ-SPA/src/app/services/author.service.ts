import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author.entity';
import { PaginatedResult } from '../models/pagination.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAuthorList(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + 'authors');
  }

}
