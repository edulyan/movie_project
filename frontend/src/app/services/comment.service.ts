import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../models/comment/comment.interface';
import { ICreateComment } from '../models/comment/createComment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private URL_COMMENT = 'http://localhost:3000/comment';

  constructor(private http: HttpClient) {}

  createComment(commentDto: ICreateComment): Observable<IComment> {
    return this.http.post<IComment>(`${this.URL_COMMENT}`, commentDto);
  }

  deleteComment(id: string) {
    return this.http.delete<any>(`${this.URL_COMMENT}/${id}`);
  }
}
