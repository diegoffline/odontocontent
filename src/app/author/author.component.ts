import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  cont: any;
  cat: any;
  cat2: any;
  usar: any;
  chap: any;
  constructor(
      private adminService: AdminService,
      private router: Router
      ) { }

  ngOnInit() {
    this.adminService.getContents().subscribe(res => {
      console.log('oi' + JSON.stringify(res));
      this.cont = JSON.stringify(res);
      });

    this.adminService.getCategory().subscribe(res => {
        console.log('oi 2' + JSON.stringify(res));
        this.cat = JSON.stringify(res);
      });
    // this.adminService.getUsers().subscribe(res => {
    //   console.log(res);
    //   this.usar = JSON.stringify(res);
    // });

    this.adminService.getChapterById().subscribe(res => {
      const chapt = res;
      console.log('oi 3' + JSON.stringify(chapt));
      this.chap = JSON.stringify(res);
    });

    this.adminService.getCategoryByC().subscribe(res => {
      console.log('oi 3' + JSON.stringify(res));
      this.cat2 = JSON.stringify(res);
    });
  }


    addU(f: NgForm) {
      const usuario = {
        name: f.value.name,
        email: f.value.email,
        password: f.value.password
      }
      this.adminService.addUser(usuario).subscribe(
        data  => {
          console.log('POST Request is successful ', data);
        },
        error  => {
          console.log('Error', error);
        });
    }
    addA(f: NgForm) {
      const author = {
        name: f.value.name,
        email: f.value.email,
        password: f.value.password,
        bio: f.value.bio,
        photo: f.value.photo
      }
      this.adminService.addAuthor(author).subscribe(
        data  => {
          console.log('POST Request is successful ', data);
        },
        error  => {
          console.log('Error', error);
        });
    }

    addC(f: NgForm) {
      const category = {
        name: f.value.name,
        description: f.value.description,
        slug: f.value.slug
      }
      this.adminService.addCategory(category).subscribe(
        data  => {
          console.log('POST Request is successful ', data);
        },
        error  => {
          console.log('Error', error);
        });
    } 


 }

