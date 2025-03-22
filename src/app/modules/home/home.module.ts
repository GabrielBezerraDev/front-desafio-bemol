import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { HomeRoutingModule } from './home-routing.module';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HomeComponent } from './home.component';
import { TooltipModule } from 'primeng/tooltip';
import { ModalLoginComponent } from "../modal-login/modal-login.component";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    TooltipModule,
    HomeRoutingModule]
})
export class HomeModule {}
