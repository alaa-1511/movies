import { Component, inject, OnInit } from '@angular/core';
import { TvmoviesService } from '../tvmovies.service';
import { Itvmovies } from '../itvmovies';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-history',
  imports: [ RouterLink ,CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent  implements OnInit {
favoriteIds = new Set<number>();
private readonly favoriteService=inject(FavoriteService)
  private readonly tvmoviesService = inject(TvmoviesService);

  movieHistoricalList: Itvmovies[] = [];

  ngOnInit() {
    this.getHistoricalMovies();
     const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getHistoricalMovies() {
    this.tvmoviesService.gethistoricalMovies().subscribe({
      next: (res) => {
        console.log('Historical Movies:', res);
        this.movieHistoricalList = res.results;
      },
      error: (error) => {
        console.error('Error fetching historical movies:', error);
      }
    });
  }
  toggleFav(movieId: number) {
  if (this.favoriteIds.has(movieId)) {

    this.favoriteIds.delete(movieId);


    this.updateLocalStorage();

  } else {
       this.favoriteService.addToFavorite(movieId).subscribe({
      next: res => {
        this.favoriteIds.add(movieId);


        this.updateLocalStorage();

        console.log('تمت الإضافة للمفضلة ✅', res);
      },
      error: err => console.error('خطأ أثناء الإضافة ❌', err)
    });
  }
}

isFavorite(movieId: number): boolean {
  return this.favoriteIds.has(movieId);
}

private updateLocalStorage() {
  localStorage.setItem('favoriteIds', JSON.stringify(Array.from(this.favoriteIds)));
}

}
