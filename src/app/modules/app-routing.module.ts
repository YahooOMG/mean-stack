import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { PostCreateComponent } from '../components/posts/post-create/post-create.component';
import { PostListComponent } from '../components/posts/post-list/post-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
