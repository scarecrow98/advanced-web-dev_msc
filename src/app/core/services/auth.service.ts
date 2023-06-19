import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { LocalStorageKeys } from '../utils/constants';
import { User } from '../models/main';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$ = new BehaviorSubject<User|null>(null);

  public user$ = this._user$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>('/api/auth/login', { email, password }).pipe(
      tap(resp => {
        localStorage.setItem(LocalStorageKeys.JwtToken, resp.token);
      }),
      map(resp => true),
      catchError(err => of(false))
    );
  }

  check(): Observable<boolean> {
    return this.http.get<User>('/auth/check').pipe(
      tap(user => {
        this._user$.next(user);
      }),
      map(user => true),
      catchError(err => of(false))
    );
  }

  logout() {
    localStorage.removeItem(LocalStorageKeys.JwtToken);
  }
}
