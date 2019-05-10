import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  error: any;
  success: any;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  login(email: string, password: string) {
    console.log(' auth service ' + this.authService);
    this.authService.login(email, password).subscribe(
      success => this.router.navigate(['/autores']),
      error => this.error = error
    );
  }

}
