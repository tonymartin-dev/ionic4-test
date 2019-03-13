import { TestBed } from '@angular/core/testing';

import { ItemFBService } from './item-fb.service';

describe('ItemFBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemFBService = TestBed.get(ItemFBService);
    expect(service).toBeTruthy();
  });
});
