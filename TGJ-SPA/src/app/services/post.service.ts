import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.entity';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPostList(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'posts');
  }

  postSearch(searchKey: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'post/search/' + searchKey);
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
