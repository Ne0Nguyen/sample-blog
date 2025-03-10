import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Post, PostComment} from "../../interface/post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API = {
    getPostList: 'https://jsonplaceholder.typicode.com/posts',
    getPostListByUserId: 'https://jsonplaceholder.typicode.com/posts?userId=',
    getPostDetail: 'https://jsonplaceholder.typicode.com/posts/id',
    getPostComments: 'https://jsonplaceholder.typicode.com/comments/?postId=id'
  }

  constructor(
    private http: HttpClient
  ) {
  }

  getPostList = (): Observable<Post[]> => {
    return this.http.get<Post[]>(`${this.API.getPostList}`);
  }

  getPostListByUserId = (): Observable<Post[]> => {
    const userId = localStorage.getItem("userId");
    return this.http.get<Post[]>(`${this.API.getPostListByUserId}${userId}`);
  }

  getPostDetail(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API.getPostDetail.replace('id', id.toString())}`);
  }

  getPostComment(id: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.API.getPostComments.replace('id', id.toString())}`);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.API.getPostDetail.replace('id', id.toString())}`);
  }

  updatePost(post: Post): Observable<any> {
    const id = post.id;
    // @ts-ignore
    return this.http.put<Post>(`${this.API.getPostDetail.replace('id', id.toString())}`, post, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })

  }
}
