import { Component, OnInit } from '@angular/core';
import { TelajasariService } from 'app/shared/fetch-api/services/telajasari.service';
import { CilacapModel } from 'app/shared/fetch-api/model/cilacap.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'app/shared/fetch-api/services/user.service';
import { RainfallDialogComponent } from 'app/shared/dialog/rainfall-dialog/rainfall-dialog.component';
import { format } from 'date-fns';
import { DialogBasicComponent } from 'app/shared/dialog/basic/dialog-basic.component';
import { DialogBasic } from 'app/shared/dialog/basic/dialog-basic.interface';
import { ClimatologyDialogComponent } from 'app/shared/dialog/climatology-dialog/climatology-dialog.component';
import { v4 as uuidv4 } from 'uuid';
import { be } from 'date-fns/locale';
@Component({
  selector: 'app-telajasari',
  templateUrl: './telajasari.component.html',
  styleUrls: ['./telajasari.component.scss']
})
export class TelajasariComponent implements OnInit {
  data: CilacapModel[] = [];
  isLoggedIn;
  modalConfirm: NgbModalRef;
  modalRefRemove: NgbModalRef;
  modalRefUpdate: NgbModalRef;
  page = 1;
  pageSize = 10;
  start: string;
  end: string;
  params: Params;
  constructor(
      private activateRouter: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private telajasariService: TelajasariService,
    private modalService: NgbModal
  ) {
  }

  getPageSymbol(current: number) {
    return current;
  }

  onChangePages(event, click: boolean = false) {
    this.page = event;
  }
  ngOnInit() {
    this.getTelajasariData();
    this.userService.getStateLogin()
      .subscribe((res) => {
        this.isLoggedIn = res;
      })
    this.isLoggedIn = localStorage.getItem('user_login');
  }

  open() {
    this.modalConfirm = this.modalService.open(RainfallDialogComponent, {
      centered: true,
      backdrop: true
    })
    this.modalConfirm.componentInstance.type = {
      name: 'telajasari',
      data: this.data,
      type: 'Add'
    };
  }

  getTelajasariData(): void {
    this.telajasariService.getTelajasariData()
      .subscribe({
        next: (res: CilacapModel[]) => {
          this.data = res;
          let amountMonth = [];
          let amountYear = [];
          this.data.forEach((item, index) => {
            const parse = +item.month - 1;
            item.month = parse.toString();
            item.month_date = {
              year: item.year,
              day: '1',
              month: item.month
            }
            amountMonth.push(+item.month)
            amountYear.push(+item.year)
            const startDate = `${format(new Date(Math.min(...amountYear), Math.min(...amountMonth), 1), 'MMMM yyyy')}`;
            const endDate = `${format(new Date(Math.max(...amountYear), Math.max(...amountMonth), 1), 'MMMM yyyy')}`;
            this.start = startDate;
            this.end = endDate;
          })
          this.data.sort((a, b) => +a.year - +b.year);
        }
      })
  }

  remove(id: string) {
    this.modalRefRemove = this.modalService.open(DialogBasicComponent);
    this.modalRefRemove.componentInstance.data = {
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
    this.modalRefRemove.result.then((result) => {
      if (result) {
        this.telajasariService.deleteTelajasari(id)
          .subscribe({
            next: () => {
              this.router.navigateByUrl('/', {skipLocationChange: true})
                .then(() => this.router.navigate(['telajasari-data']))
            }
          })
      }
    })
  }

  getTelajasariById(id: string) {
    this.telajasariService.getTelajasariById(id)
      .subscribe({
        next: (res) => {
          this.modalRefUpdate = this.modalService.open(RainfallDialogComponent);
          this.modalRefUpdate.componentInstance.dataT = res;
          this.modalRefUpdate.componentInstance.type = {
            name: 'telajasari',
            data: this.data,
            type: 'Update'
          };
        }
      })
  }
}
