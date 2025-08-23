import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetmoviesService {

private readonly httpClient = inject(HttpClient);

   baseUrl = 'https://api.themoviedb.org/3'; // لازم نحدد الـ baseUrl
  apiKey = '42f1adc8c29026ad2aae70ddf5a6f976';
  // private sessionId = 'b9be412d5c68affb00129864225672c55939e901';
  // private accountId = '22211070';

getMovieDetails(movieId: string | null): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en`);

}
}
