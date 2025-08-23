import { TestBed } from '@angular/core/testing';

import { TvmoviesService } from '../tvmovies.service';

describe('TvmoviesService', () => {
  let service: TvmoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvmoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
