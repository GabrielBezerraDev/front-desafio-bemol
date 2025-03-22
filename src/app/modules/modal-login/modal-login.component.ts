import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.scss',
  standalone: false
})
export class ModalLoginComponent {
  visible: boolean = false;
  haveAccount: WritableSignal<boolean> = signal(true);

  showModal() {
      this.visible = true;
  }

  closeModal() {
      this.visible = false;
  }

  changeStatusAccount(value:boolean):void{
    this.haveAccount.set(value);
  }
}
