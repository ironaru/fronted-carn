import { Usuario } from '../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = 'https://localhost:9090';

  constructor(private http: HttpClient) {}

  HttpHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': '*/*',
      'responseType': 'text/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
    return headers;
  }
  private refresh$ = new Subject<void>();
  get _refresh$() {
    return this.refresh$;
  }
  roles: any[] = [];
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/usuarios`, {
      headers: this.HttpHeader(),
    });
  }

  public generateToken(usuario: any): any {
    return this.http.post(this.url + '/token', usuario);
  }
  public obtenerUsuario(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/usuarios/' + id, {
      headers: this.HttpHeader(),
    });
  }
  public actualUsuario(): Observable<any> {
    return this.http.get<any>(this.url + '/usuario', {
      headers: this.HttpHeader()
    });
  }
  public $actualUsuario(): Observable<any> {
    return this.http.get<any>(
      this.url + '/usuarios/' + this.getUsuario().id,
      { headers: this.HttpHeader() }
    );
  }
  public getUsuario(): Usuario {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr) as Usuario;
    } else {
      // this.logout();
      return null;
    }
  }
  public setToken(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    const tokenStr = localStorage.getItem('token');
    if (tokenStr === undefined || tokenStr === '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }
  online(): Observable<any>{
    return this.http.get(this.url+'/on', {headers: this.HttpHeader()});
  }
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public registerUser(user: Usuario) {
    return this.http.post(this.url + '/usuarios', user, {
      headers: this.HttpHeader(),
    }).pipe(tap(() => this.refresh$.next()));
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(this.url + '/usuarios/' + id, {
      headers: this.HttpHeader(),
    }).pipe(tap(() => this.refresh$.next()));
  }
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }


  public getUser() {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    const user = this.getUser();
    return user.authorities[0].authority;
  }

  public editUsuario(user: any) {
    return this.http.put(this.url + '/usuarios/profile',user,{ headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  public on() {
    return this.actualUsuario();
  }
  editarUsuario(user: any): any {
    return this.http.put(this.url + '/usuarios/' + user.id, user, {
      headers: this.HttpHeader(),
    }).pipe(tap(() => this.refresh$.next()));
  }
  cambiarContra(password: any): any {
    return this.http.put(this.url + '/password',password,{headers: this.HttpHeader()});
  }
  medidorSocio(id: number): any {
    return this.http.get(this.url + '/medidores/socio/' + id, {headers: this.HttpHeader()});
  }
}
