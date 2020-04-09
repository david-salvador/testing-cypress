import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { SearchParams } from '../models/search-params.model';

@Injectable({ providedIn: 'root' })
export class XyzFilterByService {
  get({ data, filter }: SearchParams): User[] {
    return data.filter(user => {
      if (user.name && isMatch(user.name, filter)) {
        return user;
      }
    });
  }
}

function isMatch(name: string, filter: string): RegExpMatchArray {
  return name.match(new RegExp(filter, 'i'));
}
