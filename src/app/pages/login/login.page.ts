import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Providers
import { UtilsProvider } from 'src/app/providers/utils.provider';
import { ApiProvider } from 'src/app/providers/api.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiProvider: ApiProvider,
    public utilsProvider: UtilsProvider,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          // Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
        ]
      ],
    });
  }

  async login() {
    await this.apiProvider.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

}