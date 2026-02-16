import { Component, OnInit, inject, signal, computed, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolicitudService } from '../../core/services/solicitud.service';
import { AuthService } from '../../core/services/auth.service';
import { SolicitudDto, Estado, Prioridad } from '../../core/models/models';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    private solicitudService = inject(SolicitudService);
    public authService = inject(AuthService);
    private cdr = inject(ChangeDetectorRef);

    solicitudes = signal<SolicitudDto[]>([]);
    loading = signal<boolean>(false); // Start false to avoid stuck spinner if logic fails
    error = signal<string>('');

    isOperator = computed(() => {
        const user = this.authService.currentUser();
        return !!user && (user.rol === 'OPERADOR' || (user.authorities && user.authorities.includes('OPERADOR')));
    });

    filterEstado: Estado | '' = '';
    filterPrioridad: Prioridad | '' = '';
    filterTitulo: string = '';
    filterFechaInicio: string = '';
    filterFechaFin: string = '';

    Estado = Estado;
    Prioridad = Prioridad;

    ngOnInit() {
        console.log('DashboardComponent initialized');
        this.loadSolicitudes();
    }

    loadSolicitudes() {
        console.log('Loading solicitudes...');
        this.loading.set(true);
        this.error.set('');

        this.solicitudService.getAll().subscribe({
            next: (data) => {
                console.log('Data received:', data);
                let filtered = data || [];

                if (this.filterEstado) {
                    filtered = filtered.filter(s => s.estado === this.filterEstado);
                }
                if (this.filterPrioridad) {
                    filtered = filtered.filter(s => s.prioridad === this.filterPrioridad);
                }
                if (this.filterTitulo) {
                    filtered = filtered.filter(s => s.titulo && s.titulo.toLowerCase().includes(this.filterTitulo.toLowerCase()));
                }
                if (this.filterFechaInicio) {
                    filtered = filtered.filter(s => s.fechaCreacion && new Date(s.fechaCreacion) >= new Date(this.filterFechaInicio));
                }
                if (this.filterFechaFin) {
                    filtered = filtered.filter(s => s.fechaCreacion && new Date(s.fechaCreacion) <= new Date(this.filterFechaFin));
                }

                this.solicitudes.set(filtered);
                this.loading.set(false);
                this.cdr.detectChanges(); // Force detection
            },
            error: (err) => {
                console.error('Error loading solicitudes:', err);
                this.error.set('No se pudo conectar con el servidor. Verifique si el backend está corriendo en el puerto 8082.');
                this.loading.set(false);
                this.cdr.detectChanges();
            }
        });
    }

    deleteSolicitud(id: number) {
        if (confirm('¿Está seguro que desea eliminar esta solicitud?')) {
            this.solicitudService.delete(id).subscribe({
                next: () => {
                    this.solicitudes.set(this.solicitudes().filter(s => s.id !== id));
                    this.cdr.detectChanges();
                }
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
