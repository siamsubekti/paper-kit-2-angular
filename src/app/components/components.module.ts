import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecentDataComponent } from 'app/components/recent-data/recent-data.component';
import { StatisticComponent } from 'app/components/statistic/statistic.component';
import { VideoNewsComponent } from 'app/components/video-news/video-news.component';
import { WebsiteFeatureComponent } from 'app/components/website-feature/website-feature.component';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalComponent } from './modal/modal.component';
import { NgbdModalContent } from './modal/modal.component';
import {AllComponentComponent} from './all-component/all-component.component';
import { HttpClientModule } from '@angular/common/http';
import { RainfallService } from 'app/shared/fetch-api/services/rainfall.service';
import { RainfallComponent } from 'app/components/rainfall/rainfall.component';
import { BgWaterLevelDataPipe } from 'app/shared/pipe/bg-water-level-data.pipe';
import { RainfallDialogComponent } from 'app/shared/dialog/rainfall-dialog/rainfall-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogBasicComponent } from 'app/shared/dialog/basic/dialog-basic.component';
import { AboutComponent } from 'app/components/about/about.component';
import { TelajasariComponent } from 'app/components/telajasari/telajasari.component';
import { WlaharCilacapComponent } from 'app/components/wlahar-cilacap/wlahar-cilacap.component';
import { DateParsePipe } from 'app/shared/pipe/date-parse.pipe';
import { ClimatologyDialogComponent } from 'app/shared/dialog/climatology-dialog/climatology-dialog.component';
import { CilacapService } from 'app/shared/fetch-api/services/cilacap.service';
import { TelajasariService } from 'app/shared/fetch-api/services/telajasari.service';
import { UserService } from 'app/shared/fetch-api/services/user.service';
import { DigitOnlyDirective } from 'app/shared/directive/digit-only.directive';
import { NumberIndexPipe } from 'app/shared/pipe/number-index.pipe';
import { ManageUsersComponent } from 'app/components/manage-users/manage-users.component';
import { UserDialogComponent } from 'app/shared/dialog/user-dialog/user-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        ReactiveFormsModule,
        NgSelectModule,
        DateParsePipe,
        HttpClientModule,
        DigitOnlyDirective,
        NumberIndexPipe,
    ],
  declarations: [
    ComponentsComponent,
    BasicelementsComponent,
    NavigationComponent,
    TypographyComponent,
    NucleoiconsComponent,
    NotificationComponent,
    NgbdModalComponent,
    NgbdModalContent,
    WebsiteFeatureComponent,
    RecentDataComponent,
    StatisticComponent,
    VideoNewsComponent,
    AllComponentComponent,
    RainfallComponent,
    BgWaterLevelDataPipe,
    RainfallDialogComponent,
    ClimatologyDialogComponent,
    DialogBasicComponent,
    UserDialogComponent,
    AboutComponent,
    TelajasariComponent,
    WlaharCilacapComponent,
    ManageUsersComponent,
  ],
  providers: [RainfallService, CilacapService, UserService],
  entryComponents: [NgbdModalContent],
  exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
