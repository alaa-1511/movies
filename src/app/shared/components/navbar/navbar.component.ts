import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
@Component({
  selector: 'app-navbar',

  imports: [ RouterLink  ,  FormsModule , CommonModule ,RouterLinkActive ],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
@Input({required: true}) isLogin:boolean=true;

constructor(private flowbiteService: FlowbiteService) {}

isScrolled=false;

@HostListener('window:scroll',[])
onWindowScroll(){
  this.isScrolled= window.scrollY > 50;
}


  isDark = false;


ngOnInit() {
    const theme = localStorage.getItem('theme');
    this.isDark = theme === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }


   private readonly authService = inject(AuthService);

  onSignOut() {
    this.authService.signOut();

  }
}

