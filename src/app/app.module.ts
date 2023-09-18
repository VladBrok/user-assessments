import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { GraphPageComponent } from './components/graph-page/graph-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { MatTableModule } from '@angular/material/table';
import { AssessmentsTableComponent } from './components/assessments-table/assessments-table.component';
import { NgChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authFeatureKey, authReducer } from './core/store/auth/auth.reducer';
import { AuthEffects } from './core/store/auth/auth.effects';
import { UserEffects } from './core/store/user/user.effects';
import { userFeatureKey, usersReducer } from './core/store/user/user.reducer';
import {
  assessmentFeatureKey,
  assessmentsReducer,
} from './core/store/assessment/assessment.reducer';
import { AssessmentEffects } from './core/store/assessment/assessment.effects';
import { GraphEffects } from './core/store/graph/graph.effects';
import {
  graphFeatureKey,
  graphReducer,
} from './core/store/graph/graph.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    AdminPageComponent,
    GraphPageComponent,
    NavbarComponent,
    LoadingComponent,
    ErrorComponent,
    UsersTableComponent,
    AssessmentsTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    NgChartsModule,
    StoreModule.forRoot({
      [authFeatureKey]: authReducer,
      [userFeatureKey]: usersReducer,
      [assessmentFeatureKey]: assessmentsReducer,
      [graphFeatureKey]: graphReducer,
    }),
    EffectsModule.forRoot(
      AuthEffects,
      UserEffects,
      AssessmentEffects,
      GraphEffects
    ),
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
