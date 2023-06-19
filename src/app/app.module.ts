import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { hu_HU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import hu from '@angular/common/locales/hu';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { InMemoryDataService } from './core/backend/in-memory-data.service';

// common modules
import { NzMessageModule } from 'ng-zorro-antd/message';
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from './core/state/courses/course.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './core/state/courses/course.effects';
import { CacheInterceptor } from './core/interceptors/cache.interceptor';
import { instructorReducer } from './core/state/instructors/instructor.reducer';
import { InstructorEffects } from './core/state/instructors/instructor.effect';
import { SemesterEffects } from './core/state/semesters/semester.effect';
import { semesterReducer } from './core/state/semesters/semester.reducer';
import { studentReducer } from './core/state/students/student.reducer.';
import { StudentEffects } from './core/state/students/student.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

registerLocaleData(hu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true,
      // delay: 1000
    }),
    NzMessageModule,
    StoreModule.forRoot({
      courses: coursesReducer,
      instructors: instructorReducer,
      semesters: semesterReducer,
      students: studentReducer
    }, {}),
    EffectsModule.forRoot([
      CourseEffects,
      InstructorEffects,
      SemesterEffects,
      StudentEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: hu_HU },
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
