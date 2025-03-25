import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Observable, Subject } from 'rxjs';
import { LoadingInterface } from '../../shared/loading/interface/loading.interface';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.scss',
  standalone: false
})
export class ModalLoginComponent implements OnInit {
  visible: boolean = false;
  haveAccount: WritableSignal<boolean> = signal(true);
  static subjectModalClose: Subject<void> = new Subject();
  static subjectModalOpen: Subject<void> = new Subject();
  static subjectModalStateAccount: Subject<boolean> = new Subject();
  observableModalClose: Observable<void> = ModalLoginComponent.subjectModalClose.asObservable();
  observableModalOpen: Observable<void> = ModalLoginComponent.subjectModalOpen.asObservable();
  observableModalStateAccount: Observable<boolean> = ModalLoginComponent.subjectModalStateAccount.asObservable();
  @ViewChild("loading") loading: LoadingComponent;

  ngOnInit(): void {
    this.observableModalClose.subscribe({
      next: () => {
        this.closeModal();
      }
    });

    this.observableModalOpen.subscribe({
      next: () => {
        this.showModal();
      }
    });

    this.observableModalStateAccount.subscribe({
      next: (state:boolean) => {
        this.haveAccount.set(state);
      }
    })
  }

  showModal() {
      this.visible = true;
  }

  closeModal() {
      this.visible = false;
  }

  changeStatusAccount(value:boolean):void{
    this.haveAccount.set(value);
  }

  stateLoading(value:boolean):void{
    this.loading.stateLoading(value);
  }

  resultLoading(value:LoadingInterface):void{
    value.value ? this.loading.succedLoading(value.succeedMessage) : this.loading.errorsLoading(value.errorMessage);
  }


}
