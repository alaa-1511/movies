import { Component,  CUSTOM_ELEMENTS_SCHEMA,  inject, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { RouterLink } from '@angular/router';
import { Imovies } from '../imovies';
import { FavoriteService } from '../../../core/services/favorite/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trindy',
  imports: [ RouterLink ,CommonModule],
  templateUrl: './trindy.component.html',
  styleUrls: ['./trindy.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],


})
export class TrindyComponent implements OnInit {
  moviesTrending: Imovies[] = [];

  private readonly moviesService = inject(MoviesService);

  private readonly favoriteService = inject(FavoriteService);
  ngOnInit(): void {
    this.getTrendingMovies();
     const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getTrendingMovies(): void {
    this.moviesService.gettrendy().subscribe({
      next: (res) => {
        this.moviesTrending = res.results;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

get movieChunks() {
  return this.chunk(this.moviesTrending, 6);
}

addToFav(id:number):void{
  this.favoriteService.addToFavorite(id).subscribe({
    next: (res) => {
      console.log('Movie added to favorites:', res);
    },
    error: (error) => {
      console.error('Error adding movie to favorites:', error);
    }
  });


}


favoriteIds = new Set<number>();

toggleFav(movieId: number) {
  if (this.favoriteIds.has(movieId)) {
    // إزالة من المفضلة
    this.favoriteIds.delete(movieId);

    // تحديث localStorage
    this.updateLocalStorage();

  } else {
    // إضافة للمفضلة
    this.favoriteService.addToFavorite(movieId).subscribe({
      next: res => {
        this.favoriteIds.add(movieId);

        // تحديث localStorage
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
