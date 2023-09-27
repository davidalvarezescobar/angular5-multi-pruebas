import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PreloaderService } from './providers/preloader.service';
import { delay, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  template: `
    <!-- <img *ngIf="loading | async"
      class="preloader"
      src='../assets/loader_santander.gif'
      alt="Loading logo santander"
      type="logo"
      title="Logo santander"/> 
      OJO: AHORA EL PRELOADER SE ENCUENTRA EN EL index.html
    -->

    <app-menu></app-menu>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  loading;

  constructor(
    private preloaderSrv: PreloaderService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    /*  ESTE BLOQUE DE 4 POSIBLES CODIFICACIONES PARA CONTROLAR EL 'PRELOADER' ESTÁ COMENTADO PORQUE
        HE UTILIZADO UNA OPCIÓN MÁS SENCILLA, MEDIANTE CSS.
        POR ESO, EN EL SERVICIO 'preloader.service' ESTÁN COMENTADAS LAS LÍNEAS 'this.subject.next(true/false)'.
        DE LAS 4 SIGUIENTES OPCIONES, LA MEJOR SERÍA LA PRIMERA:

    // // Bien, FUNCIONA incluso con 'OnPush' y sin necesidad de utilizar 'changeDetector' y utilizamos la pipe 'async'
    // this.loading = this.preloaderSrv.observable$.pipe(
    //   delay(0),
    //   tap((loading) => console.log('loading: ', loading))
    //   );

    // Mal, sólo FUNCIONA sin el 'OnPush' y además no deberíamos usar el subscribe
    // this.preloaderSrv.observable$.subscribe(res => {
    //   setTimeout(() => {
    //     this.loading = res;
    //     this.changeDetector.detectChanges(); // al poner esta línea, ya funcionaría con 'OnPush'
    //   });
    // });

    // Mal, sólo FUNCIONA sin el 'OnPush' y además no deberíamos usar el subscribe
    // this.preloaderSrv.observable$.subscribe(async (res) => {
    //   this.loading = await res;
    //   this.changeDetector.detectChanges(); // al poner esta línea, ya funcionaría con 'OnPush'
    // });

    // Mal, NO FUNCIONA y además no deberíamos usar el subscribe
    // setTimeout(() => this.preloaderSrv.observable$.subscribe(res => this.loading=res), 0);
    */
  }

}
