import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'app/shared/fetch-api/model/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = '/api/';
  isLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  login(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}user`);
  }

  getUserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}user/${id}`);
  }

  createUser(payload: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}user`, payload);
  }

  updateUser(payload: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.baseUrl}user/${payload.id}`, payload)
  }

  deleteUser(id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}user/${id}`);
  }

  stateLogin(value: boolean) {
    this.isLoggedIn.next(value);
  }

  getStateLogin(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
}
