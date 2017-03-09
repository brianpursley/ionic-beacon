import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { Settings } from '../providers/settings';
import { BeaconDetector } from '../providers/beacon-detector';
import { LocationManager } from '../providers/location-manager';

@Component({
  templateUrl: 'app.html',
  providers: [
    Settings, 
    BeaconDetector, 
    LocationManager
  ]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, settings: Settings, beaconDetector: BeaconDetector) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      
      settings.load().then(() => {
        beaconDetector.start('FA95A705-0471-CA87-844D-E33433AD6361');
      });
    });
  }
}
