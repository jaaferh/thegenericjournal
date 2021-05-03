/* eslint-disable @typescript-eslint/no-unused-vars */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContainerService } from './container.service';

describe('Service: Container', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerService]
    });
  });

  it('should ...', inject([ContainerService], (service: ContainerService) => {
    expect(service).toBeTruthy();
  }));
});
