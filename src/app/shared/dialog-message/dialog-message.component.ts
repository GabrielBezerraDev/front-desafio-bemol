import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-dialog-message',
  imports: [CommonModule, Dialog, Button],
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.scss'
})
export class DialogMessageComponent {
  visible: boolean = false;
  public title: string;
  public textContent: string;

  showDialog() {
      this.visible = true;
  }
}
