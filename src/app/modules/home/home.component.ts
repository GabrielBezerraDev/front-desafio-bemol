import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Observable } from 'rxjs';
import { ComponentsService } from '../../services/components.service';
import { UserGetInterface } from '../../interfaces/user.interface';
import { ChatService } from '../../services/apis/chat.service';
import { FormControl } from '@angular/forms';
import { getCurrentUser } from '../../utils/utils-user';
import { sign } from 'crypto';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { DialogMessageComponent } from '../../shared/dialog-message/dialog-message.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('dialogMessage') dialogMessage: DialogMessageComponent;
  public initChat: boolean = false;
  public userLoggedIn: boolean = false;
  public observable: Observable<any> = ComponentsService.subjectComponents.asObservable();
  public prompt: FormControl = new FormControl('');
  public panelChat: HTMLDivElement;
  public waitResponse: WritableSignal<boolean> = signal(false);

  constructor(private chatService: ChatService, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.observable.subscribe((user: UserGetInterface) => {
      this.userLoggedIn = true;
    });
    let user = getCurrentUser();
    if (user) ComponentsService.subjectComponents.next(user);
  }

  public initChatWithBot(title:string,message:string,openLoginModa:boolean = true): void {
    if (this.userLoggedIn) this.initChat = true;
    else{
      if(openLoginModa){
        ModalLoginComponent.subjectModalStateAccount.next(true);
        ModalLoginComponent.subjectModalOpen.next();
      }
      this.dialogMessage.title = title;
      this.dialogMessage.textContent = message;
      this.dialogMessage.showDialog();
    }
  }

  public addBoxMessage(message: string, className: string): void {
    this.panelChat = this.elementRef.nativeElement.querySelector(".panel-chat") as HTMLDivElement;
    let divMessage = document.createElement('div');
    let divBoxMessage = document.createElement('div');
    let pMessage = document.createElement('p');
    this.renderer.addClass(divBoxMessage, 'box-message');
    pMessage.innerHTML = message;
    this.renderer.addClass(divMessage, className);
    this.renderer.appendChild(divBoxMessage, pMessage);
    this.renderer.appendChild(divMessage, divBoxMessage);
    this.renderer.appendChild(this.panelChat, divMessage);
  }

  public sendPrompt(): void {
    if (!this.prompt.value) return;
    let userInput: string = this.prompt.value;
    this.prompt.reset();
    this.waitResponse.set(true);
    this.addBoxMessage(userInput, 'user-message');
    this.chatService.generatePrompt(userInput).subscribe({
      next: (result) => {
        this.waitResponse.set(false);
        this.addBoxMessage(result.messageIA, 'ia-message');
      }
    })
  }

}
