import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../core/services/usuario.service';
import { UsuarioDto } from '../../../core/models/models';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    users: UsuarioDto[] = [];
    loading = true;
    error = '';

    private usuarioService = inject(UsuarioService);

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.loading = true;
        this.usuarioService.getAll().subscribe({
            next: (data) => {
                this.users = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error al cargar los usuarios';
                this.loading = false;
            }
        });
    }

    deleteUser(id: number) {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            this.usuarioService.delete(id).subscribe(() => {
                this.users = this.users.filter(u => u.id !== id);
            });
        }
    }
}
