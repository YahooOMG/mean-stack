import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postsCount: number }>();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(pageSize: number, currentPage: number) {
    const queryParams = `?pagesize=${pageSize}&currentpage=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        this.apiUrl + '/posts' + queryParams
      )
      .subscribe(postsData => {
        this.posts = postsData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postsCount: postsData.maxPosts
        });
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(postId: string) {
    return this.http.get<Post>(this.apiUrl + '/posts/' + postId);
  }

  addPost(post: Post, image: File) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', image, post.title);
    this.http
      .post<{ message: string; post: Post }>(this.apiUrl + '/posts', postData)
      .subscribe(() => {
        this.goToPosts();
      });
  }

  updatePost(updatedPost: Post, image: File | string) {
    let postData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('_id', updatedPost._id);
      postData.append('title', updatedPost.title);
      postData.append('content', updatedPost.content);
      postData.append('image', image, updatedPost.title);
    } else {
      postData = updatedPost;
    }
    this.http
      .put(this.apiUrl + '/posts/' + updatedPost._id, postData)
      .subscribe(() => {
        this.goToPosts();
      });
  }

  deletePost(postId: string) {
    return this.http.delete(this.apiUrl + '/posts/' + postId);
  }

  private goToPosts() {
    this.router.navigate(['/']);
  }
}
