import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule, Validators, FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { AuthIntersector } from './core/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule,HttpClientModule,  FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, CookieService, {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthIntersector,
    multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
