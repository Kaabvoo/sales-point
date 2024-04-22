import { Observable } from 'rxjs';
import { ClientsServiceService } from '../shared/services/clients-service.service';
import { Component } from '@angular/core';
import { IClient } from '../shared/interfaces/client';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [AsyncPipe],
  providers: [HttpClientModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  clients: Observable<IClient[]>;

  constructor(private cS: ClientsServiceService) {
    this.clients = cS.getClients();
  }
}
