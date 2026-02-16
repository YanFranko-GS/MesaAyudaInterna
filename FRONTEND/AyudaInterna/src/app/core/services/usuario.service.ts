import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, UsuarioDto } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = 'http://localhost:8082/api/usuarios';

    constructor(private http: HttpClient) { }

    getAll(): Observable<UsuarioDto[]> {
        return this.http.get<UsuarioDto[]>(this.apiUrl);
    }

    getById(id: number): Observable<UsuarioDto> {
        return this.http.get<UsuarioDto>(`${this.apiUrl}/${id}`);
    }

    create(usuario: RegisterRequest): Observable<UsuarioDto> {
        return this.http.post<UsuarioDto>(this.apiUrl, usuario);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
