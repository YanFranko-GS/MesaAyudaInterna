import { Component, OnInit, inject, signal } from '@angular/core';
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
    users = signal<UsuarioDto[]>([]);
    loading = signal<boolean>(true);
    error = signal<string>('');

    private usuarioService = inject(UsuarioService);

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.loading.set(true);
        this.usuarioService.getAll().subscribe({
            next: (data) => {
                this.users.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Error al cargar los usuarios');
                this.loading.set(false);
            }
        });
    }

    deleteUser(id: number) {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            this.usuarioService.delete(id).subscribe(() => {
                this.users.set(this.users().filter(u => u.id !== id));
            });
        }
    }
}
