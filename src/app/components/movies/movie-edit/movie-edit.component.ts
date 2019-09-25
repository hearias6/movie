import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import Movie from '../Movie';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  formMovie : FormGroup;

  constructor(
    private _movieService : MoviesService,
    private rutaActiva: ActivatedRoute) {
    this.createFormMovie();
  }

  ngOnInit() {
    this.init();  
    
  }

  init(){
    this.getMovieById();
  }

  createFormMovie():void{
    this.formMovie =new FormGroup({
      "id": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "gender": new FormControl('', Validators.required)
    });
  }

  getMovieById(){
    let id = this.rutaActiva.snapshot.params.id;
    this._movieService.getMovieById(id).subscribe(
      (data : any)=>{
        let movie : Movie = data.message;
        this.formMovie.setValue(movie);
        console.log('Movie ', this.formMovie.value);
      },err=>{
        console.log('err ', err);
      }
    );
  }

  editMovie():void{
    console.log(this.formMovie.value);
    this._movieService.updateMovie(this.formMovie.value)
    .subscribe(
      (data : any)=>{
      this.mensaje('success',data.message,1500);
    },(err : any)=>{
      console.log('Err ', err);
      this.mensaje('error', err.error.message,1500);
    });
  }

  mensaje(tipo : any, texto : string, tiempo : number):void{
    Swal.fire({
      position: 'top-end',
      type: tipo,
      title: texto,
      showConfirmButton: false,
      timer: tiempo
    })
  }

}
