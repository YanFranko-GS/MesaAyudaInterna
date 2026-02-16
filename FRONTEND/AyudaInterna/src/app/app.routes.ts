import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RequestFormComponent } from './features/request/request-form/request-form.component';
import { RequestDetailComponent } from './features/request/request-detail/request-detail.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'request/new', component: RequestFormComponent },
            { path: 'request/view/:id', component: RequestDetailComponent },
            { path: 'request/edit/:id', component: RequestFormComponent },
            { path: 'users', component: UserListComponent },
        ]
    },
    { path: '**', redirectTo: 'dashboard' }
];
