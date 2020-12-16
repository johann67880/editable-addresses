import { AddressComponent } from './address.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path:"", component: AddressComponent }
];

@NgModule({
  exports: [RouterModule],
  imports:[RouterModule.forChild(routes)]
})

export class AddressRoutingModule{ }
