import { Injectable } from '@angular/core';

import { USERS } from '../../mock/mock-users';
import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class XyzUserListService {
  constructor() {}

  get(): Promise<User[]> {
    return Promise.resolve(USERS);
  }
}
