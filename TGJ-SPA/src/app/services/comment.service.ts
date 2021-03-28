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

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'comment/' + commentId + '/delete');
  }

}
