import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { UnsubscribeComponent } from 'src/app/shared/helpers/unsubscribe.component';
import { Address } from 'src/app/shared/models/address.model';
import { AddressService } from 'src/app/shared/services/address.service';

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
  currentEditField: string = "";

  constructor(private addressService: AddressService, private changeDetectorRefs: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.getAddresses();
  }

  //it was needed to increase performance to render all the addresses
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //function to get all addresses and also specifies, sorting, paginator, and so forth.
  getAddresses() {
    this.loading = true;
    this.addressService.get().subscribe(addresses => {
      this.dataSource.data = this.mapToAddress(addresses);
      this.loading = false;
    });
  }

  //filter data by the specific criteria typed by user
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //function to map address into an object.
  //returns an array of addresses needed to be rendered in the table afterwards.
  private mapToAddress(text: string): Address[] {
    let temp: Address[] = [];

    text.split('\n').forEach((line, index) => {
      let address = new Address();
      let commaSplits = line.split(',');
      let streetInfo = commaSplits[0].split(' ');
      let stateAndZip = commaSplits[2].split(' ');
      address.Id = index + 1;
      address.streetNumber = streetInfo[0].trim();
      address.street = streetInfo.slice(1).join(' ');
      address.city = commaSplits[1].trim();
      address.state = stateAndZip[1].trim();
      address.zip = stateAndZip[2].trim();
      temp.push(address);
    });

    return temp;
  }

  //function to enable input according to the selected cell
  enableField(element: Address, index: number, fieldName: string) {
    this.currentEditField = fieldName;
    this.currentEditIndex = index;
  }

  //executed function on blur.
  update(index: number, element: Address) {
    this.currentEditRow = Object.assign({}, element);
    this.currentEditIndex = -1;
    this.currentEditField = "";

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
