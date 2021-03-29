import { EditCourseComponent } from './edit-course/edit-course.component';
import { AddmaterialComponent } from './create-course/create-course.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'instructors/courses/create', component: AddmaterialComponent },
  { path: 'instructors/courses/:id/update', component: EditCourseComponent },
  { path: 'card', component: CardComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'user/:id/course/:id2/details', component: CourseTableComponent },
  { path: 'user/:id/course/:id2/materials', component: MaterialTableComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
