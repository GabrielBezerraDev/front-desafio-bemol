import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Observable } from 'rxjs';
import { ComponentsService } from '../../services/components.service';
import { UserGetInterface } from '../../interfaces/user.interface';
import { ChatService } from '../../services/apis/chat.service';
import { FormControl } from '@angular/forms';
import { getCurrentUser } from '../../utils/utils-user';
import { sign } from 'crypto';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit(): void {

  }

  public initChatWithBot(): void {
    if (this.userLoggedIn) this.initChat = true;
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
    this.waitResponse.set(true);
    this.addBoxMessage(this.prompt.value, 'user-message');
    this.chatService.generatePrompt(this.prompt.value).subscribe({
      next: (result) => {
        this.waitResponse.set(false);
        this.addBoxMessage(result.messageIA, 'ia-message');
      }
    })
  }

}
