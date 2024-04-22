import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { IProduct } from '../shared/interfaces/product';
import { ProductsServiceService } from '../shared/services/products-service.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  isNullOrEmpty = (a: string | null | undefined) => a === null || a === undefined || a.length < 1;

  groupInput = new FormGroup({
    name: new FormControl('', [Validators.nullValidator, Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  products: Observable<IProduct[]>;

  constructor(private cS: ProductsServiceService) {
    this.products = cS.getProducts();
  }

  submit(group: Partial<{ name: string | null, price: number | null } | null>) {
    if (!this.isNullOrEmpty(group?.name) && (group?.price !== undefined && group.price !== null && group?.price > 1))
      this.cS.postProducts(<any>group).pipe(takeUntilDestroyed()).subscribe();
    return;
  }

  delete(id: number) {
    this.cS.deleteProduct(id).pipe(takeUntilDestroyed()).subscribe();
  }
}
