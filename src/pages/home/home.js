var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { QuestionsProvider } from '../../providers/questions/questions';
var HomePage = (function () {
    function HomePage(nav, auth, quizFactory, alertCtrl, loadingCtrl) {
        var _this = this;
        this.nav = nav;
        this.auth = auth;
        this.quizFactory = quizFactory;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        if (sessionStorage.getItem('userLoggedIn') != 'true') {
            this.nav.setRoot('RegisterPage');
        }
        else {
            this.quizFactory.quizCategory().subscribe(function (success) {
                _this.items = success;
            }, function (error) {
                console.log(error);
            });
        }
    }
    HomePage.prototype.itemTapped = function (event, item) {
        this.showLoading();
        this.nav.setRoot('QuestionsetPage', {
            item: item
        });
    };
    HomePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        this.auth.logout().subscribe(function (succ) {
            _this.nav.setRoot('RegisterPage');
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, AuthService, QuestionsProvider, AlertController, LoadingController])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map