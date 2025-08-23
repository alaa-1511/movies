import { Component, inject, OnInit } from '@angular/core';
import { TvmoviesService } from '../tvmovies.service';
import { Itvmovies } from '../itvmovies';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mystery',
  imports: [ RouterLink ,CommonModule ],
  templateUrl: './mystery.component.html',
  styleUrl: './mystery.component.css'
})
export class MysteryComponent  implements OnInit {
    favoriteIds = new Set<number>();
private readonly favoriteService=inject(FavoriteService)

  private readonly tvmoviesService = inject(TvmoviesService);

  movieMysteryList: Itvmovies[] = [];

  ngOnInit() {
    this.getMysteryMovies();
         const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getMysteryMovies() {
    this.tvmoviesService.getmysteryMovies().subscribe({
      next: (res) => {
        console.log('Mystery Movies:', res);
        this.movieMysteryList = res.results;
      },
      error: (error) => {
        console.error('Error fetching mystery movies:', error);
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
