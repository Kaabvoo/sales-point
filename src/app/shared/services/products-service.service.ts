import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../env.config';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {

  host: string;

  constructor(private http: HttpClient) {
    this.host = environment.envHost + 'Products';
  }

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.host)
  }
  public getProductsId(id: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.host}/${id}`);
  }
  public postProducts(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.host, product);
  }
  public patchProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(this.host, product, { params: new HttpParams().set("id", product.id) });
  }
  public deleteProduct(id: number) {
    return this.http.delete(this.host, { params: new HttpParams().set("id", id) })
  }
}
