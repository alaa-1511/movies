import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvmoviesService {


  constructor(   private readonly httpClient: HttpClient ) { }

// Search with optional genre





getactionmovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getadventuremovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=12&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getanimationmovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getcomedyMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getcrimeMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=80&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getdocumentaryMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=99&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getdramaMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/movie/popular?api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getfamilyMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=10751&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getfantasyMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=14&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
gethistoricalMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=36&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
gethorrorMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=27&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getmusicalMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=10402&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getmysteryMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=9648&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getromanceMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/trending/all/day?api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
gettvMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=10770&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getscienceFictionMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=878&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getthrillerMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=53&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getwarMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=10752&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}
getwesternMovies():Observable<any> {
  return this.httpClient.get('https://api.themoviedb.org/3/discover/movie?with_genres=37&api_key=42f1adc8c29026ad2aae70ddf5a6f976');
}

   baseUrl = 'https://api.themoviedb.org/3'; // لازم نحدد الـ baseUrl
  apiKey = '42f1adc8c29026ad2aae70ddf5a6f976';
  // private sessionId = 'b9be412d5c68affb00129864225672c55939e901';
  // private accountId = '22211070';

gettMovieDetails(Id: string | null): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/movie/${Id}?api_key=${this.apiKey}&language=en`);

}



}
