import { TestBed } from '@angular/core/testing';

import { SpotiapiService } from './spotiapi.service';

describe('SpotiapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotiapiService = TestBed.get(SpotiapiService);
    expect(service).toBeTruthy();
  });
});
