import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieCreateComponent } from './components/movies/movie-create/movie-create.component';
import { MovieEditComponent } from './components/movies/movie-edit/movie-edit.component';


const routes: Routes = [
  {path:"movies", component:MoviesComponent},
  {path:"movie/create", component: MovieCreateComponent},
  {path:"movie/edit/:id", component: MovieEditComponent},
  {path:"home", component:HomeComponent},
  {path:"", pathMatch:"full", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
