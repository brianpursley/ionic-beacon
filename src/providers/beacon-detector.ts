import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { LocationManager } from './location-manager';

@Injectable()
export class BeaconDetector {
  private beacons = {};
  private beaconStatusChangedHandlers = [];

  private didRangeBeaconsInRegionHandler = (result) => {
    for (let beacon of result.beacons) {
      beacon.accuracy = this.calculateAccuracy(beacon.rssi, beacon.tx);
      beacon.key = beacon.uuid + '.' + beacon.major + '.' + beacon.minor;
      beacon.timestamp = (new Date()).getTime();
      this.beacons[beacon.key] = beacon;
    }
    this.notifyBeaconStatusChanged();
  }

  private notifyBeaconStatusChanged(): void {
    for (let beaconStatusChangedHandler of this.beaconStatusChangedHandlers) {
      beaconStatusChangedHandler(this.beacons);
    }
  }

  private calculateAccuracy(rssi, tx): void {
    let ratio = rssi / tx;
    let accuracy;
    if (ratio < 1.0) {
      accuracy = Math.pow(ratio, 10);
    }
    else {
      accuracy = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;    
    }
    if (accuracy < 1) {
      accuracy = Math.round(accuracy * 100) / 100;
    }
    else if (accuracy < 10) {
      accuracy = Math.round(accuracy * 10) / 10;
    }
    else {
      accuracy = Math.round(accuracy);
    }
    return accuracy;
  }

  public addBeaconStatusChangedHandler(beaconStatusChangedHandler): void {
    this.beaconStatusChangedHandlers.push(beaconStatusChangedHandler);
  };

  public getBeacons(): any {
    return this.beacons;
  };

  public start(uuid): void { 
    this.locationManager.start(uuid, this.didRangeBeaconsInRegionHandler);
  };

  constructor(
    public locationManager: LocationManager
  ) {}
}
