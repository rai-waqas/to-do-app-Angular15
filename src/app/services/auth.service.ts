import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isLoggedIn = new BehaviorSubject<boolean>(false);
    private loginUrl = environment.task.loginUrl;
    private user = null;
    private userId = new BehaviorSubject<number | null>(this.loadUserIdFromStorage());

    constructor(private http: HttpClient, private router: Router) {
        this.checkLoginStatus();
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(this.loginUrl, { email, password }).pipe(
            catchError(error => {
                console.error('Login error', error);
                throw error;
            })
        );
    }

    logout() {
        this.isLoggedIn.next(false);
        console.log('Is logged in?', this.isLoggedIn.value);
        this.userId.next(null);
        this.setUser(null);
        console.log('User:', this.getUser());
        this.removeUserIdFromStorage();
        localStorage.removeItem('access token');
        this.router.navigate(['/login']);
    }

    isAuthenticated(): Observable<boolean> {
        return this.isLoggedIn.asObservable();
    }

    getUserId(): Observable<number | null> {
        return this.userId.asObservable();
    }

    setUserId(id: number): void {
        this.userId.next(id);
        this.saveUserIdToStorage(id);
        console.log('User ID set:', id);
    }
    setUser(user: any): void {
        this.user = user;
    }

    getUser(): any {
        return this.user;
    }

    private checkLoginStatus() {
        const storedUserId = this.loadUserIdFromStorage();
        if (storedUserId !== null) {
            this.userId.next(storedUserId);
            this.isLoggedIn.next(true);
        } else {
            this.isLoggedIn.next(false);
        }
    }

    private saveUserIdToStorage(userId: number) {
        localStorage.setItem('userId', userId.toString());
    }

    private loadUserIdFromStorage(): number | null {
        const userId = localStorage.getItem('userId');
        return userId ? +userId : null;
    }

    private removeUserIdFromStorage() {
        localStorage.removeItem('userId');
    }

    getAuthorizationToken(): string {
        return localStorage.getItem('access token');
    }

}
