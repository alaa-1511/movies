import { Component, inject, OnInit } from '@angular/core';
import { TvmoviesService } from '../tvmovies.service';
import { Itvmovies } from '../itvmovies';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music',
  imports: [ RouterLink,CommonModule ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements OnInit {
  favoriteIds = new Set<number>();
private readonly favoriteService=inject(FavoriteService)
  private readonly tvmoviesService = inject(TvmoviesService);

  movieMusicalList: Itvmovies[] = [];

  ngOnInit() {
    this.getMusicalMovies();
         const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getMusicalMovies() {
    this.tvmoviesService.getmusicalMovies().subscribe({
      next: (res) => {
        console.log('Musical Movies:', res);
        this.movieMusicalList = res.results;
      },
      error: (error) => {
        console.error('Error fetching musical movies:', error);
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
