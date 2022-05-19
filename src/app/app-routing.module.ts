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



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'registration', component: RegistrationComponent },
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent, },
  {path: 'emailV', component: EmailVerificationComponent, canActivate: [AuthGuard]},
  {path: 'lab-form', component: LabFormComponent},
  {path: 'exercises', component: ExercisesComponent, },
  {path: 'lab-detail', component: LabDetailComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
