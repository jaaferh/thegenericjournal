import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post, PostFilter } from '../models/post.entity';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPostList(maxCount: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'posts/' + maxCount.toString());
  }

  postSearch(searchKey: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'post/search/' + searchKey);
  }

  postFilter(filter: PostFilter): Observable<Post[]> {
    let params = new HttpParams();
    if (filter.topics !== undefined) {
      filter.topics?.forEach(t => {
        params = params.append('topics[]', t._id);
      });
    }
    if (filter.authorName !== undefined)
      params = params.append('authorName', filter.authorName);
    if (filter.dateFrom !== undefined)
      params = params.append('dateFrom', filter.dateFrom?.toString());
    if (filter.dateTo !== undefined)
      params = params.append('dateTo', filter.dateTo?.toString());

    return this.http.get<Post[]>(this.baseUrl + 'post/filter', { params });
  }

  getPostDetail(postId: string): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + 'post/' + postId);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl + 'post/create', post);
  }

  updatePost(postId: string, post: Post): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'post/' + postId + '/update', post);
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'post/' + postId + '/delete');
  }
}
