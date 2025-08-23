import { Component, inject, OnInit } from '@angular/core';
import { TvmoviesService } from '../tvmovies.service';
import { Itvmovies } from '../itvmovies';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-drama',
  imports: [ RouterLink ,CommonModule ],
templateUrl: './drama.component.html',
  styleUrl: './drama.component.css'
})
export class DramaComponent  implements OnInit {
  favoriteIds = new Set<number>();
private readonly  favoriteService= inject (FavoriteService)

  private readonly tvmoviesService = inject(TvmoviesService);

  movedramaList: Itvmovies[] = [];

  ngOnInit() {
    this.getDramaMovies();
     const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getDramaMovies() {
    this.tvmoviesService.getdramaMovies().subscribe({
      next: (res) => {
        console.log('Drama Movies:', res);
        this.movedramaList = res.results;
      },
      error: (error) => {
        console.error('Error fetching drama movies:', error);
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
