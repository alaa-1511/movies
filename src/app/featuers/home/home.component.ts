import { Component,  CUSTOM_ELEMENTS_SCHEMA,  inject,  OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { Imovies } from './imovies';


import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet, RouterLinkActive ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
schemas: [CUSTOM_ELEMENTS_SCHEMA]


})
export class HomeComponent implements OnInit {


 private readonly  moviesService = inject(MoviesService);

 moviesList: Imovies[] = [];


 ngOnInit(): void {
  this.getpopular();


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








}
