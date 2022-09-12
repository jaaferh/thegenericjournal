import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { TopicService } from './topic.service';

describe('Service: Topic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [TopicService]
    });
  });

  it('should ...', inject([TopicService], (service: TopicService) => {
    expect(service).toBeTruthy();
  }));
});
