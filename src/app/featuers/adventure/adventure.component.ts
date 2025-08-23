import { Component, inject, OnInit } from '@angular/core';
import { TvmoviesService } from '../tvmovies.service';
import { Itvmovies } from '../itvmovies';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-adventure',
  imports: [ RouterLink ,CommonModule],
templateUrl: './adventure.component.html',
  styleUrl: './adventure.component.css',
})
export class AdventureComponent  implements OnInit {
  private readonly tvmoviesService = inject(TvmoviesService);
  private readonly favoriteService = inject(FavoriteService);
favoriteIds = new Set<number>();

  movieadvList: Itvmovies[] = [];

  ngOnInit() {
    this.getAllAdventureMovies();
        const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getAllAdventureMovies() {
    this.tvmoviesService.getadventuremovies().subscribe({
      next: (res) => {
        console.log('Adventure Movies:', res);
        this.movieadvList = res.results;
      },
      error: (error) => {
        console.error('Error fetching adventure movies:', error);
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
