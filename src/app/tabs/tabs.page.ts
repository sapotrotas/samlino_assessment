import { Component } from '@angular/core';

// Providers
import { ApiProvider } from 'src/app/providers/api.provider';

// Constants
import { VERSION } from '../../conf';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  public appVersion: string;

  constructor(
    public apiProvider: ApiProvider,
  ) { 
    this.appVersion = VERSION;
  }
}
