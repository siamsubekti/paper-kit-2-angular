import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'app/shared/fetch-api/services/user.service';
import { Router } from '@angular/router';
import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';

@Component({
    selector: 'app-signup',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
    test : Date = new Date();
    focus;
    focus1;
    formGroup: FormGroup;
    errorInvalid: boolean = false;
    isPattern: boolean = false;
    pattern = {
        required: false,
        minEight: false,
        oneUpperCase: false,
        oneLowerCase: false,
        oneDigits: false,
        oneSpecialChar: false,
    }
    isValidBtn = false;
    constructor(
      private userService: UserService,
      private router: Router
    ) { }

    ngAfterViewInit() {
        this.formGroup.get('password').valueChanges.subscribe((res) => {
            console.log('res ', res)
            res.toString()
            // (?=.*[A-Z])
            const minEight = new RegExp(/(?=.{8,}).*$/);
            const oneUpperCase = new RegExp(/(?=.*[A-Z]).*$/);
            const oneLowerCase = new RegExp(/^(?=.*[a-z])/);
            const oneDigits = new RegExp(/(?=.*[0-9])/);
            const oneSpecialChar = new RegExp(/(?=.*[@#$%^&+!*()=~?]).*$/);
            this.pattern.required = res.length === 0;
            this.pattern.minEight = !minEight.test(res);
            this.pattern.oneUpperCase = !oneUpperCase.test(res);
            this.pattern.oneLowerCase = !oneLowerCase.test(res);
            this.pattern.oneDigits = !oneDigits.test(res);
            this.pattern.oneSpecialChar = !oneSpecialChar.test(res);
            // tslint:disable-next-line:max-line-length
            if (!this.pattern.required && !this.pattern.minEight && !this.pattern.oneUpperCase && !this.pattern.oneLowerCase && !this.pattern.oneDigits && !this.pattern.oneSpecialChar) {
                this.isValidBtn = true;
            } else {
                this.isValidBtn = false;
            }
        })
    }

    ngOnInit() {
        console.log('on init')
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        })
    }

    submit(value: { email: string, password: string }, valid: boolean) {
        this.errorInvalid = false;
        if (valid) {
            this.userService.login()
              .subscribe({
                  next: (res) => {
                      const find = res.find((data) => {
                          return data.user === value.email && data.password === value.password;
                      });
                      if (find && find.status === 'active') {
                          this.userService.stateLogin(true);
                          localStorage.setItem('user_login', JSON.stringify(value))
                          this.router.navigate(['home']);
                      } else {
                          this.errorInvalid = true;
                      }
                  }
              })
        }
    }

    onBlur(): void {
        this.pattern.required = false;
        this.pattern.minEight = false;
        this.pattern.oneUpperCase = false;
        this.pattern.oneLowerCase = false;
        this.pattern.oneDigits = false;
        this.pattern.oneSpecialChar = false;
    }
}
