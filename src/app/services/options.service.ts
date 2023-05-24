import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor(private http: HttpClient) {}

  tabs(url: any) {
    return this.http.get('assets/data/' + url + '.js');
  }


  getUser() {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
    return true;
  }
  usuario: Usuario = new Usuario();
  roles: Rol[] = [];
  verificaRol(rol: string): boolean {
    this.usuario =this.getUser();
    this.roles = this.usuario.roles;
    if (this.roles.find((data) => data.autoridad == rol)?.autoridad == rol) {
      return true;
    }
    return false;
  }
}
