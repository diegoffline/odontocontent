import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import {Categories} from '../model/categories';
import {Author} from '../model/author';
import {Users} from '../model/users';
import {Contents} from '../model/contents';
import {Summary} from '../model/summary';

const token = localStorage.getItem('jwtToken');
const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'multipart/form-data',
      // Authorization: 'Bearer '.concat(token)
  }),
};

const httpOptionsnull = {
  headers: new HttpHeaders ({
    Authorization : ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiRoot = 'http://odonto-content-api.herokuapp.com/api/V1/';
  author: any;
  users: any;
  categories: any;
  contents: any;
  summary: any;
  handleError: any;
  constructor(private http: HttpClient) { }

    public addAuthor(author: Author): Observable<Author> {
      return this.http.post<Author>(this.apiRoot.concat('people/users/author') , author)
      .pipe(
        tap(( author: Author ) => console.log('autor add'))
        );
    }

    public addCategory(categories: Categories): Observable<Categories> {
      return this.http.post<Categories>(this.apiRoot.concat('categories') , categories)
      .pipe(
        tap(( categories: Categories ) => console.log(' category add'))
        );
    }

    getCategory() {
      return this.http.get<Categories>(this.apiRoot.concat('categories') );
    }
    getCategoryByC() {
      return this.http.get<Categories>(this.apiRoot.concat('categories/5cddc41be56fe500172dd030') );
    }
    getCategoryByType() {
      return this.http.get<Categories>(this.apiRoot.concat('categories/book'));
    }
    getCategoryById(id: string) {
      return this.http.get<Categories>(this.apiRoot.concat('categories/' + id) );
    }
    getChapterById() {
      return this.http.get(this.apiRoot.concat('contents/chapter/5c9a682ff08e10be5a4361e3') );
    }
    getContents() {
      return this.http.get<Contents>(this.apiRoot.concat('contents/active/get') );
    }
    getContentByCategory(category: string) {
      return this.http.get<Contents>(this.apiRoot.concat('contents/category/get' + category) );
    }
    getContentById(id: string) {
      return this.http.get<Contents>(this.apiRoot.concat('contents/' + id) );
    }
    getContentByType(type: string) {
      return this.http.get<Contents>(this.apiRoot.concat('contents/type/get' + type) );
    }
    public addContent(contents: Contents): Observable<Contents> {
      return this.http.post<Contents>(this.apiRoot.concat('contents') , contents)
      .pipe(
        tap(( contents: Contents ) => console.log(' contents add'))
        );
    }
    getSummaryById( id: string ) {
      return this.http.get<Summary>(this.apiRoot.concat('contents/summary/content' + id) );
    }
    public addUser(users: Users): Observable<Users> {
      return  this.http.post<Users>(this.apiRoot.concat('people/users'), users, httpOptions)
      .pipe(
        tap(( users: Users ) => console.log('usuario add'))
        );
    }

}
