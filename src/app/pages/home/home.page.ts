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
  public usersData: Array<any> = [];

  constructor(
    private apiProvider: ApiProvider,
    private utilsProvider: UtilsProvider,
  ) { }

  async ngOnInit() {
    const storedUser = this.apiProvider.storage.getItem(STORAGE_USER);
    
    // get resource from server
    await this.getUsersData();
    
    // get a single random data element if user role is not ADMIN
    if (this.usersData.length > 0 && !userIsAdmin(storedUser.role)) {
      this.usersData = [this.usersData[Math.floor(Math.random() * this.usersData.length)]];
    }
  }

  /**
   * Get array of users for page cards
   * 
   * @param url resource
   */
  async getUsersData() {
    const loading = await this.utilsProvider.loadingController.create({
      mode: 'ios',
      message: 'Please wait...',
    });

    await loading.present();

    try {
      this.usersData = await this.apiProvider.getUsers();
    } catch (e) {
      loading.dismiss();
      log(this, e, logTypes.ERROR); 
    }

    loading.dismiss();
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
