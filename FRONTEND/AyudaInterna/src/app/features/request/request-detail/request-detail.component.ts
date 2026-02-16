import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SolicitudService } from '../../../core/services/solicitud.service';
import { SolicitudDto, Estado } from '../../../core/models/models';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-request-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './request-detail.component.html',
    styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
    solicitud = signal<SolicitudDto | undefined>(undefined);
    loading = signal<boolean>(true);
    error = signal<string>('');

    private route = inject(ActivatedRoute);
    private solicitudService = inject(SolicitudService);
    public authService = inject(AuthService);

    isOperator = computed(() => {
        const user = this.authService.currentUser();
        return !!user && (user.rol === 'OPERADOR' || (user.authorities && user.authorities.includes('OPERADOR')));
    });

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
            this.loadRequest(id);
        }
    }

    loadRequest(id: number) {
        this.loading.set(true);
        this.solicitudService.getById(id).subscribe({
            next: (data) => {
                this.solicitud.set(data);
                this.loading.set(false);
            },
            error: () => {
                this.error.set('No se pudo cargar el detalle de la solicitud');
                this.loading.set(false);
            }
        });
    }

    changeStatus(newStatus: string) {
        const sol = this.solicitud();
        if (!sol) return;

        const updated: SolicitudDto = {
            ...sol,
            estado: newStatus as Estado
        };

        this.solicitudService.update(sol.id!, updated).subscribe({
            next: (data) => {
                this.solicitud.set(data);
            },
            error: () => {
                alert('Error al actualizar el estado');
            }
        });
    }
}
