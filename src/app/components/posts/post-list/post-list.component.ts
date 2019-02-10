import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
    this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
}
