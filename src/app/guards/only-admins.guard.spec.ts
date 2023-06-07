import { TestBed } from '@angular/core/testing';

import { OnlyAdminsGuard } from './only-admins.guard';

describe('OnlyAdminsGuard', () => {
  let guard: OnlyAdminsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyAdminsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
