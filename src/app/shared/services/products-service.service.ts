import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../env.config';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {

  host: string;

  itExist = (a: any) => a !== null && a !== undefined;

  httpH = new HttpHeaders().set('Content-Type', 'application/json');

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
    return this.http.post<IProduct>(this.host, product, {headers: this.httpH});
  }
  public patchProduct(product: IProduct): Observable<IProduct | null> {
    if (product?.id !== undefined && product?.id !== null)
      return this.http.patch<IProduct>(this.host, product, { params: new HttpParams().set("id", product.id), headers: this.httpH });
    else
      return new Observable<null>;
  }
  public deleteProduct(id: number) {
    return this.http.delete(this.host, { params: new HttpParams().set("id", id) })
  }
}
