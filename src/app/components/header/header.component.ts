import { Component, ViewChild } from '@angular/core';
import { ModalLoginComponent } from '../../modules/modal-login/modal-login.component';
import { ModalLoginModule } from '../../modules/modal-login/modal-login.module';

@Component({
  selector: 'app-header',
  imports: [ModalLoginModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('modalLogin') modalLogin: ModalLoginComponent;


  public openModal():void{
    if(!this.modalLogin.haveAccount()) this.modalLogin.haveAccount.set(true);
    this.modalLogin.showModal();
  }
}
