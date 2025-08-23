import { Component, inject, OnInit } from '@angular/core';

import { Itvmovies } from '../itvmovies';
import { TvmoviesService } from '../tvmovies.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
@Component({
  selector: 'app-action',
  imports: [RouterLink, CommonModule ],
templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent  implements OnInit {
favoriteIds = new Set<number>();
  private readonly tvmoviesService = inject(TvmoviesService);
  private readonly favoriteService =inject(FavoriteService)
  actionMoviesList: Itvmovies[] = [];

  ngOnInit(): void {
    this.getAllaction();
      const storedFavs = localStorage.getItem('favoriteIds');
  if (storedFavs) {
    this.favoriteIds = new Set(JSON.parse(storedFavs));
  }
  }

  getAllaction(): void {
    this.tvmoviesService.getactionmovies().subscribe({
      next: (res) => {
        console.log(res);
        this.actionMoviesList = res.results;
      },
      error: (error) => {
        console.error('Error fetching action movies:', error);
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






