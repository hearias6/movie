import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import Swal from 'sweetalert2';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  formMovie : FormGroup;

  constructor(private _movieService : MoviesService) {
    this.createFormMovie();
  }

  ngOnInit() {
    this.clean();
  }

  createFormMovie():void{
    this.formMovie =new FormGroup({
      "name": new FormControl('', Validators.required),
      "gender": new FormControl('', Validators.required)
    });
  }

  createMovie():void{
    console.log(this.formMovie.value);
    this._movieService.saveMovie(this.formMovie.value)
    .subscribe(
    (data : any)=>{
      this.message('success',data.message,1500);
      this.clean();
    },(err : any)=>{
      console.log('Err ', err);
      this.message('error', err.error.message,1500);
    });
  }

  message(tipo : any, texto : string, tiempo : number):void{
    Swal.fire({
      position: 'top-end',
      type: tipo,
      title: texto,
      showConfirmButton: false,
      timer: tiempo
    })
  }

  clean():void{
    this.formMovie.reset();
  }

}
