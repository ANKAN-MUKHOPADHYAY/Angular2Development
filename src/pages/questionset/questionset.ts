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
@IonicPage()
@Component({
  selector: 'page-questionset',
  templateUrl: 'questionset.html',
})
export class QuestionsetPage {
	id: any;
	inProgress: any;
	quizOver: any;
	score = 0;
	course: any;
	totalQuestion: any;
	resultPercent: any;
	question: any;
	options: any;
	answer: any;
	answerMode: any;
	correctAns:any;
	ans: any;
	selectedItem: any;
	examCourse = { training: ''};
	data = {};
	resultdata:any;

	constructor(public nav: NavController, public navParams: NavParams, private auth: AuthService, private quizFactory: QuestionsProvider) {
		if(sessionStorage.getItem('userLoggedIn') != 'true'){
	      this.nav.setRoot('RegisterPage');
	    } else {
	      this.selectedItem = navParams.get('item');
	      this.course = this.selectedItem.question_category;
	      this.examCourse = { training: this.selectedItem.question_category};
	      console.log(this.selectedItem);
	      this.quizFactory.questionSet(this.examCourse).subscribe(success => {
	        console.log(success);
	        this.totalQuestion = success.count;
	      },
	      error => {
	        console.log(error);
	      });
	    }
	}

	
	public start() {
	    this.id = 0;
	    this.quizOver = false;
	    this.inProgress = true;
	    this.getQuestion();
	}

	public reset() {
	    this.inProgress = false;
	    this.score = 0;
	}
	 
	public getQuestion = function() {
	    var q = this.quizFactory.getQuestion(this.id);
	    if(q) {
	      this.question = q.question;
	      this.options = q.options;
	      this.answer = q.answer;
	      this.answerMode = true;
	      this.ans = undefined;
	    } else {
	      this.quizOver = true;
	    }
	}

	public checkAnswer = function(){
	    if(this.ans == undefined) return;
	    //console.log(this.ans);

	    if(this.ans == this.options[this.answer]){
	      this.score++;
	      this.correctAns = true;
	      this.resultPercent = this.score/this.totalQuestion*100;
	    } else {
	      this.correctAns = false;
	    }
	    this.answerMode = false;
	}

	public nextQuestion = function() {
	    this.id++;
	    this.getQuestion();
	}

	public logout() {
	    this.auth.logout().subscribe(succ => {
	      this.nav.setRoot('RegisterPage');
	    });
	}

	public submitScore(){
		if(this.course == "angularjs"){
			this.data = {angularjs: this.resultPercent, UID: sessionStorage.getItem('UID')};
		} else if(this.course == "nodejs"){
			this.data = {nodejs: this.resultPercent, UID: sessionStorage.getItem('UID')};
		} else if(this.course == "knockoutjs"){
			this.data = {knockoutjs: this.resultPercent, UID: sessionStorage.getItem('UID')};
		}
		
		this.quizFactory.result(this.data).subscribe(success => {
			//console.log(success);
			this.totalQuestion = success.count;
			this.inProgress = false;
	    	this.score = 0;
	    	this.nav.setRoot('HomePage');
		},
		error => {
			console.log(error);
		});
	}
}
