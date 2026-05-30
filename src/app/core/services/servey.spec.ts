import { TestBed } from '@angular/core/testing';

import { Servey } from './servey';

describe('Servey', () => {
  let service: Servey;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servey);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
