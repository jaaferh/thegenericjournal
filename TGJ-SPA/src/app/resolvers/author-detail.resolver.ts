import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorDetails } from '../models/author.entity';
import { AuthorService } from '../services/author.service';

@Injectable()
export class AuthorDetailResolver implements Resolve<AuthorDetails> {
    constructor(
      private authorService: AuthorService,
      private router: Router,
      private toaster: ToasterService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AuthorDetails> {
        return this.authorService.getAuthorDetail(route.params.id).pipe(
          catchError(error => {
            this.toaster.pop('error', 'Problem retrieving data');
            void this.router.navigate(['/authors']);
            return [];
          })
        );
    }
}
