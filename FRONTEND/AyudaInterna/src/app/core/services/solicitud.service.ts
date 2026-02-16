import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado, Prioridad, SolicitudDto } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class SolicitudService {
    private apiUrl = 'http://localhost:8082/api/solicitudes';

    constructor(private http: HttpClient) { }

    getAll(): Observable<SolicitudDto[]> {
        return this.http.get<SolicitudDto[]>(this.apiUrl);
    }

    getById(id: number): Observable<SolicitudDto> {
        return this.http.get<SolicitudDto>(`${this.apiUrl}/${id}`);
    }

    create(solicitud: SolicitudDto): Observable<SolicitudDto> {
        return this.http.post<SolicitudDto>(this.apiUrl, solicitud);
    }

    update(id: number, solicitud: SolicitudDto): Observable<SolicitudDto> {
        return this.http.put<SolicitudDto>(`${this.apiUrl}/${id}`, solicitud);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    filter(estado?: Estado, prioridad?: Prioridad): Observable<SolicitudDto[]> {
        let params = new HttpParams();
        if (estado) params = params.set('estado', estado);
        if (prioridad) params = params.set('prioridad', prioridad);
        return this.http.get<SolicitudDto[]>(`${this.apiUrl}/filter`, { params });
    }
}
