import { Component, OnInit } from '@angular/core';

// Providers
import { ApiProvider } from 'src/app/providers/api.provider';
import { UtilsProvider } from 'src/app/providers/utils.provider';

// Interfaces
import { log, logTypes } from 'src/app/interfaces/log.interface';

// Constants
import { STORAGE_USER, userIsAdmin } from 'src/conf';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public data: Array<any>;
  
  constructor(
    private apiProvider: ApiProvider,
    private utilsProvider: UtilsProvider,
  ) { }

  async ngOnInit() {
    const user = this.apiProvider.storage.getItem(STORAGE_USER);

    // get resource from server
    this.data = await this.getUsersData('users');

    // get a single random data element if user role is not ADMIN
    if (this.data.length > 0 && !userIsAdmin(user.role)) {
      this.data = [this.data[Math.floor(Math.random() * this.data.length)]];
    }
  }

  async getUsersData(url: string) {
    const loading = await this.utilsProvider.loadingController.create({
      mode: 'ios',
      message: 'Please wait...',
    });

    await loading.present();

    let usersdata;
    try {
      usersdata = await this.apiProvider.getDataArray(url);
    } catch (e) {
      loading.dismiss();
      log(this, e, logTypes.ERROR);
    }

    loading.dismiss();
    return usersdata;
  }

  /**
   * Verify given field is an object with subfields
   * 
   * @param field 
   */
  isObj(field: { key: string, value: any }): boolean {
    return field.value && typeof field.value === 'object';
  }

}
