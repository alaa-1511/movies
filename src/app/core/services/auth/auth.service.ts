import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);

  constructor( private readonly httpClient: HttpClient ) { }

  registerForm(Data: object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', Data);
  }
  loginForm(Data: object):Observable<any>{
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', Data);
  }
    signOut(): void {

    localStorage.removeItem('Token');
    localStorage.removeItem('Data');

    this.router.navigate(['/login']);
  }
}
