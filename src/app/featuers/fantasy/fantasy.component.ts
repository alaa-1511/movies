import { Component, inject, OnInit } from '@angular/core';
import { TvmoviesService } from '../tvmovies.service';
import { Itvmovies } from '../itvmovies';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-fantasy',
  imports: [ RouterLink ,CommonModule],
  templateUrl: './fantasy.component.html',
  styleUrl: './fantasy.component.css'
})
export class FantasyComponent implements OnInit {
  favoriteIds = new Set<number>();
private readonly favoriteService=inject(FavoriteService)

  private readonly tvmoviesService = inject(TvmoviesService);

  movieFantasyList: Itvmovies[] = [];

  ngOnInit() {
    this.getFantasyMovies();
     const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getFantasyMovies() {
    this.tvmoviesService.getfantasyMovies().subscribe({
      next: (res) => {
        console.log('Fantasy Movies:', res);
        this.movieFantasyList = res.results;
      },
      error: (error) => {
        console.error('Error fetching fantasy movies:', error);
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
