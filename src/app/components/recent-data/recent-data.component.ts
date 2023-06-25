import { Component, OnInit } from '@angular/core';
import { RainfallService } from 'app/shared/fetch-api/services/rainfall.service';
import { PosHome, RainfallModel, ResponsePosHome } from 'app/shared/fetch-api/model/rainfall.model';
import { ClimatologyResponse } from 'app/shared/fetch-api/model/climatology-home.model';
import { ClimatologyService } from 'app/shared/fetch-api/services/climatology.service';
import { UserService } from 'app/shared/fetch-api/services/user.service';
import { CilacapService } from 'app/shared/fetch-api/services/cilacap.service';
import { CilacapModel } from 'app/shared/fetch-api/model/cilacap.model';
import { TelajasariService } from 'app/shared/fetch-api/services/telajasari.service';

@Component({
  selector: 'app-recent-data',
  templateUrl: './recent-data.component.html',
  styleUrls: ['./recent-data.component.scss']
})
export class RecentDataComponent implements OnInit {
  rainfalls: CilacapModel[] = [];
  rainfallByArea1: ResponsePosHome[] = [];
  rainfallByArea2: ResponsePosHome[] = [];
  rainfallByArea3: ResponsePosHome[] = [];
  tmaResponse: CilacapModel[] = [];
  tmaByArea1: ClimatologyResponse[] = [];
  tmaByArea2: ClimatologyResponse[] = [];
  tmaByArea3: ClimatologyResponse[] = [];
  isLoggedIn;

  constructor(
    private rainfallService: RainfallService,
    private tmaService: ClimatologyService,
    private userService: UserService,
    private cilacapService: CilacapService,
    private telajasariService: TelajasariService,
  ) {}
  ngOnInit(): void {
    this.getRainFall();
    this.getTMA();
    this.userService.getStateLogin().subscribe((res) => {
      this.isLoggedIn = res;
    });
    this.isLoggedIn = localStorage.getItem('user_login');
  }

  getRainFall(): void {
    this.cilacapService.getCilacapData()
      .subscribe({
        next: (res) => {
          this.rainfalls = res;
          this.rainfalls.forEach(item => {
            const parse = +item.month - 1;
            item.month = parse.toString();
            item.month_date = {
              year: item.year,
              day: '1',
              month: item.month
            }
          });
          this.rainfalls.sort((a, b) => +b.year - +a.year);
        }
      })
  }

  getTMA(): void {
    this.telajasariService.getTelajasariData()
      .subscribe({
        next: (res) => {
          this.tmaResponse = res;
          this.tmaResponse.forEach(item => {
            const parse = +item.month - 1;
            item.month = parse.toString();
            item.month_date = {
              year: item.year,
              day: '1',
              month: item.month
            }
          });
          this.tmaResponse.sort((a, b) => +b.year - +a.year);
        }
      })
  }
}
