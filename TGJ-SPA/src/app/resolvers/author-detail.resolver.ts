import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorDetails } from '../models/author.entity';
import { AlertifyService } from '../services/alertify.service';
import { AuthorService } from '../services/author.service';

@Injectable()
export class AuthorDetailResolver implements Resolve<AuthorDetails> {
    constructor(
      private authorService: AuthorService,
      private router: Router,
      private alertify: AlertifyService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AuthorDetails> {
        return this.authorService.getAuthorDetail(route.params.id).pipe(
          catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/authors']);
            return [];
          })
        );
    }
}
