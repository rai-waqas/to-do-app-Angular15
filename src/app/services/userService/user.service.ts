import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable({
    providedIn: 'root'
})

export class UserService{
    constructor(private http: HttpClient) {

    }
    registerUser(email: string, password: string, username: string): Observable<any> {
        return this.http.post<any>('https://localhost:7091/api/User', {email, password, username}, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }).pipe(
            catchError(error => {
                console.error('Register error', error);
                throw error;
            })
        );
    }
}
