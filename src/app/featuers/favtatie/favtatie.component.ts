import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
import { Imovies } from '../home/imovies';

@Component({
  selector: 'app-favtatie',
  imports: [CommonModule], 
  templateUrl: './favtatie.component.html',
  styleUrl: './favtatie.component.css'
})
export class FavtatieComponent implements OnInit {

  private readonly favoriteService = inject(FavoriteService);
  favoriteMovies: Imovies[] = [];
  favoriteIds = new Set<number>();

  ngOnInit(): void {

    const storedFavs = localStorage.getItem('favoriteIds');
    if (storedFavs) {
      this.favoriteIds = new Set(JSON.parse(storedFavs));
    }

    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
    this.favoriteService.getFavoriteMovies().subscribe({
      next: (res) => {

        this.favoriteMovies = res.results.filter((m: Imovies) =>
          this.favoriteIds.has(m.id)
        );
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  removeFromFav(movieId: number) {

    this.favoriteIds.delete(movieId);

    localStorage.setItem('favoriteIds', JSON.stringify(Array.from(this.favoriteIds)));


    this.favoriteMovies = this.favoriteMovies.filter(m => m.id !== movieId);

  }
}





