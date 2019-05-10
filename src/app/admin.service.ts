import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiRoot = 'http://odonto-content-api.herokuapp.com/api/V1/';
  author: any;
  handleError: any;

  constructor(private http: HttpClient) { }
  getContents() {
    return this.http.get<Categories>(this.apiRoot.concat('contents/active/get') );
  }
  getCategory() {
    return this.http.get<Categories>(this.apiRoot.concat('categories/5c7eedbb8d355ac28628b520') );
  }
addAuthor(author: Author): Observable<Author>;
addAuthor() {
    return this.http.post<Author>(this.apiRoot.concat('api/V1/people/users/author') , this.author , httpOptions);
    }
}

export interface Categories {
  _id: string;
  title: string;
}

export interface Author {
  name: string;
  bio: string;
  photo: File;
}