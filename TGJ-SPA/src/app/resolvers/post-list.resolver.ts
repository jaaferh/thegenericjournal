import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../models/post.entity';
import { AlertifyService } from '../services/alertify.service';
import { PostService } from '../services/post.service';

@Injectable()
export class PostListResolver implements Resolve<Post[]> {
    constructor(
      private postService: PostService,
      private router: Router,
      private alertify: AlertifyService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
        return this.postService.getPostList().pipe(
          catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/']);
            return [];
          })
        );
    }
}
