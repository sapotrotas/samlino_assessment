import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
// import { HttpClient } from '@angular/common/http';

// Providers
import { StorageProvider } from './storage.provider';
import { UtilsProvider } from './utils.provider';
import login from 'src/app/providers/auth.provider';
import signUp from 'src/app/providers/auth.provider';

// Interfaces
import { log, logTypes } from '../interfaces/log.interface';

// Constants
import { STORAGE_USER, SERVICE_URL } from 'src/conf';

@Injectable({
  providedIn: 'root',
})
export class ApiProvider {
  serviceUrl: string = SERVICE_URL;

  constructor(
    // private ngHttp: HttpClient,
    private alertController: AlertController,
    public navController: NavController,
    public storage: StorageProvider,
    private utilsProvider: UtilsProvider,
  ) { }

  /**
   * Get server data
   * 
   * @param resource 
   */
  async getDataArray(resource: string) {
    return await this.get(`/${resource}`);
  }

  /**
   * JSONPlaceholder fetch 
   * 
   * @param url resource
   */
  async get(url: string): Promise<any> {
    const user = this.storage.getItem(STORAGE_USER);

    const options = {
      headers: new Headers({
        Authorization: `Bearer ${user.jwt}`,
      }),
      method: "GET",
    };

    try {
      // Angular uses HttpClient instead
      return await fetch(`${this.serviceUrl}${url}`, options)
        .then(response => response.json());
    } catch (e) {
      throw e;
    }
  }

  /**
   * Check user session
   */
  async checkSession(): Promise<any> {
    try {
      let user = this.storage.getItem(STORAGE_USER);
      if (!user || !user.jwt /*|| !user.guid*/) {
        throw 'No user stored';
      }
    } catch (e) {
      log(this, e, logTypes.DEBUG);
      throw e;
    }
  }

  /**
   * Logout
   */
  async logout() {
    const loading = await this.utilsProvider.loadingController.create({
      mode: 'ios',
      message: 'Logging out...',
    });

    await loading.present();

    try {
      // remove token
      // let response = await this.post('/logout', {});
      this.storage.removeItem(STORAGE_USER);

      // clear stack, forces DOM cleanup
      await this.navController.navigateRoot('login')
      loading.dismiss();
    } catch (e) {
      loading.dismiss();
      throw e;
    }
  }

  /**
   * Login
   * 
   * @param email 
   * @param password 
   */
  async login(email: string, password: string) {
    const loading = await this.utilsProvider.loadingController.create({
      mode: 'ios',
      message: 'Logging in...',
    });

    await loading.present();

    // force logout - remove token before authentication
    try {
      // await this.post('/logout', null);
      this.storage.removeItem(STORAGE_USER);
    } catch (e) {
      log(this, 'Cannot logout', logTypes.WARN);
      await loading.dismiss();
    }

    // login
    try {
      let user: any = await login.login(email, password);
      log(
        this,
        'Login response: ' + JSON.stringify(user, null, 2),
        logTypes.DEBUG
      );

      // save user in storage
      await this.storage.setItem(STORAGE_USER, user);

      // TODO...check user permissions
      // this.page.setPagePermissions(user.role);

      await loading.dismiss();

      // clean login page from DOM
      await this.navController.navigateRoot('tabs/home');
    } catch (e) {
      // TODO...login reject() at auth.provider
      log(this, JSON.stringify(e), logTypes.ERROR);
      await loading.dismiss();

      await this.utilsProvider.showErrorAlert('Login', e);
      // this.utilsProvider.showErrorAlert('Login', JSON.stringify(e.error.statusMessage));
    }
  }

  /**
   * Register user
   * 
   * @param obj form {input: value}
   */
  async register(obj: any): Promise<boolean> {
    const loading = await this.utilsProvider.loadingController.create({
      mode: 'ios',
      message: 'Signing up...',
    });

    await loading.present();

    try {
      // await this.post('/register', obj);
      await signUp.signUp();

      await loading.dismiss();

      // show success alert
      const alert = await this.alertController.create({
        mode: 'ios',
        backdropDismiss: false,
        header: 'Wellcome',
        message: 'Registration successful',
        buttons: ['OK']
      });
      await alert.present();

      // wait for user
      await alert.onDidDismiss();
      return true;

    } catch (e) {
      await loading.dismiss();
      this.utilsProvider.showErrorAlert('Register', e);
      return false;
    }
  }

  // async resetPassword(email: string) {
  //   const message = 'Please check your email to reset your password.';

  //   const loading = await this.utilsProvider.loadingController.create({
  //     mode: 'ios',
  //     message: 'Please wait...',
  //   });

  //   await loading.present();

  //   try {
  //     await this.apiProvider.post('/password/recover', {
  //       email: email,
  //     });
  //   } catch (e) {
  //     loading.dismiss();
  //     this.utilsProvider.showErrorAlert('Password Reset', e);
  //     return;
  //   }

  //   loading.dismiss();
  //   this.utilsProvider.presentAlert('', 'Password Reset Request', message);
  // }

  // encodeURI(s: string): string {
  //   return encodeURI(s).replace(/[!'()*]/g, (c) => {
  //     return '%' + c.charCodeAt(0).toString(16);
  //   });
  // }
}
