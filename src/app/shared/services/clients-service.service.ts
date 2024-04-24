import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient } from '../interfaces/client';
import { environment } from "../../../../env.config";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsServiceService {

  host: string;

  constructor(private http: HttpClient) {
    this.host = environment.envHost + 'Clients';
  }

  public getClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.host)
  }
  public getClientsId(id: number): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.host}/${id}`);
  }
  public postClients(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(this.host, client);
  }
  public patchClient(client: IClient): Observable<IClient | null> {
    if (client?.id !== undefined && client?.id !== null)
      return this.http.patch<IClient>(this.host, client, { params: new HttpParams().set("id", client.id) });
    else
      return new Observable<null>;
  }
  public deleteClient(id: number) {
    return this.http.delete(this.host, { params: new HttpParams().set("id", id) })
  }
}
