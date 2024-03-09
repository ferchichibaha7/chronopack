import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {  BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { AuthUtils } from './auth.utils';
import { AppconfigService } from '../services/appconfig.service';

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;
    private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public userData$: Observable<any> = this.userDataSubject.asObservable();
    /**
     * Constructor
     */
    constructor( private _httpClient: HttpClient, private appConfigService: AppconfigService) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Sign in
     *
     * @param credentials
     */

    signIn(credentials: { username: string; password: string }): Observable<any>
    {
    // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            console.error('User is already logged in.');
        }
        const headers = new HttpHeaders({
        'X-Frontend-Angular': 'true'
        });
        return this._httpClient.post(`${this.appConfigService.getBaseUrl()}/api/auth/login`, credentials, { headers }).pipe(
        switchMap((response: any) => {
        if (response.token ) {
        // Store the access token in the local storage
        this.accessToken = response.token;
        // Set the authenticated flag to true
        this._authenticated = true;
          // Fetch user data here
          this.fetchUserData().subscribe(userData => {
            this.userDataSubject.next(userData.result);
          });
        }
        return of(response);
        })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        // Set the authenticated flag to false
        this._authenticated = false;
        // Return the observable
        return of(true);
    }

     fetchUserData(): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.accessToken}`
      });
      // Assuming you have an endpoint to fetch user data
      return this._httpClient.get(`${this.appConfigService.getBaseUrl()}/api/auth/current`, { headers });
    }

    getUserData(): Observable<any> {
      return this.userData$;
    }

    setUserData(userData: any): void {
      this.userDataSubject.next(userData);
    }



    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
             // If the access token exists and it didn't expire, sign in using it
        // return this.signInUsingToken();
        return of(true);
    }
}
