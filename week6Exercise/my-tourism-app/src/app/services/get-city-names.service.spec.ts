import { TestBed } from '@angular/core/testing';

import { GetCityNamesService } from './get-city-names.service';

describe('GetCityNamesService', () => {
  let service: GetCityNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCityNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
