import { TestBed } from '@angular/core/testing';

import { DeviceSizeFinderService } from './device-size-finder.service';

describe('DeviceSizeFinderService', () => {
  let service: DeviceSizeFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceSizeFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
