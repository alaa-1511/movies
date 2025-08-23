import { TestBed } from '@angular/core/testing';

import { DetmoviesService } from './detmovies.service';

describe('DetmoviesService', () => {
  let service: DetmoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetmoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
