import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  funds$ = this.appSrv.getFunds();

  imgSrcPart1 = 'https://www.morningstar.es/es/funds/WebGraph/growth10k4year.aspx?id=';
  imgSrcPart2 = '&currencyId=EUR&investmenttype=FO&MsRestructureDate=&IMARestructureDate=&RestructureDate=&ShowCategory=1&ShowIndex=1';
  
  constructor(
    readonly appSrv: AppService
  ) { }

  ngOnInit(): void {
  }

  selectedIds: number[] = [];

  get selectedIdsString(): string {
    return this.selectedIds.join(',');
  }

  onCardSelect(id: number, event: any): void {
    if (event.target.checked) {
      // Añadir el ID si se selecciona
      this.selectedIds.push(id);
    } else {
      // Eliminar el ID si se deselecciona
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
    }
  }

  clearSelection(): void {
    this.selectedIds = []; // Vaciar el array de IDs seleccionados
    // Opcional: Desmarcar todos los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  }
}
