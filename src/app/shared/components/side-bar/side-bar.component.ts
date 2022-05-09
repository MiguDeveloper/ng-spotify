import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MainMenu {
  defaultOptions: Partial<itemMenu>[];
  accessLink: Partial<itemMenu>[];
}

interface itemMenu {
  name: string;
  icon: string;
  router: string[];
  query: any;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  mainMenu: MainMenu = {
    defaultOptions: [],
    accessLink: [],
  };

  customOptions: Partial<itemMenu>[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'auth'],
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history'],
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query: { hola: 'mundo' },
      },
    ];

    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square',
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical',
      },
    ];

    this.customOptions = [
      {
        name: 'Mi lista º1',
        router: ['/'],
      },
      {
        name: 'Mi lista º2',
        router: ['/'],
      },
      {
        name: 'Mi lista º3',
        router: ['/'],
      },
      {
        name: 'Mi lista º4',
        router: ['/'],
      },
    ];
  }

  goTo(event: any) {
    this.router.navigate(['/', 'ruta'], {
      queryParams: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      },
    });
    console.log(event);
  }
}
