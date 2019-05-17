import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';

import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiRoot = 'http://odonto-content-api.herokuapp.com/api/V1/';

  constructor(private http: HttpClient) { }
  private setSession(authResult) {
    const token = authResult.data.jwtToken;
    const payload = jwtDecode(token) as JWTPayload;
    console.log('meu payload' + JSON.stringify(payload));
    const expiresAt = moment(payload.exp);
    localStorage.setItem('jwtToken', authResult.data.jwtToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('jwtToken');
  }

  login(email: string, password: string) {
    return this.http.post(
      this.apiRoot.concat('login/authenticate'),
      { email, password }
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('expires_at');
  }

  // refreshToken() {
  //   if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
  //     return this.http.post(
  //       this.apiRoot.concat('refresh-token/'),
  //       { token: this.token }
  //     ).pipe(
  //       tap(response => this.setSession(response)),
  //       shareReplay(),
  //     ).subscribe();
  //   }
  // }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
      const expiration = this.getExpiration();
      return this.getExpiration().isBefore(moment());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) { }
    canActivate() {
      if (this.authService.isLoggedIn()) {
          //this.authService.refreshToken();
        return true;
      } else {
        this.authService.logout();
        this.router.navigate(['login']);
        return false;
      }
    }



  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (this.authService.isLoggedIn()) {
  //     console.log('o2');
  //     return true;
  //   } else {
  //     this.router.navigate(['/login'], {
  //       queryParams: {
  //         return: state.url
  //       }
  //     });
  //     return false;
  //   }
  // }


  }

interface JWTPayload {
  _id: number;
  name: string;
  email: string;
  exp: number;
}
