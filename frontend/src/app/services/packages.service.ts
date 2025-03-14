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

  getAllPackagesCount() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

     // Create an empty params object
     let params = new HttpParams();


    return this.http.get(`${this.appConfigService.getBaseUrl()}/api/pack/count`, { headers,params });
  }

  getPackagesChart() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

     // Create an empty params object
     let params = new HttpParams();


    return this.http.get(`${this.appConfigService.getBaseUrl()}/api/pack/chart`, { headers,params });
  }

  createPackage(packageData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.post(`${this.appConfigService.getBaseUrl()}/api/pack/create`, packageData, { headers });
  }

  updatePackageStates(packageIds: any[], newStateId: any,selectedDelivery?:any,depot_id?:any,reason_id?:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    let body :any= {
      packageIds: packageIds,
      newStateId: newStateId
    };
    if (selectedDelivery){
      body['coursier_id'] = selectedDelivery
    }
    if (depot_id){
      body['depot_id'] = depot_id
    }
    if (reason_id){
      body['reason_id'] = reason_id
    }
    return this.http.put<any>(`${this.appConfigService.getBaseUrl()}/api/pack/states`, body, { headers });
  }
   // New method to fetch a package by its ID
   getPackageById(packageId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    // Make a GET request to the API endpoint with the package ID
    return this.http.get(`${this.appConfigService.getBaseUrl()}/api/pack/${packageId}`, { headers });
  }

  updatePackage(packagedata:any){
    console.log(packagedata);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });

    // Make a GET request to the API endpoint with the package ID
    return this.http.put(`${this.appConfigService.getBaseUrl()}/api/pack/update`,packagedata, { headers });
  }

  getAllStatusOptions() {
    return [
      { id: 1, statusName: 'Brouillon', icon: { name: 'draft', color: 'gray' } },
      { id: 2, statusName: 'En attente de ramassage', icon: { name: 'waiting-for-pickup', color: 'orange' } },
      { id: 3, statusName: 'En transit', icon: { name: 'in-transit', color: 'blue' } },
      { id: 4, statusName: 'En stock', icon: { name: 'in-stock', color: 'green' } },
      { id: 5, statusName: 'En cours de livraison', icon: { name: 'delivery-in-progress', color: 'purple' } },
      { id: 6, statusName: 'Livré', icon: { name: 'delivered', color: 'green' } },
      { id: 7, statusName: 'Retourné', icon: { name: 'returned', color: 'red' } },
      { id: 8, statusName: 'Livré et payé', icon: { name: 'delivered-and-paid', color: 'green' } },
      { id: 9, statusName: 'Annulé', icon: { name: 'cancelled', color: 'red' } },
      { id: 10, statusName: 'Pickup', icon: { name: 'pickup', color: 'blue' } }
    ];
  }
}
