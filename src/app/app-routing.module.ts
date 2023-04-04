import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerificationComponent } from './Email/email-verification/email-verification.component';
import { LoginComponent } from './User-operations/login/login.component';
import { RegistrationComponent } from './User-operations/registration/registration.component';
import { LabFormComponent } from './Lab-operations/lab-form/lab-form.component';
import { ExercisesComponent } from './Lab-operations/exercises/exercises.component';
import { LabDetailComponent } from './Lab-operations/lab-detail/lab-detail.component';
import { AuthGuard } from './guard/auth-guard';
import { StudentDetailComponent } from './Lab-operations/student-detail/student-detail.component';
import { EditExerciseComponent } from './Lab-operations/edit-exercise/edit-exercise.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './User-operations/reset-password/reset-password.component';



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'registration', component: RegistrationComponent },
  {path: 'login', component: LoginComponent },
  {path: 'emailV', component: EmailVerificationComponent, canActivate: [AuthGuard]},
  {path: 'lab-form', component: LabFormComponent, },
  {path: 'exercises', component: ExercisesComponent,  },
  {path: 'lab-detail/:id', component: LabDetailComponent, },
  {path: 'student-detail/:id', component: StudentDetailComponent, },
  {path: 'edit-exercise/:id', component: EditExerciseComponent, },
  {path: 'reset-password/:username', component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
