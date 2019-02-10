import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  currentPage = 1;
  postsCount = 0;
  pageSize = 2;
  pageSizeOptions = [1, 2, 4, 5];
  userIsAuthenticated: boolean;
  private postsSub: Subscription;
  private authStatusSubs: Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.pageSize, this.currentPage);
    this.postsSub = this.postsService
      .getPostsUpdateListener()
      .subscribe((postData: { posts: Post[]; postsCount: number }) => {
        this.posts = postData.posts;
        this.postsCount = postData.postsCount;
        this.isLoading = false;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.pageSize, this.currentPage);
      this.isLoading = false;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.pageSize = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.postsService.getPosts(this.pageSize, this.currentPage);
    this.isLoading = false;
  }
}
