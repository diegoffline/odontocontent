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


  constructor(private http: HttpClient) { }
  getCategories() {
    return this.http.get<Categories>(this.apiRoot.concat('contents/active/get') );
  }


}

export interface Categories {
  _id: string;
  title: string;
}

export interface Contents {

}