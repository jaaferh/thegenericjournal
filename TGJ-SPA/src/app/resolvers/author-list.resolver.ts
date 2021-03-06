import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Author } from '../models/author.entity';
import { AuthorService } from '../services/author.service';

@Injectable()
export class AuthorListResolver implements Resolve<Author[]> {
    constructor(
      private authorService: AuthorService,
      private router: Router,
      private toaster: ToasterService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Author[]> {
        return this.authorService.getAuthorList().pipe(
          catchError(error => {
            this.toaster.pop('error', 'Problem retrieving data');
            void this.router.navigate(['/']);
            return [];
          })
        );
    }
}
