import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) {
  }

  getAllPackages() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    return this.http.get('http://localhost:5000/api/pack', { headers });
  }

  createPackage(packageData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.post('http://localhost:5000/api/pack/create', packageData, { headers });
  }

  updatePackageState(packageId: number, newStateId: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Pass the headers object as the third argument
    return this.http.put<any>(`http://localhost:5000/api/pack/${packageId}/state/${newStateId}`, {}, { headers });
  }
}
