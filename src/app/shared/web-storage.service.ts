import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class XyzWebStorageService {
  constructor(private http: HttpClient) {}

  get(key: string): string {
    return window.localStorage.getItem(key);
  }

  set(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  getRemote() {
    return this.http.get<any>('http://localhost:5984/user/settings');
  }

  setRemote(payload: unknown) {
    return this.http.put<any>('http://localhost:5984/user/settings', payload);
  }
}
