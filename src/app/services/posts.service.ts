import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(this.apiUrl + '/posts')
      .subscribe(postsData => {
        this.posts = postsData.posts;
        this.postsUpdated.next([...this.posts]);
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
      .subscribe(responseData => {
        post = responseData.post;
        this.posts.push(post);
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
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(
          post => post._id === updatedPost._id
        );
        updatedPosts[oldPostIndex] = updatedPost;
        this.posts = updatedPosts;
        this.goToPosts();
      });
  }

  deletePost(postId: string) {
    this.http.delete(this.apiUrl + '/posts/' + postId).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post._id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next(...[this.posts]);
    });
  }

  private goToPosts() {
    this.postsUpdated.next([...this.posts]);
    this.router.navigate(['/']);
  }
}
