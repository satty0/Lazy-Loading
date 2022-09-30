import { Injectable } from '@angular/core';
import { from, map, Observable, take, toArray } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLazyData(page: number, size: number): Observable<User> {
    return this.http.get<User>(`https://api.instantwebtools.net/v1/passenger`,
      { params: { page, size } });
  }
}