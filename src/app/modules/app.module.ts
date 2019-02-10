// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Material
import { MaterialModule } from './material.module';
// Interceptors
import { AuthInterceptor } from '../services/auth-interceptor';
// Components
import { AppComponent } from '../components/app-component/app.component';
import { PostCreateComponent } from '../components/posts/post-create/post-create.component';
import { HeaderComponent } from '../components/header/header.component';
import { PostListComponent } from '../components/posts/post-list/post-list.component';
import { SignupComponent } from '../components/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // material
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
