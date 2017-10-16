var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
var User = (function () {
    function User(name, email, http) {
        this.http = http;
        this.name = name;
        this.email = email;
    }
    return User;
}());
export { User };
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.pwd === null) {
            return Observable.throw("Please insert credentials");
        }
        else {
            var body_1 = JSON.stringify(credentials);
            var header = new Headers();
            header.append('Content-Type', 'application/json');
            var options_1 = new RequestOptions({ headers: header });
            return Observable.create(function (observer) {
                _this.http.post('http://localhost:3000/usersLogin', body_1, options_1)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (response) {
                    observer.next(response);
                    observer.complete();
                });
            });
        }
    };
    AuthService.prototype.register = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        }
        else {
            var body_2 = JSON.stringify(credentials);
            var header = new Headers();
            header.append('Content-Type', 'application/json');
            var options_2 = new RequestOptions({ headers: header });
            console.log(body_2);
            return Observable.create(function (observer) {
                _this.http.post('http://localhost:3000/registerUser', body_2, options_2)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (response) {
                    observer.next(response);
                    observer.complete();
                });
            });
        }
    };
    AuthService.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthService.prototype.logout = function () {
        return Observable.create(function (observer) {
            sessionStorage.removeItem('userLoggedIn');
            sessionStorage.removeItem('UID');
            observer.next(true);
            observer.complete();
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth-service.js.map