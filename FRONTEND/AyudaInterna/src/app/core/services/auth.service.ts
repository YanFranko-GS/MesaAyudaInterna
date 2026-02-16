import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/models';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8082/auth';
    private tokenKey = 'auth_token';
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private isBrowser: boolean;

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.currentUserSubject = new BehaviorSubject<any>(this.getUserFromToken());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
            tap(response => {
                if (response && response.token && this.isBrowser) {
                    localStorage.setItem(this.tokenKey, response.token);
                    this.currentUserSubject.next(this.getUserFromToken());
                }
            })
        );
    }

    register(request: RegisterRequest): Observable<string> {
        return this.http.post(`${this.apiUrl}/register`, request, { responseType: 'text' }).pipe(
            tap(token => {
                // Backend returns "User registered successfully" or token. Assuming token for now base on return type string but actually controller returns "User Registered Successfully" most likely.
                // Let's verify controller return again. 
                // Controller: return ResponseEntity.ok(service.register(request));
                // Service: register returns String.
                // Let's assume it returns a JWT token if successful registration logs in immediately, OR just success message.
                // If it returns a success message, we might need to login after. 
                // Simplest user flow: Register -> Login.
            })
        );
    }

    logout() {
        if (this.isBrowser) {
            localStorage.removeItem(this.tokenKey);
        }
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        if (this.isBrowser) {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    private getUserFromToken(): any {
        const token = this.getToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload; 
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) return false;

      
        const user = this.getUserFromToken();
        if (user && user.exp) {
            const expirationDate = new Date(0);
            expirationDate.setUTCSeconds(user.exp);
            return expirationDate > new Date();
        }
        return true;
    }
}
