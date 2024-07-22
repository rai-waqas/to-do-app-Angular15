import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7091/api/Task';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasksByUserId(): Observable<any> {
    return this.authService.getUserId().pipe(
      switchMap(userId => {
        console.log('User ID:', userId);
        if (!userId) {
          return new Observable();
        }
        return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
      })
    );
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${taskId}`);
  }

  updateTask(taskId: number, task: any): Observable<any> {
    console.log('Task To Update:', task);
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, task, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }
}
