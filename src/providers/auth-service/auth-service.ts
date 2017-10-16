import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string, private http: Http) {
    this.name = name;
    this.email = email;
  }
}
 
@Injectable()
export class AuthService {
  //currentUser: User;

  constructor(public http: Http) {
    
  }
 
  public login(credentials) {
    if (credentials.email === null || credentials.pwd === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let body = JSON.stringify(credentials);
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: header });

      return Observable.create(observer => {
        this.http.post('http://localhost:3000/usersLogin', body, options)
          .map(res => res.json())
          .subscribe(response => {
            observer.next(response);
            observer.complete();
          });
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let body = JSON.stringify(credentials);
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: header });
      console.log(body);
      return Observable.create(observer => {
        this.http.post('http://localhost:3000/registerUser', body, options)
          .map(res => res.json())
          .subscribe(response => {
            observer.next(response);
            observer.complete();
          });
      });
    }  
  }
 
  public getUserInfo(d) {
    if (d === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let body = JSON.stringify(d);
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: header });

      return Observable.create(observer => {
        this.http.post('http://localhost:3000/getUserDetails', body, options)
          .map(res => res.json())
          .subscribe(response => {
            observer.next(response);
            observer.complete();
          });
      });
    }
  }
 
  public logout() {
    return Observable.create(observer => {
      sessionStorage.removeItem('userLoggedIn');
      sessionStorage.removeItem('UID');
      observer.next(true);
      observer.complete();
    });
  }

  public updateProfile(data){
    if (data.user_name === null || data.user_email === null) {
      return Observable.throw("Please insert credentials");
    } else {
      //console.log(data);
      let body = JSON.stringify(data);
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: header });
      console.log(body);
      return Observable.create(observer => {
        this.http.post('http://localhost:3000/updateUserDetails', body, options)
          .map(res => res.json())
          .subscribe(response => {
            observer.next(response);
            observer.complete();
          });
      });
    }
  }



}