import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

// Interfaces
import { log, logTypes } from 'src/app/interfaces/log.interface';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class UtilsProvider {

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  /**
   * Generic form value debug
   * 
   * @param form 
   */
  debugForm(form: FormGroup) {
    log(this, JSON.stringify(form.value, null, 2), logTypes.DEBUG);
  }

  /**
   * Generic error alert popup
   * 
   * @param header 
   * @param subHeader 
   * @param message 
   */
  async presentAlert(header: string, subHeader?: string, message?: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-popup',
      mode: 'ios',
      backdropDismiss: false,
      header: header,
      subHeader: subHeader,
      message: message ? message : 'An error occurred. Please try again later.',
      buttons: ['OK']
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  /**
   * Generic prettier exception alert popup
   * 
   * @param title 
   * @param exception 
   */
  async showErrorAlert(title: string, exception: any) {
    let message = 'An error occurred. Please try again later.';

    if (exception) {
      let err = !exception.error ? JSON.parse(exception) : exception.error;
      // let err = exception;

      try {
        let prettier = (obj: any) => {
          let str = '';
          Object.keys(obj).forEach((key: string) => {
            const header = key[0].toUpperCase() + key.substr(1);
            const message = obj[key][0].toUpperCase() + obj[key].substr(1);
            str += `${header}: ${message}
              `;
          });
          return str;
        };
        message = typeof err.error === 'string' ? err.error : prettier(err.error);
        // message = err.error.statusMessage;
      } catch (e) {
        message = err;
      }
    }

    this.presentAlert('Error', title, _.capitalize(message));
  }

  /**
   * Remove whitespaces in a form input field
   * 
   * @param form 
   * @param fieldName 
   */
  trimFormValue(form: FormGroup, fieldName: string) {
    let str = form.get(fieldName).value;
    str = str.trim();
    str = str.replace(/\s/g, '');
    form.get(fieldName).setValue(str);
  }
}