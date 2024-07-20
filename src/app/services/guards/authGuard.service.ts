import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean{
    if(this.authService.isAuthenticated()){
        return true;
    }else{
        alert('Access Denied! Please login first.');
        this.router.navigate(['/login']);
        return false;
    }
  }
}