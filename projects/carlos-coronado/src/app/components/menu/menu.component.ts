import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus = [
    {
      label: 'Motor de eventos',
      submenu: [
        {label: 'Eventos', link: '/eventos'},
        {label: 'Planes', link: '/planes'},
        {label: 'Acciones', link: '/acciones'}
      ]
    },
    {
      label: 'Campos pantalla',
      submenu: [
        {label: 'Organismo sancionador', link: ''},
        {label: 'Motivos', link: ''}
      ]
    },
    {
      label: 'Perfiles usuarios',
      submenu: [
        {label: 'Perfil usuario', link: ''},
        {label: 'Perfil por zona', link: ''},
        {label: 'Clientes excepcionados', link: ''}
      ]
    }
  ];
  menuHover = {};
  menuSelected = {};
  submenuSelected = {};
  displaySubMenu = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      // urlAfterRedirects: https://stackoverflow.com/questions/45450739/angular4-x-navigationend-url-vs-navigationend-urlafterredirects
      map((e: NavigationEnd) => e.urlAfterRedirects) // tambien podría obtenerse con: pluck('urlAfterRedirects')
    ).subscribe((activeUrl) => {
      let submenuSelected;
      this.menus.forEach(menu => {
        if (!submenuSelected) {
          // el if anterior evita que se realicen nuevos find, una vez encontrado el correspondiente submenu
          submenuSelected = menu.submenu.find(o => o.link === activeUrl);
          if (submenuSelected) {
            this.submenuSelected = submenuSelected;
            this.menuSelected = menu;
          }
        }
      });
    });
  }


  @HostListener('mouseleave') mouseleave() {
    this.menuHover = {};
    this.displaySubMenu = false;
  }

  navigate(ruta) {
    this.router.navigate([ruta]);
  }
}
