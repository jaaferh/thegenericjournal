import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { ContainerService } from './container.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Container } from '../models/container.entity';
import { of } from 'rxjs';

describe('Service: Container', () => {
  let containerService: ContainerService;
  let container: Container;

  const httpClientSpy = { 
    post: jasmine.createSpy('post'), 
    delete: jasmine.createSpy('delete') 
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ContainerService, { provider: HttpClient, useValue: httpClientSpy }]
    });;
    containerService = TestBed.inject(ContainerService);
  });

  beforeEach(() => {
    container = {
      _id: 'id',
      post: 'postId',
      type: 'typeId',
      title: 'title',
      text: 'text',
      image_url: 'imgurl',
      caption: 'caption'
    };
  });

  it('should be created', () => {
    expect(containerService).toBeTruthy();
  });
  
  it('should update a container', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of<any>({}));

    containerService.updateContainer('id', container).subscribe(
      cont => {
        expect(cont).toEqual();
        done();
      },
      done.fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});
