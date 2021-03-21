import { Component, OnInit } from '@angular/core';
// import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

// Providers
import { ApiProvider } from 'src/app/providers/api.provider';
import { UtilsProvider } from 'src/app/providers/utils.provider';

// Interfaces
import { log, logTypes } from 'src/app/interfaces/log.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: any;

  public model = {
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    website: '',
  };

  constructor(
    private navController: NavController,
    private apiProvider: ApiProvider,
    public utilsProvider: UtilsProvider,
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.registerForm = document.querySelector('form');

    // restart form to initial state
    this.registerForm.reset();
  }

  /**
   * Submit register form
   * 
   */
  async register() {
    // show form errors
    if (!this.registerForm.reportValidity()) {
      return;
    }

    // form validation
    if (!this.registerForm.checkValidity()) {
      return;
    }

    // convert HTMLFormControlsCollection in array  
    const formDataArray = Array.prototype.slice.call(this.registerForm);
    let formObj: any = {};
    formDataArray.forEach(input => {
      if (input.id && input.value) {
        formObj[input.id] = input.value;
      }
    });

    log(this, JSON.stringify(formObj, null, 2), logTypes.DEBUG);

    // navigate to login and force DOM stack cleanup
    if (await this.apiProvider.register(formObj)) {
      await this.navController.navigateRoot('login')
    }
  }
}