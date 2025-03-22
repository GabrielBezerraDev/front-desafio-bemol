import { Component, EventEmitter, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-in',
  standalone: false,
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.scss'
})
export class SingInComponent implements OnInit{
  @Output() onCloseModal: EventEmitter<void> = new EventEmitter();
  @Output() onChangeStatusAccount: EventEmitter<boolean> = new EventEmitter();
  public formUserError: WritableSignal<string> = signal("");
  public formUser: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.setupFormUser();
  }

  public setupFormUser():void{
    this.formUser = this.formBuilder.group({
      emailOrCpf: [null,[Validators.required]],
      password: [null,[Validators.required]]
    });

    this.formUser.valueChanges.subscribe({
      next: () => {
        this.formUserError.set("");
      }
    })

  }

  public closeModal():void{
    this.onCloseModal.emit();
  }

  public changeStatusAccount():void{
    this.onChangeStatusAccount.emit(false);
  }

  public login():void{
    if(this.formUser.invalid) {
      this.formUserError.set("Email/CPF ou Senha está incorreto");
      return;
    };

  }

}
