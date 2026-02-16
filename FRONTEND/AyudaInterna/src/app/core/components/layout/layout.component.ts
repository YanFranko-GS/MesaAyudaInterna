import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    authService = inject(AuthService);
    currentUser$: Observable<any> = this.authService.currentUser;

    isOperator$: Observable<boolean> = this.currentUser$.pipe(
        map(user => user && (user.authorities?.includes('OPERADOR') || user.rol === 'OPERADOR'))
    );
    // Note: Depending on JWT structure, roles might be in 'authorities' or 'rol'.
    // Backend RegisterRequest has 'rol', User entity has 'rol'. JWT usually puts roles in claims.

    logout() {
        this.authService.logout();
    }
}
