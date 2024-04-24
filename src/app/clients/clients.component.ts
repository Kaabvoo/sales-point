import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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

  showEdit: boolean;
  clientEdit = new FormGroup({
    id: new FormControl(0, Validators.nullValidator),
    name: new FormControl('', Validators.nullValidator)
  });

  constructor(private cS: ClientsServiceService) {
    this.showEdit = false;
    this.clients = cS.getClients();
  }

  submit(name: string | null) {
    if (!this.isNullOrEmpty(name))
      this.cS.postClients(<any>name).pipe(takeUntilDestroyed()).subscribe();
    return;
  }

  delete(id?: number | null) {
    if (!(id !== null || id !== undefined) && id > 0)
      this.cS.deleteClient(id).pipe(takeUntilDestroyed()).subscribe();
  }

  selectToEdit(client: IClient) {
    this.showEdit = true
    this.clientEdit.patchValue(client);
  }

  edit(client: IClient) {
    this.cS.patchClient(client).pipe(takeUntilDestroyed()).subscribe();
  }
}
