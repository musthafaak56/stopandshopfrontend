import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
     path: '', component: AllProductsComponent 
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'viewproducts/:id', component: ViewProductsComponent
  },
  {
    path: 'wishlist', component: WishlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
