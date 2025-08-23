import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private readonly httpClient: HttpClient ) { }

   getMovies(): Observable<any> {
     return this.httpClient.get("https://api.themoviedb.org/3/movie/popular?api_key=42f1adc8c29026ad2aae70ddf5a6f976");
   }
   getAllMovies(): Observable<any> {
     return this.httpClient.get("https://api.themoviedb.org/3/discover/movie?api_key=42f1adc8c29026ad2aae70ddf5a6f976");
   }
   gettrendy():Observable<any> {
     return this.httpClient.get("https://api.themoviedb.org/3/trending/all/day?api_key=42f1adc8c29026ad2aae70ddf5a6f976");
   }
}
