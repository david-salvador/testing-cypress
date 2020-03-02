import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'testing-cypress';
  usernameMinLength = 4;
  passwordMinLength = 6;

  checked: boolean;

  profileForm: FormGroup;

  constructor() {
    this.profileForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(this.usernameMinLength),
        Validators.pattern('[a-zA-Z0-9]*'),
        // Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.pattern('[a-zA-Z0-9]+'),
      ]),
      termsAndConditions: new FormControl('', [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  getErrorMessageUsername() {
    if (this.profileForm.get('username').hasError('required')) {
      return 'You must enter a value';
    }

    if (this.profileForm.get('username').hasError('minlength')) {
      return `At least ${this.usernameMinLength} characters required`;
    }

    if (this.profileForm.get('username').hasError('pattern')) {
      return `Use only letters and numbers`;
    }

    return '';
  }

  getErrorMessagePassword() {
    if (this.profileForm.get('password').hasError('required')) {
      return 'You must enter a value';
    }

    if (this.profileForm.get('password').hasError('minlength')) {
      return `At least ${this.passwordMinLength} characters required`;
    }

    if (this.profileForm.get('password').hasError('pattern')) {
      return `Use only letters and numbers`;
    }

    return '';
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
}
