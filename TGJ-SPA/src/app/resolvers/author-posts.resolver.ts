import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorsPosts } from '../models/author.entity';
import { AuthorService } from '../services/author.service';

@Injectable()
export class AuthorPostsResolver implements Resolve<AuthorsPosts> {
    constructor(
      private authorService: AuthorService,
      private router: Router,
      private toaster: ToasterService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AuthorsPosts> {
        return this.authorService.getAuthorPosts().pipe(
          catchError(error => {
            this.toaster.pop('error', 'Problem retrieving data');
            void this.router.navigate(['/']);
            return [];
          })
        );
    }
}
