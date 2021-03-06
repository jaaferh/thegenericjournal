import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.entity';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl + 'comment/create', comment);
  }

  updateComment(commentId: string, comment: Comment): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'comment/' + commentId + '/update', comment);
  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'comment/' + commentId + '/delete');
  }

  like(commentId: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'comment/' + commentId + '/like', null);
  }

  dislike(commentId: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'comment/' + commentId + '/dislike', null);
  }

}
