import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from "rxjs";
import { Address } from "../models/address.model";

@Injectable()
export class AddressService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://0f1c6e64.s3.amazonaws.com/";
  }

  //get all addresses.
  get() {
    let url = '/addresses.txt';

    //retry specify number of attempts to retry in case of error
    return this.http.get(url, {responseType: 'text'})
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //Stub endpoint:
  //Receives array of addresses to be updated in the backend
  update(addresses: Address[]) {
    //Fake Endpoint
    let url = "/updateAddress";

    return this.http.put(url, addresses)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Stub Endpoint:
  //Send edited file to the backend
  sendFile(addresses: Address[]) {
    //Fake Endpoint
    let url = "/sendFile";

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
  private handleError(error: HttpErrorResponse) {
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
