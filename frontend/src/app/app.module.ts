import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './components/layout/header/header.module';
import { LayoutModule } from './components/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRegisterModule } from './components/auth/auth-register/auth-register.module';
import { AuthLoginModule } from './components/auth/auth-login/auth-login.module';
import { HomeModule } from './components/home/home.module';
import { MovieModule } from './components/movie/movie.module';
import { VideoDialogModule } from './dialogs/video-dialog/video-dialog.module';
import { FavoritesModule } from './components/favorites/favorites.module';
import { ProfileModule } from './components/profile/profile.module';
import { GenreModule } from './components/genre/genre.module';
import { JwtInterceptor } from './common/jwt.interceptor';
import { ErrorInterceptor } from './common/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HeaderModule,
    AuthRegisterModule,
    AuthLoginModule,
    HomeModule,
    MovieModule,
    VideoDialogModule,
    FavoritesModule,
    ProfileModule,
    GenreModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
