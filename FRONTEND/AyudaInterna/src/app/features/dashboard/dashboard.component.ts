import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolicitudService } from '../../core/services/solicitud.service';
import { AuthService } from '../../core/services/auth.service';
import { SolicitudDto, Estado, Prioridad } from '../../core/models/models';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    solicitudes: SolicitudDto[] = [];
    loading = true;
    error = '';

    filterEstado: Estado | '' = '';
    filterPrioridad: Prioridad | '' = '';
    filterTitulo: string = '';
    filterFechaInicio: string = '';
    filterFechaFin: string = '';

    Estado = Estado;
    Prioridad = Prioridad;

    private solicitudService = inject(SolicitudService);
    public authService = inject(AuthService);

    ngOnInit() {
        this.loadSolicitudes();
    }

    loadSolicitudes() {
        this.loading = true;
        this.solicitudService.getAll().subscribe({
            next: (data) => {
                let filtered = data;

                if (this.filterEstado) {
                    filtered = filtered.filter(s => s.estado === this.filterEstado);
                }
                if (this.filterPrioridad) {
                    filtered = filtered.filter(s => s.prioridad === this.filterPrioridad);
                }
                if (this.filterTitulo) {
                    filtered = filtered.filter(s => s.titulo.toLowerCase().includes(this.filterTitulo.toLowerCase()));
                }
                if (this.filterFechaInicio) {
                    filtered = filtered.filter(s => s.fechaCreacion && new Date(s.fechaCreacion) >= new Date(this.filterFechaInicio));
                }
                if (this.filterFechaFin) {
                    filtered = filtered.filter(s => s.fechaCreacion && new Date(s.fechaCreacion) <= new Date(this.filterFechaFin));
                }

                this.solicitudes = filtered;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error al cargar las solicitudes';
                this.loading = false;
            }
        });
    }

    deleteSolicitud(id: number) {
        if (confirm('¿Está seguro que desea eliminar esta solicitud??')) {
            this.solicitudService.delete(id).subscribe(() => {
                this.solicitudes = this.solicitudes.filter(s => s.id !== id);
            });
        }
    }

    getStatusClass(estado: Estado): string {
        switch (estado) {
            case Estado.NUEVO: return 'status-nuevo';
            case Estado.EN_PROCESO: return 'status-proceso';
            case Estado.RESUELTO: return 'status-resuelto';
            case Estado.CERRADO: return 'status-cerrado';
            default: return '';
        }
    }
}
