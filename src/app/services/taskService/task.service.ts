import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service'; 
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = environment.task.taskUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasksByUserId(): Observable<any> {
    return this.authService.getUserId().pipe(
      switchMap(userId => {
        console.log('User ID:', userId);
        if (!userId) {
          return new Observable();
        }
        return this.http.get<any>(`${this.taskUrl}/user/${userId}`);
      })
    );
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.taskUrl, task, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.taskUrl}/${taskId}`);
  }

  updateTask(taskId: number, task: any): Observable<any> {
    console.log('Task To Update:', task);
    return this.http.put<any>(`${this.taskUrl}/${taskId}`, task, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.taskUrl}/${taskId}`);
  }
}
