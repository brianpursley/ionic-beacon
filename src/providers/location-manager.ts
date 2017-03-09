import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

function _window(): any { return window; }

@Injectable()
export class LocationManager {

  private startFake(uuid, didRangeBeaconsInRegionHandler): void {
    let fakeBeacons = [
      {uuid: uuid, major: 1, minor: 1, rssi: Math.floor(Math.random() * 50) + 30, tx: -76},
      {uuid: uuid, major: 1, minor: 2, rssi: Math.floor(Math.random() * 50) + 30, tx: -76},
      {uuid: uuid, major: 1, minor: 3, rssi: Math.floor(Math.random() * 50) + 30, tx: -76}
    ];
    setInterval(() => { 
      for (let fakeBeacon of fakeBeacons) {
        fakeBeacon.rssi += Math.floor(Math.random() * 20 - 10);
        fakeBeacon.rssi = Math.min(Math.max(fakeBeacon.rssi, 60), 100);
        fakeBeacon.tx += Math.floor(Math.random() * 20 - 10);
        fakeBeacon.tx = Math.min(Math.max(fakeBeacon.tx, -100), -50);
      }
      didRangeBeaconsInRegionHandler({beacons: fakeBeacons}); 
    }, 3000);
  }

  public start(uuid, didRangeBeaconsInRegionHandler): void { 
    let window = _window();

    if (!window.cordova) {
      // If running in a browser (ionic serve) locationManger is not available, so fake it
      return this.startFake(uuid, didRangeBeaconsInRegionHandler);
    }

    let locationManager = window.cordova.plugins.locationManager;
    locationManager.enableBluetooth();
    
    let delegate = new locationManager.Delegate();
    delegate.didRangeBeaconsInRegion = didRangeBeaconsInRegionHandler;
    locationManager.setDelegate(delegate);

    let beaconRegion = new locationManager.BeaconRegion('ionic-beacon', uuid);
    locationManager.startRangingBeaconsInRegion(beaconRegion);
  };

}
