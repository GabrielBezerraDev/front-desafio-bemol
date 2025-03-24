import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { HomeRoutingModule } from './home-routing.module';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HomeComponent } from './home.component';
import { TooltipModule } from 'primeng/tooltip';
import {  } from "../modal-login/modal-login.component";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    TooltipModule,
    HomeRoutingModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule

  ]
})
export class HomeModule {}
