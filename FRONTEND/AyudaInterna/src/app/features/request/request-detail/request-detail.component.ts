import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SolicitudService } from '../../../core/services/solicitud.service';
import { SolicitudDto, Estado } from '../../../core/models/models';
import { AuthService } from '../../../core/services/auth.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-request-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './request-detail.component.html',
    styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
    solicitud?: SolicitudDto;
    loading = true;
    error = '';

    private route = inject(ActivatedRoute);
    private solicitudService = inject(SolicitudService);
    public authService = inject(AuthService);

    isOperator$ = this.authService.currentUser.pipe(
        map(user => user && (user.rol === 'OPERADOR' || (user.authorities && user.authorities.includes('OPERADOR'))))
    );

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
            this.loadRequest(id);
        }
    }

    loadRequest(id: number) {
        this.loading = true;
        this.solicitudService.getById(id).subscribe({
            next: (data) => {
                this.solicitud = data;
                this.loading = false;
            },
            error: () => {
                this.error = 'No se pudo cargar el detalle de la solicitud';
                this.loading = false;
            }
        });
    }

    changeStatus(newStatus: string) {
        if (!this.solicitud) return;

        const updated: SolicitudDto = {
            ...this.solicitud,
            estado: newStatus as Estado
        };

        this.solicitudService.update(this.solicitud.id!, updated).subscribe({
            next: (data) => {
                this.solicitud = data;
            },
            error: () => {
                alert('Error al actualizar el estado');
            }
        });
    }
}
