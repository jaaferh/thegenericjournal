/* eslint-disable @typescript-eslint/no-unused-vars */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopicService } from './topic.service';

describe('Service: Topic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicService]
    });
  });

  it('should ...', inject([TopicService], (service: TopicService) => {
    expect(service).toBeTruthy();
  }));
});
