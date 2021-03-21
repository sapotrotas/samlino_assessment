import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

  // check match between password and confirm password
  static passwordValidator = (
    controlName: string,
    matchingControlName: string
  ) => {
    return (formControl: AbstractControl): ValidationErrors | null => {
      if (formControl) {
        const control: AbstractControl = formControl.get([controlName]);
        const matchingControl: AbstractControl = formControl.get([matchingControlName]);

        // skip if matching control has other errors
        if (matchingControl.errors && !matchingControl.errors.passwordValidator) {
          return null;
        }

        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ passwordValidator: true });
          return ({ passwordValidator: true });
        } else {
          matchingControl.setErrors(null);
          return null;
        }
      } else {
        return null;
      }
    };
  }
}
