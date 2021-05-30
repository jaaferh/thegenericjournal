import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Topic, TopicsPosts } from '../models/topic.entity';
import { TopicService } from '../services/topic.service';

@Injectable()
export class TopicListResolver implements Resolve<TopicsPosts> {
    constructor(
      private topicService: TopicService,
      private router: Router,
      private toaster: ToasterService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TopicsPosts> {
        return this.topicService.getTopicPosts().pipe(
          catchError(error => {
            this.toaster.pop('error', 'Problem retrieving data');
            void this.router.navigate(['/']);
            return [];
          })
        );
    }
}
