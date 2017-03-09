import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Settings } from '../../providers/settings';
import { BeaconDetector } from '../../providers/beacon-detector';

@Component({
  selector: 'page-beacons',
  templateUrl: 'beacons.html'
})
export class BeaconsPage {
  public beacons = [];

  private handleBeaconStatusChanged = (beacons) => {
    const maxAge = 10000;
    let displayableBeacons: Array<any> = [];
    let currentTimestamp = (new Date()).getTime();
    for (let key in beacons) {
      let beacon = beacons[key];
      let isWithinRange = this.settings.accuracyThreshold === 0 || beacon.accuracy <= this.settings.accuracyThreshold;
      let age = (currentTimestamp - beacon.timestamp);
      let isWithinAgeLimit = age <= maxAge;
      if (isWithinRange && isWithinAgeLimit) {
        displayableBeacons.push(beacon);
      }
    }
    this.beacons = displayableBeacons.sort((a, b) => a.minor - b.minor);
    this.changeDetectorRef.detectChanges();
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public changeDetectorRef: ChangeDetectorRef,
    public settings: Settings, 
    public beaconDetector: BeaconDetector
  ) {
    beaconDetector.addBeaconStatusChangedHandler(this.handleBeaconStatusChanged);
  }

}
