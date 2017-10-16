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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { QuestionsProvider } from '../../providers/questions/questions';
/**
 * Generated class for the QuestionsetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var QuestionsetPage = (function () {
    function QuestionsetPage(nav, navParams, auth, quizFactory) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.auth = auth;
        this.quizFactory = quizFactory;
        this.score = 0;
        this.examCourse = { training: '' };
        this.data = { course: '', marksObtained: '', UID: '' };
        this.getQuestion = function () {
            var q = this.quizFactory.getQuestion(this.id);
            if (q) {
                this.question = q.question;
                this.options = q.options;
                this.answer = q.answer;
                this.answerMode = true;
            }
            else {
                this.quizOver = true;
            }
        };
        this.checkAnswer = function () {
            if (this.ans == undefined)
                return;
            //console.log(this.ans);
            if (this.ans == this.options[this.answer]) {
                this.score++;
                this.correctAns = true;
                this.resultPercent = this.score / this.totalQuestion * 100;
            }
            else {
                this.correctAns = false;
            }
            this.answerMode = false;
        };
        this.nextQuestion = function () {
            this.id++;
            this.getQuestion();
        };
        if (sessionStorage.getItem('userLoggedIn') != 'true') {
            this.nav.setRoot('RegisterPage');
        }
        else {
            this.selectedItem = navParams.get('item');
            this.course = this.selectedItem.question_category;
            this.examCourse = { training: this.selectedItem.question_category };
            console.log(this.selectedItem);
            this.quizFactory.questionSet(this.examCourse).subscribe(function (success) {
                console.log(success);
                _this.totalQuestion = success.count;
            }, function (error) {
                console.log(error);
            });
        }
    }
    QuestionsetPage.prototype.start = function () {
        this.id = 0;
        this.quizOver = false;
        this.inProgress = true;
        this.getQuestion();
    };
    QuestionsetPage.prototype.submitScore = function () {
        var _this = this;
        this.data = { course: '', marksObtained: '', UID: '' };
        this.quizFactory.result().subscribe(function (success) {
            console.log(success);
            _this.totalQuestion = success.count;
        }, function (error) {
            console.log(error);
        });
    };
    QuestionsetPage.prototype.reset = function () {
        this.inProgress = false;
        this.score = 0;
    };
    QuestionsetPage.prototype.logout = function () {
        var _this = this;
        this.auth.logout().subscribe(function (succ) {
            _this.nav.setRoot('RegisterPage');
        });
    };
    return QuestionsetPage;
}());
QuestionsetPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-questionset',
        templateUrl: 'questionset.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AuthService, QuestionsProvider])
], QuestionsetPage);
export { QuestionsetPage };
//# sourceMappingURL=questionset.js.map