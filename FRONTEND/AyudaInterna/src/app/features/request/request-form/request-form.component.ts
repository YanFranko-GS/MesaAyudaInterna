import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SolicitudService } from '../../../core/services/solicitud.service';
import { Estado, Prioridad } from '../../../core/models/models';

@Component({
    selector: 'app-request-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './request-form.component.html',
    styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
    form: FormGroup;
    isEditMode = false;
    id: number | null = null;
    loading = false;
    error = '';

    estados = Object.values(Estado);
    prioridades = Object.values(Prioridad);

    constructor(
        private fb: FormBuilder,
        private solicitudService: SolicitudService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.form = this.fb.group({
            titulo: ['', Validators.required],
            descripcion: ['', Validators.required],
            prioridad: [Prioridad.MEDIA, Validators.required],
            estado: [Estado.NUEVO]
        });
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) {
            this.isEditMode = true;
            this.loadRequest(this.id);
        }
    }

    loadRequest(id: number) {
        this.loading = true;
        this.solicitudService.getById(id).subscribe({
            next: (data) => {
                this.form.patchValue(data);
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error al cargar la solicitud';
                this.loading = false;
            }
        });
    }

    onSubmit() {
        if (this.form.invalid) return;

        this.loading = true;
        const request = this.form.value;

        if (this.isEditMode && this.id) {
            this.solicitudService.update(this.id, request).subscribe({
                next: () => this.router.navigate(['/dashboard']),
                error: () => {
                    this.error = 'No se pudo actualizar la solicitud';
                    this.loading = false;
                }
            });
        } else {
            this.solicitudService.create(request).subscribe({
                next: () => this.router.navigate(['/dashboard']),
                error: () => {
                    this.error = 'No se pudo crear la solicitud';
                    this.loading = false;
                }
            });
        }
    }
}
