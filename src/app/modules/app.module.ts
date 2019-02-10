// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// Material
import { MaterialModule } from './material.module';
// Services
import { PostsService } from '../services/posts.service';
// Components
import { AppComponent } from '../components/app-component/app.component';
import { PostCreateComponent } from '../components/posts/post-create/post-create.component';
import { HeaderComponent } from '../components/header/header.component';
import { PostListComponent } from '../components/posts/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // material
    MaterialModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
