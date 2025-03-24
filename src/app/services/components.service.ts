import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  public static subjectComponents: Subject<any> = new Subject();
  constructor() { }


}
