import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../env.config';
import { ICreateSale } from '../interfaces/create-sale';
import { Observable } from 'rxjs';
import { ISales } from '../interfaces/sales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private host: string;

  httpH = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.host = environment.envHost + 'Sales';
  }

  public postProducts(sale: ICreateSale): Observable<void> {
    var api = "create-sale";
    return this.http.post<void>(`${this.host}/${api}`, sale, {headers: this.httpH});
  }

  public getReport(): Observable<ISales[]> {
    var api = "get-report";
    return this.http.get<ISales[]>(`${this.host}/${api}`);
  }
}
