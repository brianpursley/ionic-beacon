import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  ionViewDidLeave() { 
    return this.settings.save(); 
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public settings: Settings
  ) {}

}
