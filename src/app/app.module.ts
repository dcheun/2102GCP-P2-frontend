import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TimesPE3Directive } from './directives/times-pe3.directive';

import { SharedService } from './services/shared.service';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxLoadingModule } from 'ngx-loading';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ToastrModule } from 'ngx-toastr';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RateCourseComponent } from './components/rate-course/rate-course.component';
import { RatingComponent } from './components/rating/rating.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StoreService } from './services/store.service';
import { AppUserService } from './services/app-user.service';
import { CourseService } from './services/course.service';
import { CourseMaterialService } from './services/course-material.service';
import { RatingService } from './services/rating.service';
import { TimesDirective } from './directives/times.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CarouselComponent,
    CourseTableComponent,
    DashboardComponent,
    MaterialTableComponent,
    NavbarComponent,
    NotFoundComponent,
    RatingComponent,
    RateCourseComponent,
    SigninComponent,
    SignupComponent,
    TimesPE3Directive,
    SidenavComponent,
    TimesDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatInputModule,
    MatToolbarModule,
    NgxLoadingModule.forRoot({}),
    PdfViewerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      newestOnTop: false,
      maxOpened: 4,
    }),
    YouTubePlayerModule,
  ],
  providers: [
    SharedService,
    AppUserService,
    CourseService,
    CourseMaterialService,
    RatingService,
    StoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
