import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user.service';

interface inputFields {
  [index: string]: string;
  fName: string;
  lName: string;
  email: string;
  pw: string;
  confirmPW: string;
  accountType: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpUser: AppUser | null = null;
  hide: boolean = true;
  hideConfirm: boolean = true;
  loading: boolean = false;
  inputFieldVals: inputFields = {
    fName: '',
    lName: '',
    email: '',
    pw: '',
    confirmPW: '',
    accountType: '2',
  };
  inputErrMsgs: inputFields = {
    fName: '',
    lName: '',
    email: '',
    pw: '',
    confirmPW: '',
    accountType: '',
  };

  constructor(
    private appUserService: AppUserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  async signup() {
    if (!this.validateInputs()) {
      return;
    }
    this.loading = true;
    try {
      this.signUpUser = new AppUser(
        0,
        this.inputFieldVals.fName,
        this.inputFieldVals.lName,
        this.inputFieldVals.email,
        this.inputFieldVals.pw,
        parseInt(this.inputFieldVals.accountType),
        [],
        []
      );
      this.signUpUser = await this.appUserService.createAppUser(
        this.signUpUser
      );
      this.toastr.success(
        'Your account has been created. Please sign in to continue.',
        'Sign Up Success'
      );
      this.router.navigateByUrl('/signin');
    } catch (err) {
      console.log(err);
      this.toastr.error(
        err.error?.message ? err.error.message : err.message,
        'Registration Failure'
      );
    } finally {
      this.loading = false;
      this.resetInputs();
    }
  }

  validateInputs(): boolean {
    this.clearErrMsgs();
    let clean = true;
    for (const key in this.inputFieldVals) {
      if (!this.inputFieldVals[key]) {
        this.inputErrMsgs[key] = 'This field is required';
        clean = false;
      }
    }
    if (!clean) {
      return clean;
    }
    // Password validations
    if (this.inputFieldVals.pw.length < 6) {
      this.toastr.error(
        'Passwords should be at least 6 characters',
        'Form Error'
      );
      return false;
    }
    if (this.inputFieldVals.pw !== this.inputFieldVals.confirmPW) {
      this.toastr.error('Passwords do not match', 'Form Error');
      return false;
    }
    return clean;
  }

  clearErrMsgs(): void {
    for (const key in this.inputErrMsgs) {
      this.inputErrMsgs[key] = '';
    }
  }

  resetInputs(): void {
    for (const key in this.inputFieldVals) {
      this.inputFieldVals[key] = '';
    }
    this.inputFieldVals.accountType = '2';
  }

  demoToasts() {
    this.toastr.success(
      'Thank you for signing up, enjoy your learning experience!',
      'Sign Up Success'
    );
    setTimeout(() => {
      this.toastr.info(
        'Thank you for signing up, enjoy your learning experience!',
        'Sign Up Success'
      );
    }, 1000);
    setTimeout(() => {
      this.toastr.warning(
        'Thank you for signing up, enjoy your learning experience!',
        'Sign Up Success'
      );
    }, 2000);
    setTimeout(() => {
      this.toastr.error(
        'Thank you for signing up, enjoy your learning experience!',
        'Sign Up Success'
      );
    }, 3000);
  }
}
