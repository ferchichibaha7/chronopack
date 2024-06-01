import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {

  //private baseUrl = 'https://api.chronopack.tn'; // Default base URL
  private baseUrl = 'http://localhost:5000'; // Default base URL local

  constructor() { }

  // Getter method to retrieve the base URL
  getBaseUrl(): string {
    return this.baseUrl;
  }

  // Setter method to set the base URL
  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }
}
