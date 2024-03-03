import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {  Observable, of, switchMap } from 'rxjs';
import { AuthUtils } from './auth.utils';

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor( private _httpClient: HttpClient) { }

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
        return this._httpClient.post(`http://localhost:5000/api/auth/login`, credentials, { headers }).pipe(
        switchMap((response: any) => {
        if (response.token ) {
        // Store the access token in the local storage
        this.accessToken = response.token;
        // Set the authenticated flag to true
        this._authenticated = true;
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
