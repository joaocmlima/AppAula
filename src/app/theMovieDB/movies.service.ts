import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private chave:string = "e77eb0d0fe4c05a9b6169de62a62a14f";
  private caminhoPadrao = "https://api.themoviedb.org/3";

  constructor(public http:HttpClient) { }

  public getPopularMovies(page=1, language="eng"){
    let filmes = `${this.caminhoPadrao}/movie/popular?page=${page}&language=${language}&api_key=${this.chave}`
    return this.http.get(filmes);
  }
}
