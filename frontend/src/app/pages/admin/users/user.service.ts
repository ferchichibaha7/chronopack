import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from './users.component';
import { AppconfigService } from 'src/app/services/appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:any = ''
  constructor(private http: HttpClient,private appConfigService: AppconfigService) {
    this.token =  `Bearer ${localStorage.getItem('accessToken')}`
   }

  getUsersByRole(role: string): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.get<User[]>(`${this.appConfigService.getBaseUrl()}/api/user/${role}`,{headers});
  }

  toggleActive(user_id:number): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    let body :any= {
      user_id: user_id,
    };

    return this.http.put<any>(`${this.appConfigService.getBaseUrl()}/api/user/toggleactive`, body, { headers })
  }

  createUser(user: any, role: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.post<any>(`${this.appConfigService.getBaseUrl()}/api/auth/create/${role}`, user, { headers })
      .pipe(
        catchError(error => {
          // Handle errors
          console.error('Error creating user:', error);
          throw error;
        })
      );
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.post<any>(`${this.appConfigService.getBaseUrl()}/api/auth/signup`, user, { headers })
      .pipe(
        catchError(error => {
          // Handle errors
          console.error('Error creating user:', error);
          throw error;
        })
      );
  }
}
