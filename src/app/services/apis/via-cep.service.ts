import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private httpClient: HttpClient) { }

  public getCep(cep:string):Observable<any>{
    return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
