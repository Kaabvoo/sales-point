import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ISales, ISalesDetails } from '../shared/interfaces/sales';
import { SaleService } from '../shared/services/sale.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {

  sales: Observable<ISales[]>;

  selectedSaleDetails?: ISales;

  constructor(private sS: SaleService) {
    this.sales = sS.getReport();
    this.selectedSaleDetails = undefined;
  }

  selectedRow(selected: ISales) {
    this.selectedSaleDetails = selected;
    return;
  }

}
