import { TestBed } from '@angular/core/testing';

// import { MetaServiceService } from '/srcmeta-service.service';
import { MetaService } from './meta-service.service';

describe('MetaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetaService = TestBed.get(MetaService);
    expect(service).toBeTruthy();
  });
});
