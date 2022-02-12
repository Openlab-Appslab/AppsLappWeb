import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { RegistrationComponent } from './User-operations/registration/registration.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './User-operations/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EmailVerificationComponent } from './Email/email-verification/email-verification.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import { LoginFailedComponent } from './User-operations/login-failed/login-failed.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    EmailVerificationComponent,
    LoginFailedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatListModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
