import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CobrosService {
  constructor(private http: HttpClient) {}

  private url = 'https://localhost:9090';

  HttpHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: '*/*',
      responseType: 'text',
      Authorization: 'Bearer ' + this.getToken(),
    });
    return headers;
  }
  private getToken() {
    return localStorage.getItem('token');
  }
  private refresh$ = new Subject<void>();
  get _refresh$() {
    return this.refresh$;
  }

  cobrosUsers(){
    return this.http.get(this.url+'/cobros',{headers: this.HttpHeader()});
  }
  cobrosUser(){
    return this.http.get(this.url+'/cobros/user',{headers: this.HttpHeader()});
  }
}
