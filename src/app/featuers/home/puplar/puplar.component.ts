import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Iallmovie } from '../iallmovie';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-puplar',
  imports: [  RouterLink ,CommonModule],
  templateUrl: './puplar.component.html',
  styleUrl: './puplar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PuplarComponent implements OnInit {

private readonly moviesService = inject(MoviesService);
  private readonly favoriteService = inject(FavoriteService);

 moviesList: Iallmovie[] = [];
favoriteIds = new Set<number>();


   ngOnInit(): void {
  this.getpopular();
  this.getAllMovies();
    const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }

 }
 getpopular(): void {
  this.moviesService.getMovies().subscribe({
      next: (res) => {
        console.log(res.results);
        this.moviesList = res.results;
      },
      error: (error) => {
        console.error(error);
      }
    });

 }



getAllMovies(): void {
  this.moviesService.getAllMovies().subscribe({
      next: (res) => {
        console.log(res.results);
         this.getAllMovies = res.results;
      },
      error: (error) => {
        console.error(error);
      }
    });

  // Additional methods and properties can be added as needed

}


chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

get movieChunks() {
  return this.chunk(this.moviesList, 6); // كل 6 أفلام في slide
}


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
