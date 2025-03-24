import { Component, AfterViewInit, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UserGetInterface } from './interfaces/user.interface';
import { ComponentsService } from './services/components.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'bemol-digital';
  public user: null | UserGetInterface;


}
