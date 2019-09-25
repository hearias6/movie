import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  //uri = 'http://35.232.123.59:4000/';
  uri = "http://localhost:8085/";

  constructor(private http: HttpClient) { }

  saveMovie(movie : any) {
    return this.http.post(`${this.uri}/items`, movie);
        //.subscribe(res => console.log('Se ha creado con exito'));
  }

  getMovies() {
    return this
           .http
           .get(`${this.uri}items`);
  }

  getMovieById(id) {
    return this
            .http
            .get(`${this.uri}/items/${id}`);
  }

  updateMovie(movie : any) {
    
    return this.http.put(`${this.uri}/items`, movie);
      //.subscribe(res => console.log('Update Complete'));
  }

  deleteMovie(id) {
    return this
              .http
              .delete(`${this.uri}/items/${id}`);
  }

}
