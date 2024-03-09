import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient,private appConfigService: AppconfigService) {
  }

  getAllPackages(statusName?: string) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

     // Create an empty params object
     let params = new HttpParams();

     // If statusName is provided, add it to the params
     if (statusName) {
       params = params.set('statusName', statusName);
     }

    return this.http.get(`${this.appConfigService.getBaseUrl()}/api/pack`, { headers,params });
  }

  createPackage(packageData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.post(`${this.appConfigService.getBaseUrl()}/api/pack/create`, packageData, { headers });
  }

  updatePackageState(packageId: number, newStateId: number): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Pass the headers object as the third argument
    return this.http.put<any>(`${this.appConfigService.getBaseUrl()}/api/pack/${packageId}/state/${newStateId}`, {}, { headers });
  }

   // New method to fetch a package by its ID
   getPackageById(packageId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    // Make a GET request to the API endpoint with the package ID
    return this.http.get(`${this.appConfigService.getBaseUrl()}/api/pack/${packageId}`, { headers });
  }
}
