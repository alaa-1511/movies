import { Component, inject, OnInit } from '@angular/core';
import { TvmoviesService } from '../tvmovies.service';
import { Itvmovies } from '../itvmovies';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-thriller',
  imports: [ RouterLink ,CommonModule ],
  templateUrl: './thriller.component.html',
  styleUrl: './thriller.component.css'
})
export class ThrillerComponent implements OnInit {
    favoriteIds = new Set<number>();
private readonly favoriteService=inject(FavoriteService)
  private readonly tvmoviesService = inject(TvmoviesService);

  movieThrillerList: Itvmovies[] = [];

  ngOnInit() {
    this.getThrillerMovies();
         const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getThrillerMovies() {
    this.tvmoviesService.getthrillerMovies().subscribe({
      next: (res) => {
        console.log('Thriller Movies:', res);
        this.movieThrillerList = res.results;
      },
      error: (error) => {
        console.error('Error fetching thriller movies:', error);
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
