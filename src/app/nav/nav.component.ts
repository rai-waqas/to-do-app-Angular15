import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, Observable, take, tap } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private authService: AuthService){}
  isAuthenticated(): Observable<boolean> {
    const value = this.authService.isAuthenticated().pipe(
      take(1),
      map(isLoggedIn => !!isLoggedIn)
    );
    // console.log('isAuthenticated:', value);
    return value;
  }
  logout() {
    this.authService.logout();
  }

}
