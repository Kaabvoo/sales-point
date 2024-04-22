import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { environment } from '../../../../env.config';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {

  host: string;

  constructor(private http: HttpClient) {
    this.host = environment.envHost + 'Products';
  }

  public getClients(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.host)
  }
  public getClientsId(id: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.host}/${id}`);
  }
  public postClients(client: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.host, client);
  }
  public patchClient(client: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(this.host, client, { params: new HttpParams().set("id", client.id) });
  }
  public deleteClient(id: number) {
    return this.http.delete(this.host, { params: new HttpParams().set("id", id) })
  }
}
