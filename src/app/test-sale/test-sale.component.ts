import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IClient } from '../shared/interfaces/client';
import { IProductCount } from '../shared/interfaces/create-sale';
import { IProduct } from '../shared/interfaces/product';
import { ClientsServiceService } from '../shared/services/clients-service.service';
import { ProductsServiceService } from '../shared/services/products-service.service';
import { SaleService } from '../shared/services/sale.service';
import { ICreateSale } from './../shared/interfaces/create-sale';

@Component({
  selector: 'app-test-sale',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './test-sale.component.html',
  styleUrl: './test-sale.component.scss'
})
export class TestSaleComponent {

  clients: Observable<IClient[]>;
  products: Observable<IProduct[]>;

  selectedProducts: IProductCount[];
  totalCount: number;

  selectedClient = new FormControl(0);

  constructor(private cS: ClientsServiceService,
    private pS: ProductsServiceService,
    private sS: SaleService) {
    this.totalCount = 0;
    this.clients = cS.getClients();
    // this.products = pS.getProducts();
    this.products = of([
      { id: 1, name: 'papas', price: 10 },
      { id: 2, name: 'elotes', price: 20 },
      { id: 3, name: 'pan', price: 30 },
      { id: 4, name: 'soda', price: 40 },
      { id: 5, name: 'lapiz', price: 50 },
      { id: 6, name: 'papel', price: 60 },
    ]);
    this.selectedProducts = [];
  }
  addItemToCart(prod: IProduct) {
    var selItm = this.selectedProducts.find(x => x.productId === prod.id);
    if (prod.price === undefined || prod.price === null)
      return;
    // Check if product exist
    if (selItm !== undefined) {
      // Item Exist
      selItm.count++;
      selItm.amount = selItm.count * prod.price;
    } else {
      // Imten no exist
      this.selectedProducts = this.selectedProducts.concat(<IProductCount[]>[{
        productId: prod.id,
        name: prod.name,
        count: 1,
        amount: prod.price
      }])
    }
    this.totalCount = this.selectedProducts.map(x => x.amount).reduce((p, c) => p + c);
  }
  sendCart(cart: IProductCount[], clientId: number | null) {
    var sale = <ICreateSale>{
      customerId: clientId,
      products: cart
    }
    this.sS.postProducts(sale).pipe(takeUntilDestroyed()).subscribe(x => location.reload());
  }
  deleteItem(del: IProductCount) {
    this.selectedProducts.splice(this.selectedProducts.findIndex(x => x.productId === del.productId), 1);
    if (this.selectedProducts.length < 1)
      this.totalCount = 0;
    else
      this.totalCount = this.selectedProducts.map(x => x.amount).reduce((p, c) => p + c);
  }
}
