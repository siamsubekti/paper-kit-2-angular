import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/shared/fetch-api/services/user.service';
import { UserModel } from 'app/shared/fetch-api/model/user.model';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit, AfterViewInit {
  test: Date = new Date();
  focus;
  focus1;
  formGroupUsername: FormGroup;
  formGroupPassword: FormGroup;
  isValidBtn = false;
  users: UserModel[] = [];
  isValidUser = false;
  changeForm = false;
  errorUsername = false;
  isUpdatedPassword = false;
  userOldPassNotValid = false;
  pattern = {
    oldPassword : {
      required: false,
      minEight: false,
      oneUpperCase: false,
      oneLowerCase: false,
      oneDigits: false,
      oneSpecialChar: false,
      validBtn: false
    },
    newPassword : {
      required: false,
      minEight: false,
      oneUpperCase: false,
      oneLowerCase: false,
      oneDigits: false,
      oneSpecialChar: false,
      validBtn: false
    },
    confirmPassword : {
      match : true,
      validBtn: false
    }
  }
  constructor(
    private userService: UserService
  ) {}

  ngAfterViewInit() {
    if (this.formGroupPassword) {
      this.formGroupPassword.get('oldPassword').valueChanges.subscribe((res) => {
        res.toString();
        this.checkPattern('oldPassword', res);
      });
      this.formGroupPassword.get('newPassword').valueChanges.subscribe((res) => {
        res.toString();
        this.checkPattern('newPassword', res);
      });
      this.formGroupPassword.get('confirmPassword').valueChanges.subscribe((res) => {
        res.toString();
        this.pattern['confirmPassword'].match = this.formGroupPassword.get('newPassword').value === res;
        if (this.pattern['confirmPassword'].match) {
          this.pattern['confirmPassword'].validBtn = true;
        } else {
          this.pattern['confirmPassword'].validBtn = false;
        }
      });
    }
  }

  checkPattern(controlName: string, res: string) {
    const minEight = new RegExp(/(?=.{8,}).*$/);
    const oneUpperCase = new RegExp(/(?=.*[A-Z]).*$/);
    const oneLowerCase = new RegExp(/^(?=.*[a-z])/);
    const oneDigits = new RegExp(/(?=.*[0-9])/);
    const oneSpecialChar = new RegExp(/(?=.*[@#$%^&+!*()=~?]).*$/);
    this.pattern[controlName].required = res.length === 0;
    this.pattern[controlName].minEight = !minEight.test(res);
    this.pattern[controlName].oneUpperCase = !oneUpperCase.test(res);
    this.pattern[controlName].oneLowerCase = !oneLowerCase.test(res);
    this.pattern[controlName].oneDigits = !oneDigits.test(res);
    this.pattern[controlName].oneSpecialChar = !oneSpecialChar.test(res);
    // tslint:disable-next-line:max-line-length
    if (!this.pattern[controlName].required && !this.pattern[controlName].minEight && !this.pattern[controlName].oneUpperCase && !this.pattern[controlName].oneLowerCase && !this.pattern[controlName].oneDigits && !this.pattern[controlName].oneSpecialChar) {
      this.pattern[controlName].validBtn = true;
    } else {
      this.pattern[controlName].validBtn = false;
    }
  }

  ngOnInit() {
    this.getUsers();
    this.formGroupUsername = new FormGroup({
      email: new FormControl('', [Validators.required]),
    })
    this.formGroupPassword = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }

  getUsers(): void {
    this.userService.login()
      .subscribe({
        next: (res) => {
          this.users = res;
        }
      })
  }

  submit(value, valid, type) {
    if (valid && type === 'username') {
      if (this.users.some(val => val.user === value.email)) {
        this.changeForm = true;
      } else {
        this.errorUsername = true;
      }
    } else {
      const user = this.users.find(val => val.password === value.oldPassword);
      if (user) {
        this.userService.updateUser(
          {
            id: user.id,
            user: user.user,
            password: value.newPassword,
            status: user.status
          }
        ).subscribe({
          next: () => {
            this.userOldPassNotValid = false;
            this.isUpdatedPassword = true;
            this.changeForm = false;
            this.formGroupUsername.reset();
            this.formGroupPassword.reset();
          }
        })
      } else {
        this.userOldPassNotValid = true;
      }
    }
  }

  onBlur() {}
}
