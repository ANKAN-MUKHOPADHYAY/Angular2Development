import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
	linkDetails: any;
  	constructor(public nav: NavController, public navParams: NavParams, private auth: AuthService) {
		this.linkDetails = [
			  {
			    'title': 'User Profile',
			    'icon': 'contact',
			    'description': 'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.',
			    'color': '#3575AC',
			    'path': 'UserprofilePage'
			  },
			  {
			    'title': 'About App',
			    'icon': 'information-circle',
			    'description': 'The latest version of cascading stylesheets - the styling language of the web!',
			    'color': '#412159',
			    'path': 'UnderConstructionPage'
			  },
			  {
			    'title': 'Upcoming Changes',
			    'icon': 'paper-plane',
			    'description': 'The latest version of the web\'s markup language.',
			    'color': '#3779F9',
			    'path': 'UnderConstructionPage'
			  },
			  {
			    'title': 'Contact Us',
			    'icon': 'map',
			    'description': 'The latest version of the web\'s markup language.',
			    'color': '#F46529',
			    'path': 'UnderConstructionPage'
			  },
			  {
			    'title': 'Top Scorer',
			    'icon': 'ios-ionitron',
			    'description': 'One of the most popular programming languages on the Web!',
			    'color': '#3779F9',
			    'path': 'TopscorersPage'
			  },
			  {
			    'title': 'Your Score',
			    'icon': 'medal',
			    'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
			    'color': '#CE6296',
			    'path': 'UnderConstructionPage'
			  },
			  {
			    'title': 'Privacy Policy',
			    'icon': 'unlock',
			    'description': 'The latest version of the web\'s markup language.',
			    'color': '#3575AC',
			    'path': 'UnderConstructionPage'
			  }];
  }

  public openNavDetailsPage(path) {
  	this.nav.setRoot(path);
  }

  public logout() {
      this.auth.logout().subscribe(succ => {
        this.nav.setRoot('RegisterPage');
      });
  }

  public goToHome() {
  	this.nav.setRoot('HomePage');
  }

}
