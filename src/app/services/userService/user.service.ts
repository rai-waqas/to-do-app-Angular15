import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/app/environment/environment';




@Injectable({
    providedIn: 'root'
})

export class UserService{
    private userUrl = environment.user.userUrl;
    constructor(private http: HttpClient) {

    }
    registerUser(email: string, password: string, username: string): Observable<any> {
        return this.http.post<any>(this.userUrl, {email, password, username}, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }).pipe(
            catchError(error => {
                let errorMessage = '';
                if (error.status === 409) {
                  errorMessage = 'Username already exists. Please try another one.';
                } else {
                  errorMessage = 'An unexpected error occurred. Please try again later.';
                }
                return of({ error: true, message: errorMessage });
              })
        );
    }
}
