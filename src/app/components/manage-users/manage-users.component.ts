import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/fetch-api/services/user.service';
import { UserModel } from 'app/shared/fetch-api/model/user.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserDialogComponent } from 'app/shared/dialog/user-dialog/user-dialog.component';
import { DialogBasicComponent } from 'app/shared/dialog/basic/dialog-basic.component';
import { DialogBasic } from 'app/shared/dialog/basic/dialog-basic.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  isLoggedIn;
  users: UserModel[] = [];
  page = 1;
  pageSize = 10;
  ngUpdateModalRef: NgbModalRef;
  ngCreateModalRef: NgbModalRef;
  ngRemoveModalRef: NgbModalRef;
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.getUsers();
    this.userService.getStateLogin()
      .subscribe((res) => {
        this.isLoggedIn = res;
        if (!res) {
          this.router.navigate(['home'])
        }
      })
    this.isLoggedIn = localStorage.getItem('user_login');
  }

  open() {
    this.ngCreateModalRef = this.modalService.open(UserDialogComponent, {
      centered: true,
      backdrop: true
    });
    this.ngCreateModalRef.componentInstance.users = this.users;
    this.ngCreateModalRef.componentInstance.title = 'Add';
  }

  getUsers(): void {
    this.userService.login()
      .subscribe({
        next: (res: UserModel[]) => {
            this.users = res;
        }
      })
  }

  getUserById(id: string): void {
    this.userService.getUserById(id)
      .subscribe({
        next: (res: UserModel) => {
          this.ngUpdateModalRef = this.modalService.open(UserDialogComponent, {
            centered: true,
            backdrop: true
          });
          this.ngUpdateModalRef.componentInstance.data = res;
          this.ngUpdateModalRef.componentInstance.users = this.users;
          this.ngUpdateModalRef.componentInstance.title = 'Update';
        }
      })
  }

  remove(id: string): void {
    this.ngRemoveModalRef = this.modalService.open(DialogBasicComponent, {
      centered: true,
      backdrop: true
    });
    this.ngRemoveModalRef.componentInstance.data = {
      title: 'Remove Data',
      content: 'Are you sure you want to delete this data?',
      buttons: [
        {
          action: true,
          name: 'Yes',
          class: 'btn btn-success btn-link'
        },
        {
          action: false,
          name: 'Back',
          class: 'btn btn-default btn-link'
        }
      ]
    } as DialogBasic;
    history.pushState(null, null, 'modalOpened');
    this.ngRemoveModalRef.result.then((result) => {
      if (result) {
        this.userService.deleteUser(id)
          .subscribe({
            next: () => {
              this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => this.router.navigate(['users']));
            }
          })
      }
    })
  }
}
