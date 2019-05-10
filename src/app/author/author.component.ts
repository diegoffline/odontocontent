import { Component, OnInit } from '@angular/core';
import { AdminService, Categories } from '../admin.service';
import { Router } from '@angular/router';
import { addAllToArray } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  categories: Categories;
  cont: any;
  cat: any;
  constructor(
      private adminService: AdminService,
      private router: Router,
      ) { }

  ngOnInit() {
    this.adminService.getContents().subscribe(res => {
      console.log(res);
      this.cont = JSON.stringify(res);
      });

    this.adminService.getCategory().subscribe(res => {
        console.log(res);
        this.cat = JSON.stringify(res);
      });
      }
      addAut(name) {
        this.adminService.addAuthor(name);
      }
 }

