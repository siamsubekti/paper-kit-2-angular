import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { LoginComponent } from 'app/examples/login/login.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {AllComponentComponent} from './components/all-component/all-component.component';
import { RainfallComponent } from 'app/components/rainfall/rainfall.component';
import { AboutComponent } from 'app/components/about/about.component';
import { WlaharCilacapComponent } from 'app/components/wlahar-cilacap/wlahar-cilacap.component';
import { TelajasariComponent } from 'app/components/telajasari/telajasari.component';
import { ManageUsersComponent } from 'app/components/manage-users/manage-users.component';
import { ForgotComponent } from 'app/examples/forgot/forgot.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'login',           component: LoginComponent },
    { path: 'forgot',           component: ForgotComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'all-component', component: AllComponentComponent },
    { path: 'cilacap-data', component: WlaharCilacapComponent },
    { path: 'rainfall', component: RainfallComponent },
    { path: 'about', component: AboutComponent },
    { path: 'telajasari-data', component: TelajasariComponent },
    { path: 'users', component: ManageUsersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
