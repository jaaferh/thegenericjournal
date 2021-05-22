import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author, AuthorDetails, AuthorsPosts } from '../models/author.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAuthorList(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + 'authors');
  }

  getAuthorPosts(): Observable<AuthorsPosts> {
    return this.http.get<AuthorsPosts>(this.baseUrl + 'authors/posts').pipe(
      map(ap => this.modifyAuthorsPosts(ap)));
  }

  authorSearch(searchKey: string): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + 'author/search/' + searchKey).pipe(
      map(a => this.modifyAuthors(a)));
  }

  getAuthorDetail(authorId: string): Observable<AuthorDetails> {
    return this.http.get<AuthorDetails>(this.baseUrl + 'author/' + authorId);
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.baseUrl + 'author/create', author);
  }

  updateAuthor(authorId: string, author: Author): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'author/' + authorId + '/update', author);
  }

  deleteAuthor(authorId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'author/' + authorId + '/delete');
  }

  private modifyAuthorsPosts(authorPost: AuthorsPosts): AuthorsPosts {
    authorPost.authors.forEach(a => a.name = a.first_name + ' ' + a.family_name);
    return authorPost;
  }

  private modifyAuthors(authors: Author[]): Author[] {
    authors.forEach(a => a.name = a.first_name + ' ' + a.family_name);
    return authors;
  }

}
