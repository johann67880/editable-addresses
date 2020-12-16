import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/shared/material/material.module";
import { AddressService } from "src/app/shared/services/address.service";
import { AddressRoutingModule } from "./addres-routing.module";
import { AddressComponent } from "./address.component";

@NgModule({
    declarations:[AddressComponent],
    imports:[
      AddressRoutingModule,
      MaterialModule
    ],
    providers: [AddressService]
})
export class AddressModule { }
