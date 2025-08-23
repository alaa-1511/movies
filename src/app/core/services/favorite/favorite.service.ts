import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly httpClient = inject(HttpClient);

  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '42f1adc8c29026ad2aae70ddf5a6f976';
  private sessionId = 'b9be412d5c68affb00129864225672c55939e901';
  private accountId = '22211070';

  addToFavorite(movieId: number): Observable<any> {
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: true
    };

    return this.httpClient.post(
      `${this.baseUrl}/account/${this.accountId}/favorite?api_key=${this.apiKey}&session_id=${this.sessionId}`,
      body,
      { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
    );
  }

  getFavoriteMovies(): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/account/${this.accountId}/favorite/movies?api_key=${this.apiKey}&session_id=${this.sessionId}&language=en`
    );
  }



}

