import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Topic } from '../models/topic.entity';
import { TopicService } from '../services/topic.service';

@Injectable()
export class TopicListResolver implements Resolve<Topic[]> {
    constructor(
      private topicService: TopicService,
      private router: Router,
      private toaster: ToasterService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Topic[]> {
        return this.topicService.getTopicList().pipe(
          catchError(error => {
            this.toaster.pop('error', 'Problem retrieving data');
            void this.router.navigate(['/']);
            return [];
          })
        );
    }
}
