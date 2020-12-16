import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/shared/material/material.module";
import { AddressService } from "src/app/components/address/address.service";
import { AddressRoutingModule } from "./addres-routing.module";
import { AddressComponent } from "./address.component";
import { EditableCellComponent } from '../../shared/components/editable-cell/editable-cell.component';

@NgModule({
    declarations:[
      AddressComponent,
      EditableCellComponent
    ],
    imports:[
      AddressRoutingModule,
      MaterialModule
    ],
    providers: [AddressService]
})
export class AddressModule { }
