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
import { DashboardComponent } from './Lab-operations/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EmailVerificationComponent } from './Email/email-verification/email-verification.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import { LoginFailedComponent } from './User-operations/login-failed/login-failed.component';
import { LabFormComponent } from './Lab-operations/lab-form/lab-form.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExercisesComponent } from './Lab-operations/exercises/exercises.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import { LabDetailComponent } from './Lab-operations/lab-detail/lab-detail.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { StudentDetailComponent } from './Lab-operations/student-detail/student-detail.component';
import { EditExerciseComponent } from './Lab-operations/edit-exercise/edit-exercise.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    EmailVerificationComponent,
    LoginFailedComponent,
    LabFormComponent,
    ExercisesComponent,
    LabDetailComponent,
    StudentDetailComponent,
    EditExerciseComponent,
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
    DragDropModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatExpansionModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
