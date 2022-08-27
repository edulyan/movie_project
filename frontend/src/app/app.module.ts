import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './components/layout/header/header.module';
import { LayoutModule } from './components/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRegisterModule } from './components/auth/auth-register/auth-register.module';
import { AuthLoginModule } from './components/auth/auth-login/auth-login.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}