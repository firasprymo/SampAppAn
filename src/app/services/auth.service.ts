import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  private jwtToken = null;
  authState = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private route: Router) {
  }

  login(user): Observable<any> {

    return this.http.post(environment.SERVER_URL + '/Admin/authentication', user)
      .pipe(map((res: any) => {
        console.log(res);

        const tokenn = res && res.token;
        return res;

      }, error => {
        console.log(error);
      }));
    // login successful if there's a jwt token in the response


  }


  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
  }

  // logout() {
  //   this.jwtToken = null;
  //
  //   localStorage.clear();
  //   this.route.navigate([('/pages/login')]);
  // }






  logout() {
    localStorage.clear()
    this.route.navigate([('/pages/login')]);

  }

  public isLoggedIn() {
    return this.authState.value;

  }

  isLoggedOut() {
  }

  getUser(){
    console.log( localStorage.getItem(environment.CurrentUser))
    return localStorage.getItem(environment.CurrentUser)
  }
}
