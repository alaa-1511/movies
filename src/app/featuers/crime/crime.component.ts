import { Component, inject } from '@angular/core';
import { Itvmovies } from '../itvmovies';
import { TvmoviesService } from '../tvmovies.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-crime',
  imports: [ RouterLink ,CommonModule],
  templateUrl: './crime.component.html',
  styleUrl: './crime.component.css'
})
export class CrimeComponent {
  private readonly favoriteService = inject(FavoriteService);
  private readonly tvmoviesService = inject(TvmoviesService);
favoriteIds = new Set<number>();

  moviecrimeList: Itvmovies[] = [];

  ngOnInit() {
    this.getCrimeMovies();
     const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getCrimeMovies() {
    this.tvmoviesService.getcrimeMovies().subscribe({
      next: (res) => {
        console.log('Crime Movies:', res);
        this.moviecrimeList = res.results;
      },
      error: (error) => {
        console.error('Error fetching crime movies:', error);
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
