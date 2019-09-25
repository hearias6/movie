import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import Movie from "./Movie";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  movie : Movie;

  longitud : number;

  constructor(private _movieService : MoviesService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(){
    console.log('getMovies Method');
    this._movieService.getMovies()
    .subscribe((data : any) => {
      //console.log('Data ', data);
      let resultado = data.message;
      //console.log('resultado ', resultado);
      this.movies = resultado;
      this.longitud = this.movies.length;
      console.log('movies ', this.movies);
    });
  }

  confirmDeleteMovie(movie : Movie) : void{
    console.log('movie ', movie);
    this.movie = movie;
    this.confirm("Delete Movie","you are sure delete this movie! ");
  }

  deteleMovieById(){
    this._movieService.deleteMovie(this.movie.id).subscribe(
      (data:any)=>{
        console.log('delete done');
        this.message('success',data.message,1500);
        this.removeMovie();
      },(err:any)=>{
        this.message('error',err.error.message,2500);
      }
    )
  }

  removeMovie(){
    var index = this.movies.indexOf(this.movie);
    this.movies.splice(index,1);
    this.longitud = this.movies.length;
  }

  message(type : any, text : string, time : number):void{
    Swal.fire({
      position: 'top-end',
      type: type,
      title: text,
      showConfirmButton: false,
      timer: time
    })
  }

  confirm(title : string, text : string){
    Swal.fire({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deteleMovieById();
      }
    })    
  }

}
