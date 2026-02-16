import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    authService = inject(AuthService);
    currentUser = this.authService.currentUser;

    isOperator = computed(() => {
        const user = this.currentUser();
        return !!user && (user.authorities?.includes('OPERADOR') || user.rol === 'OPERADOR');
    });
    // Note: Depending on JWT structure, roles might be in 'authorities' or 'rol'.
    // Backend RegisterRequest has 'rol', User entity has 'rol'. JWT usually puts roles in claims.

    logout() {
        this.authService.logout();
    }
}
