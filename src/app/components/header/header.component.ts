import { AfterViewInit, Component, computed, ElementRef, OnInit, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { ModalLoginComponent } from '../../modules/modal-login/modal-login.component';
import { ModalLoginModule } from '../../modules/modal-login/modal-login.module';
import { Observable } from 'rxjs';
import { ComponentsService } from '../../services/components.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ModalLoginModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalLogin') modalLogin: ModalLoginComponent;
  public observable: Observable<any> = ComponentsService.subjectComponents.asObservable();
  public nameUser: WritableSignal<string> = signal("");
  public userLoggedIn: WritableSignal<boolean> = signal(true);

  constructor() { }

  ngOnInit(): void {
    this.observable.subscribe((user: any) => {
      console.log(user);
      if (!user) return;
      this.nameUser.set(user.name);
      this.userLoggedIn.set(false);
    })
  }

  public openModal(): void {
    if (!this.modalLogin.haveAccount()) this.modalLogin.haveAccount.set(true);
    this.modalLogin.showModal();
  }


}
