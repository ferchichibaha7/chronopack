import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from './users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:any = ''
  constructor(private http: HttpClient) {
    this.token =  `Bearer ${localStorage.getItem('accessToken')}`
   }

  getUsersByRole(role: string): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.http.get<User[]>(`http://localhost:5000/api/user/${role}`,{headers});
  }

  createUser(user: any, role: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.http.post<any>(`http://localhost:5000/api/auth/create/${role}`, user, { headers })
      .pipe(
        catchError(error => {
          // Handle errors
          console.error('Error creating user:', error);
          throw error;
        })
      );
  }
}
