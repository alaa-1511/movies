import { Component, inject, OnInit } from '@angular/core';
import { TvmoviesService } from '../tvmovies.service';
import { Itvmovies } from '../itvmovies';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animation',
  imports: [ RouterLink ,CommonModule],
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.css'
})
export class AnimationComponent implements OnInit {
favoriteIds = new Set<number>();
private readonly favoriteService = inject(FavoriteService);

  private readonly tvmoviesService = inject(TvmoviesService);
  movieanimList: Itvmovies[] = [];

  ngOnInit() {
    this.getAnimationMovies();
     const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getAnimationMovies() {
    this.tvmoviesService.getanimationmovies().subscribe({
      next: (res) => {
        console.log('Animation Movies:', res);
        this.movieanimList = res.results;
      },
      error: (error) => {
        console.error('Error fetching animation movies:', error);
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
