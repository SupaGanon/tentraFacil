import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private userIdKey = 'id_usuario';
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  public login(id_usuario: string, password: string): Observable<any> {
    return this.http.post(environment.url + '/login', { id_usuario, password });
  }

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public setUserId(id_usuario: string): void {
    localStorage.setItem(this.userIdKey, id_usuario);
  }

  public getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  public clearUserId(): void {
    localStorage.removeItem(this.userIdKey);
  }

  public user(id_usuario: string): Observable<any> {
    const params = new HttpParams().set('id_usuario', id_usuario);
    return this.http.get(environment.url + '/user1', { params });
  }

  public registrarUID(data: { id_usuario: string, UID: string, tipo: string }): Observable<any> {
    return this.http.post(environment.url + '/registrarUID', data);
  }

  public tarjetaUsuarioInfo(id_usuario: string): Observable<any> {
    return this.http.get(`${environment.url}/tarjetas/usuario/${id_usuario}`);
  }

  public borrarTarjeta(UID: string): Observable<any> {
    return this.http.delete(`${environment.url}/borrarTarjeta/${UID}`);
  }

  public editarEstado(UID: string): Observable<any> {
    return this.http.put(`${environment.url}/editarEstado/${UID}`, {});
  }

  public editarEstadoUsuario(id_usuario: string): Observable<any> {
    return this.http.put(`${environment.url}/editarEstadoUsuario/${id_usuario}`, {});
  }

  public eliminarUsuario(id_usuario: string): Observable<any> {
    return this.http.delete(`${environment.url}/eliminarUsuario/${id_usuario}`);
  }

  public usuariosInfo(): Observable<any> {
    return this.http.get(environment.url + '/get-user', {});
  }

  public obtenerRegistros(): Observable<any> {
    return this.http.get(environment.url + '/obtener_registros');
  }

  public register(data: any): Observable<any> {
    return this.http.post(`${environment.url}/register`, data);
  }

  public logout(): Observable<any> {
    this.currentUser = null;
    return this.http.post(`${environment.url}/logout`, {});
  }

  public isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  public getCurrentUser(): any {
    return this.currentUser;
  }

  public setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  public activarRele(): Observable<any> { 
    const url = `http://192.168.100.82:80/`; 
    return this.http.get(url); 
  }
}
