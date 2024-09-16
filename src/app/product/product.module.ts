import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductPageComponent } from './pages/product-page/product-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
  ],
  imports: [CommonModule, ProductRoutingModule, ReactiveFormsModule],
})
export class ProductModule {}
