import { Routes } from '@angular/router';
import { HomeComponent } from './featuers/home/home.component';
import { TvshowComponent } from './featuers/tvshow/tvshow.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { BlankLayoutComponent } from './core/layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './featuers/notfound/notfound.component';
import { ActionComponent } from './featuers/action/action.component';
import { AdventureComponent } from './featuers/adventure/adventure.component';
import { AnimationComponent } from './featuers/animation/animation.component';
import { ComedyComponent } from './featuers/comedy/comedy.component';
import { CrimeComponent } from './featuers/crime/crime.component';
import { DocumentaryComponent } from './featuers/documentary/documentary.component';
import { DramaComponent } from './featuers/drama/drama.component';
import { FamilyComponent } from './featuers/family/family.component';
import { FantasyComponent } from './featuers/fantasy/fantasy.component';
import { HistoryComponent } from './featuers/history/history.component';
import { HorrorComponent } from './featuers/horror/horror.component';
import { MusicComponent } from './featuers/music/music.component';
import { MysteryComponent } from './featuers/mystery/mystery.component';
import { RomanceComponent } from './featuers/romance/romance.component';
import { ScienceFictionComponent } from './featuers/science-fiction/science-fiction.component';
import { ThrillerComponent } from './featuers/thriller/thriller.component';
import { WarComponent } from './featuers/war/war.component';
import { WesternComponent } from './featuers/western/western.component';
import { FavtatieComponent } from './featuers/favtatie/favtatie.component';
import { DatelsComponent } from './featuers/datels/datels.component';
import { TrindyComponent } from './featuers/home/trindy/trindy.component';

import { PuplarComponent } from './featuers/home/puplar/puplar.component';




export const routes: Routes =[
       {path: '', redirectTo: 'register', pathMatch: 'full'},
       {path:'', component: AuthLayoutComponent ,children: [
       {path: 'login', component: LoginComponent},
       {path: 'register', component: RegisterComponent},
        ]},
      {path:'', component: BlankLayoutComponent, children: [
  {path: 'home', component: HomeComponent , children: [
    {path: '', redirectTo: 'trindy', pathMatch: 'full'},
      {path: 'trindy', component: TrindyComponent},
      {path: 'puplar', component: PuplarComponent}
  ]},
  {path: 'tvshow', component: TvshowComponent , children: [
    {path: '', redirectTo: 'action', pathMatch: 'full'},
    {path: 'action', component: ActionComponent},
    {path: 'adventure', component: AdventureComponent},
    {path: 'comedy', component: ComedyComponent},
    {path: 'crime', component: CrimeComponent},
    {path: 'drama', component: DramaComponent},
    {path: 'family', component: FamilyComponent},
    {path: 'fantasy', component: FantasyComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'horror', component: HorrorComponent},
    {path: 'music', component: MusicComponent},
    {path: 'romance', component: RomanceComponent},
    {path: 'science-fiction', component: ScienceFictionComponent},
    {path: 'thriller', component: ThrillerComponent},
    {path: 'mystery', component: MysteryComponent},
    {path: 'fantasy', component: FantasyComponent},
    {path: 'documentary', component: DocumentaryComponent},
    {path: 'animation', component: AnimationComponent},
    {path: 'war', component: WarComponent},
    {path: 'western', component: WesternComponent},



  ]},

     ]

       },
     {path: 'favtatie', component:FavtatieComponent },
      { path:'datels/:id' ,component: DatelsComponent  },

        {path: '**' ,component:NotfoundComponent},



];
