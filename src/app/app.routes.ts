import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    { path: 'clients', component: ClientsComponent },
    { path: 'products', component: ProductsComponent }
];
