import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPage } from './login.page';

describe('Test LoginPage', () => {
  let loginComponent: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    loginComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create login page', () => {
    expect(loginComponent).toBeTruthy();
  });

  it("should disable submit button when form is empty", () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const submitBtn = compiled.querySelector('ion-button');
    
    expect(submitBtn.disabled).toBeTruthy(); 
  });

  it("should enable submit button when form is not empty", () => {
    // fill form
    loginComponent.loginForm.controls['email'].patchValue('y');
    loginComponent.loginForm.controls['password'].patchValue('x');

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const submitBtn = compiled.querySelector('ion-button');

    expect(submitBtn.disabled).toBeFalsy();
  });
});