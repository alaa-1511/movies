import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetmoviesService } from './services/detmovies.service';
import { Itvmovies } from '../itvmovies';
import { TvmoviesService } from '../tvmovies.service';


@Component({
  selector: 'app-datels',
  imports: [],
templateUrl: './datels.component.html',
  styleUrl: './datels.component.css'
})
export class DatelsComponent  implements OnInit{
  moviesdetails: Itvmovies = {} as Itvmovies;


  private readonly   activeRouter = inject(ActivatedRoute);
  private readonly detmoviesService = inject(DetmoviesService);
  private readonly tvmoviesService = inject(TvmoviesService);


  movieId: string | null = null;
  id: string | null = null;


  ngOnInit(): void {
    this.getdetmovies();
    this.getdetalis();
    this.gettvdetails();

  }

  getdetmovies():void{
    this.activeRouter.paramMap.subscribe({
      next: (urlparams) => {
         this.movieId = urlparams.get('id');

      }
    })
  }


  getdetalis():void{
    this.detmoviesService.getMovieDetails(this.movieId).subscribe({
      next: (res) => {
        console.log(res);
        this.moviesdetails = res;
      },
      error: (error) => {
        console.error(error);
      }
    })

  }

  /////////////////tv/////////
  gettvdetails():void{
    this.tvmoviesService.gettMovieDetails(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.moviesdetails = res;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}




