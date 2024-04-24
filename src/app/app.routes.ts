import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { TestSaleComponent } from './test-sale/test-sale.component';

export const routes: Routes = [
    { path: 'clients', component: ClientsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'test-sale', component: TestSaleComponent },
    { path: 'sales', component: SalesComponent },
    { path: '', pathMatch: 'full', redirectTo: 'clients' }
];
