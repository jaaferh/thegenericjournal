import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../models/post.entity';
import { PostService } from '../services/post.service';

@Injectable()
export class PostListResolver implements Resolve<Post[]> {
    constructor(
      private postService: PostService,
      private router: Router,
      private toaster: ToasterService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post[]> {
        return this.postService.getPostList(10000).pipe(
          catchError(error => {
            this.toaster.pop('error', 'Problem retrieving data');
            void this.router.navigate(['/']);
            return [];
          })
        );
    }
}
