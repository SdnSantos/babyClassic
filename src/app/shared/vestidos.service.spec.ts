import { TestBed } from '@angular/core/testing';

import { VestidoService } from './vestido.service';

describe('VestidoService', () => {
  let service: VestidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VestidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
