import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';

import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private token: string;
    private user: any;

    constructor(private http: HttpClient,
                private route: Router
               ) {
    }

    register(file, data) {
        return this.http.post(environment.SERVER_URL + file, data).pipe(map((res: any) => res))}

    postData(file, data) {
        let type = 'Bearer';
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
        let options = ({headers: headers});

        // console.log("datas", JSON.stringify(this.token))

        return this.http.post(environment.SERVER_URL + file, data, options).pipe(map((res: any) => res));
    }

    deleteData(file) {
        let type = 'Bearer';
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
        let options = ({headers: headers});
        return this.http.delete(environment.SERVER_URL + file, {headers: headers}).pipe(map((res: any) => res));
    }

    putData(file, data) {
        let type = 'Bearer';
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + this.token
        });
        // console.log('datas', headers);
        return this.http.put(environment.SERVER_URL + file, JSON.stringify(data), {headers: headers}).pipe(map((res: any) => res));
    }

    getData(file) {

        let type = 'Bearer';
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
        let options = ({headers: headers});
        // console.log('token: ' + JSON.stringify(headers));
        return this.http.get(environment.SERVER_URL + file, {headers: headers}).pipe(
            map(
                (res: any) =>
                    res)
        );
    }

    get(file) {

        return this.http.get(environment.SERVER_URL + file).pipe(
            map(
                (res: any) =>
                    res)
        );
    }


//login

  login(username: string, password: string): Observable<any> {
    let type = 'application/json; charset=UTF-8';
    let headers = new HttpHeaders({'Content-Type': type});
    let options = ({headers: headers});

    let body = {'email': username, 'password': password};
// console.log(body)
    return this.http.post(environment.SERVER_URL + 'users/login', JSON.stringify(body), options)
      .pipe(map((res: any) => {
        console.log(res);
        const tokenn = res && res.token;
        if (tokenn) {
          this.token = tokenn;
          localStorage.setItem(environment.TOKEN, JSON.stringify({username: username, token: tokenn}));
          localStorage.setItem(environment.CurrentUser, JSON.stringify(res.user));
          return true;
        } else {
          console.log(res);

          return res;
        }
      }, error => {
        console.log(error);
      }));

  }

    async logout() {

        localStorage.clear();

        this.route.navigate(['/login']);

    }

    getUser() {
        this.user = JSON.parse(localStorage.getItem(environment.TOKEN));
        // console.log(this.user);
        return this.user;
    }

}
