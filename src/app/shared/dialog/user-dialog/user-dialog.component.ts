import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'app/shared/fetch-api/model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'app/shared/fetch-api/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit, AfterViewInit {
  @Input() data: UserModel;
  @Input() users: UserModel[];
  @Input() title: string;

  formGroup: FormGroup;
  alert: {
    show: boolean,
    message: string,
    bgAlert: string
  };
  dataOptions = [
    {
      id: '1',
      name: 'active'
    },
    {
      id: '2',
      name: 'non-active'
    }
  ];

  // password
  pattern = {
    required: false,
    minEight: false,
    oneUpperCase: false,
    oneLowerCase: false,
    oneDigits: false,
    oneSpecialChar: false,
  }
  isValidBtn = false;
  isAlreadyExist = false;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.formGroup.get('password').valueChanges.subscribe((res) => {
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

  ngOnInit(): void {
    if (this.data) {
      console.log('on init ')
    }
    this.initForm();
    if (this.data) {
      this.setForm();
    }
  }

  initForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(uuidv4()),
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      status: new FormControl(null, [Validators.required])
    })
  }

  setForm() {
    this.formGroup.get('id').setValue(this.data.id);
    this.formGroup.get('user').setValue(this.data.user);
    this.formGroup.get('password').setValue(this.data.password);
    const status = this.dataOptions.find(val => val.name === this.data.status);
    this.formGroup.get('status').setValue(status.name);
  }

  save(value): void {
    if (this.data) {
      this.updateUser(value)
    } else {
      this.addUser(value);
    }
  }

  addUser(payload: UserModel) {
    const find = this.users.find(val => val.user === payload.user);
    if (!find) {
      this.userService.createUser(payload)
        .subscribe({
          next: () => {
            this.activeModal.close('close add user');
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['users']));
          }
        })
    } else {
      this.isAlreadyExist = true;
    }
  }

  updateUser(payload: UserModel) {
    const filterName = this.users.filter(fil => fil.user !== this.data.user);
    console.log('filter name ', filterName)
    const find = filterName.find(val => val.user === payload.user);
    console.log('find ', find)
    if (!find) {
      this.userService.updateUser(payload)
        .subscribe({
          next: () => {
            this.activeModal.close('close update user');
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['users']));
          }
        })
    } else {
      this.isAlreadyExist = true;
    }
  }
}
