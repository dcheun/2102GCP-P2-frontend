import { EditCourseComponent } from './edit-course/edit-course.component';
import { AddmaterialComponent } from './create-course/create-course.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'instructors/courses/create', component:AddmaterialComponent },
  { path: 'instructors/courses/:id/update', component: EditCourseComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
