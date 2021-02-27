import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../models/author.entity';
import { AuthorService } from '../services/author.service';

@Injectable()
export class AuthorListResolver implements Resolve<Author[]> {
    constructor(
      private authorService: AuthorService,
      private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Author[]> {
        return this.authorService.getAuthorList().pipe(
          catchError(error => {
            this.router.navigate(['/']);
            return [];
          })
        );
    }
}
