import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductPageComponent } from './pages/product-page/product-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new', component: NewPageComponent },
      { path: 'list', component: ListPageComponent },
      { path: 'edit/:id', component: NewPageComponent },
      { path: ':id', component: ProductPageComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
