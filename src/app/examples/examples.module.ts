import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from 'app/examples/login/login.component';
import { ForgotComponent } from 'app/examples/forgot/forgot.component';
import { RouterLinkWithHref, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
  ],
    declarations: [
        LandingComponent,
        LoginComponent,
        ForgotComponent,
        ProfileComponent
    ]
})
export class ExamplesModule { }
