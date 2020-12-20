import { TestBed } from '@angular/core/testing';

import { UserRolesService } from './user-roles.service';

describe('UserRolesService', () => {
  let service: UserRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
