import { Component, inject } from '@angular/core';
import { TvmoviesService } from '../tvmovies.service';
import { Itvmovies } from '../itvmovies';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';

@Component({
  selector: 'app-documentary',
  imports: [ RouterLink  ,CommonModule],
  templateUrl: './documentary.component.html',
  styleUrl: './documentary.component.css'
})
export class DocumentaryComponent {
  private readonly favoriteService=inject(FavoriteService)

private readonly tvmoviesService = inject(TvmoviesService);
favoriteIds = new Set<number>();

moviedocumentaryList: Itvmovies[] = [];

ngOnInit() {
  this.getDocumentaryMovies();
   const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
}

getDocumentaryMovies() {
  this.tvmoviesService.getdocumentaryMovies().subscribe({
    next: (res) => {
      console.log('Documentary Movies:', res);
      this.moviedocumentaryList = res.results;
    },
    error: (error) => {
      console.error('Error fetching documentary movies:', error);
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
