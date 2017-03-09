import { Component } from '@angular/core';

import { BeaconsPage } from '../beacons/beacons';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = BeaconsPage;
  tab2Root: any = SettingsPage;
}
