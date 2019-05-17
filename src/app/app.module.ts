import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { AuthorComponent } from './author/author.component';
import { AuthGuard } from './auth.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpAuthInterceptor } from './http-auth-interceptor';
//import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AuthorComponent,
    //JwtHelperService,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
      AuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpAuthInterceptor,
        multi: true
      },
     //JwtHelperService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
