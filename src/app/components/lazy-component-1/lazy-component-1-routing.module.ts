import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LazyComponent1Component } from './lazy-component-1.component';

const routes: Routes = [
  { path: '', component: LazyComponent1Component }
];

@NgModule({
  exports: [RouterModule],
  imports:[RouterModule.forChild(routes)]
})

export class LazyComponent1RoutingModule{ }