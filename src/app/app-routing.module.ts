import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Lab-operations/dashboard/dashboard.component';
import { EmailVerificationComponent } from './Email/email-verification/email-verification.component';
import { LoginComponent } from './User-operations/login/login.component';
import { RegistrationComponent } from './User-operations/registration/registration.component';
import { LabFormComponent } from './Lab-operations/lab-form/lab-form.component';
import { ExercisesComponent } from './Lab-operations/exercises/exercises.component';
import { LabDetailComponent } from './Lab-operations/lab-detail/lab-detail.component';
import { AuthGuard } from './guard/auth-guard';
import { StudentDetailComponent } from './Lab-operations/student-detail/student-detail.component';



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'registration', component: RegistrationComponent },
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'emailV', component: EmailVerificationComponent, canActivate: [AuthGuard]},
  {path: 'lab-form', component: LabFormComponent, canActivate: [AuthGuard]},
  {path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard] },
  {path: 'lab-detail/:id', component: LabDetailComponent, canActivate: [AuthGuard]},
  {path: 'student-detail/:id', component: StudentDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
