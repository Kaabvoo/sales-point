import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { IClient } from '../shared/interfaces/client';
import { ClientsServiceService } from '../shared/services/clients-service.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  isNullOrEmpty = (a: string | null | undefined) => a === null || a === undefined || a.length < 1;

  clients: Observable<IClient[]>;

  inputName = new FormControl('', [Validators.required, Validators.nullValidator]);

  constructor(private cS: ClientsServiceService) {
    this.clients = cS.getClients();
  }

  submit(name: string | null) {
    if (!this.isNullOrEmpty(name))
      this.cS.postClients(<any>name).pipe(takeUntilDestroyed()).subscribe();
    return;
  }

  delete(id: number) {
    this.cS.deleteClient(id).pipe(takeUntilDestroyed()).subscribe();
  }
}
