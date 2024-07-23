import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access token');
        if(token){
            const authReq = req.clone({
                headers: req.headers.set('Authorization',`Bearer ${token}`)
            });
            return next.handle(authReq);
        }
        else{
            return next.handle(req);
        }
    }
}