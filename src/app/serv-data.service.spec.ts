import { TestBed } from '@angular/core/testing';

import { ServDataService } from './serv-data.service';

describe('ServDataService', () => {
  let service: ServDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
