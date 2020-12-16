import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { UnsubscribeComponent } from 'src/app/shared/helpers/unsubscribe.component';
import { Address } from 'src/app/components/address/address.model';
import { AddressService } from 'src/app/components/address/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent extends UnsubscribeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['streetNumber', 'street', 'city', 'state', 'zip'];
  dataSource = new MatTableDataSource<Address>();
  loading: boolean = false;
  currentEditIndex: number = -1;
  currentEditRow: Address;
  currentEditField: string = '';
  isEditing: boolean = false;

  constructor(private addressService: AddressService, private changeDetectorRefs: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  //it was needed to increase performance to render all the addresses
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //function to get all addresses and also specifies, sorting, paginator, and so forth.
  getAddresses(): void {
    this.loading = true;
    this.addressService.get().subscribe(addresses => {
      this.dataSource.data = addresses;
      this.loading = false;
    });
  }

  //filter data by the specific criteria typed by user
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //function to enable input according to the selected cell
  enableField(element: Address, index: number, fieldName: string): void {
    this.currentEditField = fieldName;
    this.currentEditIndex = index;
  }

  //executed function on blur.
  update(index: number, element: Address): void {
    this.currentEditRow = Object.assign({}, element);
    this.currentEditIndex = -1;
    this.currentEditField = '';

    /*

    //Stub endpoint: method to update one or more addresses
    this.addressService.update([this.currentEditRow])
    .subscribe(response => {
      console.log(response);
    });

    //Stub endpoint: method to send a file via post to the backend. In this case datasource.data contains updated addresses
    this.addressService.sendFile(this.dataSource.data)
    .subscribe(response => {
      console.log(response);
    });

    */
  }
}
