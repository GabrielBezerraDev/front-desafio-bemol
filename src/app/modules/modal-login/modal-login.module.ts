import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ModalLoginComponent } from './modal-login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { StepperModule } from 'primeng/stepper';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PrimeIcons } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { Tooltip } from 'primeng/tooltip';




@NgModule({
  declarations: [
    ModalLoginComponent,
    SingUpComponent,
    SingInComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    StepperModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    Dialog,
    ReactiveFormsModule,
    Tooltip
  ],
  exports: [
    ModalLoginComponent
  ]
})
export class ModalLoginModule { }
