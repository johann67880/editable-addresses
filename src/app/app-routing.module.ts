import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:"address",
    loadChildren: '../app/components/address/address.module#AddressModule'
  },
  {
    path:"lazy-1",
    loadChildren: '../app/components/lazy-component-1/lazy-component-1.module#LazyComponent1Module'
  },
  { path: '',
    redirectTo: '/address',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [HttpClient],
})
export class AppRoutingModule { }
