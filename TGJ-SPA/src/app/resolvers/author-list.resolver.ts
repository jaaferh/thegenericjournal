import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author, AuthorsPosts } from '../models/author.entity';
import { AlertifyService } from '../services/alertify.service';
import { AuthorService } from '../services/author.service';

@Injectable()
export class AuthorListResolver implements Resolve<AuthorsPosts> {
    constructor(
      private authorService: AuthorService,
      private router: Router,
      private alertify: AlertifyService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AuthorsPosts> {
        return this.authorService.getAuthorPosts().pipe(
          catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/']);
            return [];
          })
        );
    }
}
