import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { MoviesService } from '../home/movies.service';
import { Imovies } from '../home/imovies';


@Component({
  selector: 'app-tvshow',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, FormsModule],
  templateUrl: './tvshow.component.html',
  styleUrl: './tvshow.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TvshowComponent implements OnInit {
  private readonly moviesService = inject(MoviesService);

    moviesTrending: Imovies[] = [];




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

  genres = [
    "action",
    "adventure",
    "comedy",
    "crime",
    "drama",
    "family",
    "fantasy",
    "history",
    "horror",
    "music",
    "romance",
    "science-fiction",
    "thriller",
    "mystery",
    "documentary",
    "animation",
    "war",
    "western"
  ];
isSidebarOpen: boolean = false;
screenWidth = window.innerWidth;

ngOnInit() {
  this.getTrendingMovies();
  window.addEventListener('resize', () => {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 640) {
      this.isSidebarOpen = true; // في الشاشات الكبيرة يفضل مفتوح
    }
  });

  if (this.screenWidth >= 640) {
    this.isSidebarOpen = true;
  }
}


}
