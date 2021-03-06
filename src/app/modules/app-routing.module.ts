import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Guards
import { AuthGuard } from '../services/auth.guard';
// Components
import { PostCreateComponent } from '../components/posts/post-create/post-create.component';
import { PostListComponent } from '../components/posts/post-list/post-list.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
