import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1), 
      map(isLoggedIn => !!isLoggedIn),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          alert('Access Denied! Please login first.');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}