import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbgService {

  constructor(private httpClient: HttpClient) { }

  public getUFs(): Observable<any> {
    return this.httpClient.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`);
  }

  public getMunicipios(UF:string):Observable<any>{
    return this.httpClient.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`);
  }
}
