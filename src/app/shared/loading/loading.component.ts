import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ModalLoginComponent } from '../../modules/modal-login/modal-login.component';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, Dialog, Button, ProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  title: string = "Procurando usuário";
  visible: boolean = false;
  succeed: boolean = false;
  error: boolean = false;

  stateLoading(value: boolean) {
    this.visible = value;
  }

  closeLoading(): void {
    this.stateLoading(false);
    this.succeed ? this.succeed = false : this.error = false;
    this.title = "Procurando usuário";
    ModalLoginComponent.subjectModal.next();

  }

  succedLoading(title: string): void {
    this.title = title;
    this.succeed = true;
  }

  errorsLoading(title: string): void {
    this.title = title;
    this.error = true;
  }

}
