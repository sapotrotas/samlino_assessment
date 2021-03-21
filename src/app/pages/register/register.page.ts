import { Component, OnInit } from '@angular/core';
// import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

// Providers
import { ApiProvider } from 'src/app/providers/api.provider';
import { UtilsProvider } from 'src/app/providers/utils.provider';

// Form validators
// import { CustomValidators } from 'src/app/validators/customValidators.validator';

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

  ngOnInit() {
    // this.registerForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   email: ['',
    //     [
    //       Validators.required,
    //       // Validators.email
    //     ]
    //   ],
    //   address: ['', Validators.required],
    //   phone: ['', Validators.required],
    //   website: ['', Validators.required],
    //   password: ['',
    //     [
    //       Validators.required,
    //       Validators.minLength(6)
    //     ],
    //     Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9@$!%*?&]+$')
    //   ],
    //   confirm: ['', Validators.required],
    // },
    //   // custom validators
    //   {
    //     validators: CustomValidators.passwordValidator('password', 'confirm'),
    //   });
  }

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

  // get srform() {
  //   return this.registerForm.controls;
  // }

  // async ngRegister() {
  //    log(this, JSON.stringify(this.registerForm.value, null, 2), logTypes.DEBUG);
  //   if (await this.apiProvider.register(this.registerForm.value)) {
  //     // automatic login after successful registration
  //     await this.apiProvider.login(formObj.email, formObj.password);
  //   }
  // }
}