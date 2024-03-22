import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http: HttpClient,private appConfigService: AppconfigService) {}

  getAllDepots() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    });
    return this.http.get(`${this.appConfigService.getBaseUrl()}/api/depot`, { headers });
  }

}
