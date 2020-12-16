import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { Address } from "./address.model";

@Injectable()
export class AddressService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://0f1c6e64.s3.amazonaws.com/';
  }

  //get all addresses.
  get(): Observable<Address[]> {
    let url = '/api/addresses.txt';

    //retry specify number of attempts to retry in case of error
    return this.http.get(url, {responseType: 'text'})
    .pipe(
      retry(1),
      map(addresses => this.mapToAddress(addresses)),
      catchError(this.handleError)
    );
  }

  private mapToAddress(addresses: string): Address[] {
    let temp: Address[] = [];

    addresses.split('\n').forEach((line, index) => {
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

  //Stub endpoint:
  //Receives array of addresses to be updated in the backend
  update(addresses: Address[]): Observable<any> {
    //Fake Endpoint
    let url = 'api/updateAddress';

    return this.http.put(url, addresses)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Stub Endpoint:
  //Send edited file to the backend
  sendFile(addresses: Address[]) : Observable<any> {
    //Fake Endpoint
    let url = 'api/sendFile';

    //FormDatta provides method to post the file
    let formData : FormData = new FormData();

    //converting addresses into source format (plain text)
    let formattedAddresses: string = "";
    addresses.forEach(address => {
      formattedAddresses += `${address.streetNumber} ${address.street}, ${address.city}, ${address.state} ${address.zip} \n`
    });

    //using blob with the required mime type. in this case plain text
    let file = new Blob([formattedAddresses], {type : 'text/plain'});

    //adding blob to FormData
    formData.append('uploadFile', file, 'addresses.txt');

    //sending file via post
    return this.http.post(url, formData)
    .pipe(
      catchError(this.handleError)
    );
  }

  //handle error to show custom message
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
