import { TestBed } from '@angular/core/testing';

import { ServDeleteService } from './serv-delete.service';

describe('ServDeleteService', () => {
  let service: ServDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
