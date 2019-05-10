import { Component, OnInit } from '@angular/core';
import { AdminService, Categories } from '../admin.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  categories: Categories;
  cat: any;
  constructor( private adminService: AdminService) { }

  ngOnInit() {
    this.cat = this.adminService.getCategories().subscribe((data: Categories) => this.categories = {...data} );
    console.log('minha categoria' + this.cat);
  }
    showCategory() {
    }
}
