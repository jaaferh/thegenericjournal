import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { ContainerService } from './container.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Container', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ContainerService]
    });;
  });

  it('should ...', inject([ContainerService], (service: ContainerService) => {
    expect(service).toBeTruthy();
  }));
});
