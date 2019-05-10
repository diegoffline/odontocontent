import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate} from '@angular/router';
import { AuthGuard } from './auth.service';
import { AuthorComponent } from './author/author.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: ContentComponent },
  { path: 'autores',
          component: AuthorComponent,
          canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
