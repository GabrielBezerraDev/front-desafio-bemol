import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressInterface } from '../../interfaces/address.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  public postAddress(address:AddressInterface):Observable<AddressInterface>{
    return this.httpClient.post<AddressInterface>("http://localhost:3000/address",address);
  }
}
