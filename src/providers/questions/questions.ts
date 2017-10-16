import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the QuestionsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class QuestionsProvider {
	questions: any;
	constructor(public http: Http) {
		//console.log('Hello Questions Provider');
	}

  	public questionSet(examCourse){
	  	let body = JSON.stringify(examCourse);
		let header = new Headers();
		header.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: header });

		return Observable.create(observer => {
			this.http.post('http://localhost:3000/questionSet', body, options)
		        .map(res => res.json())
		        .subscribe(response => {
		        	this.questions = response.result;
		            observer.next(response);
		            observer.complete();
		      	});
		});
  	} 

  	public getQuestion(id) {
  		if(id < this.questions.length) {
			return this.questions[id];
		} else {
			return false;
		}
	}

	public quizCategory(){
	  	let header = new Headers();
		header.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: header });

		return Observable.create(observer => {
			this.http.get('http://localhost:3000/getCategories', options)
		        .map(res => res.json())
		        .subscribe(response => {
		        	this.questions = response;
		            observer.next(response);
		            observer.complete();
		      	});
		});
  	}

  	public result(data){
  		//console.log(data);
  		let body = JSON.stringify(data);
		let header = new Headers();
		header.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: header });

		return Observable.create(observer => {
			this.http.post('http://localhost:3000/saveScore', body, options)
		        .map(res => res.json())
		        .subscribe(response => {
		        	this.questions = response.result;
		            observer.next(response);
		            observer.complete();
		      	});
		});
  	}

  	public quizTopScorer(){
  		let header = new Headers();
		header.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: header });

		return Observable.create(observer => {
			this.http.get('http://localhost:3000/topScorers', options)
		        .map(res => res.json())
		        .subscribe(response => {
		        	this.questions = response;
		            observer.next(response);
		            observer.complete();
		      	});
		});
  	}
}
