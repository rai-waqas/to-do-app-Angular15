import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private isLoggedIn = false;

    constructor(private router: Router){}

    login(){
        this.isLoggedIn = true;
    }

    logout(){
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean{
        return this.isLoggedIn;
    }
}