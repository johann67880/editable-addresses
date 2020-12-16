import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { LazyComponent1Component } from './lazy-component-1.component';
import { LazyComponent1RoutingModule } from './lazy-component-1-routing.module';

@NgModule({
    declarations:[
        LazyComponent1Component
    ],
    imports:[
        LazyComponent1RoutingModule,
        MaterialModule
    ],
    providers: []
})
export class LazyComponent1Module { }
