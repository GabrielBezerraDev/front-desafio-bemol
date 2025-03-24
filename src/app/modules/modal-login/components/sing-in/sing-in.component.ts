import { AfterViewInit, Component, EventEmitter, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/apis/user.service';
import { UserGetInterface, UserLoginInterface } from '../../../../interfaces/user.interface';
import { AppComponent } from '../../../../app.component';
import { HeaderComponent } from '../../../../components/header/header.component';
import { ComponentsService } from '../../../../services/components.service';
import { debounce, debounceTime, delay, Observable } from 'rxjs';
import { LoadingInterface } from '../../../../shared/loading/interface/loading.interface';

@Component({
  selector: 'app-sing-in',
  standalone: false,
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.scss'
})
export class SingInComponent implements OnInit {
  @Output() onCloseModal: EventEmitter<void> = new EventEmitter();
  @Output() onChangeStatusAccount: EventEmitter<boolean> = new EventEmitter();
  @Output() onStateLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() onResultLoading: EventEmitter<LoadingInterface> = new EventEmitter();
  public formUserError: WritableSignal<string> = signal("");
  public formUser: FormGroup;
  public loadingMessages: Partial<LoadingInterface> = {
    errorMessage: "Ocorreu um ao criar usuário!",
    succeedMessage: "Usuário criado!"
  };

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.setupFormUser();
  }

  public setupFormUser(): void {
    this.formUser = this.formBuilder.group({
      emailOrCpf: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.formUser.valueChanges.subscribe({
      next: () => {
        this.formUserError.set("");
      }
    })

  }


  public closeModal(): void {
    this.onCloseModal.emit();
  }

  public changeStatusAccount(): void {
    this.onChangeStatusAccount.emit(false);
  }

  public login(): void {
    if (this.formUser.invalid) {
      this.formUserError.set("Email/CPF ou Senha está incorreto");
    } else {
      this.onStateLoading.emit(true);
      let userLogin = {} as UserLoginInterface;
      let value: 'email' | 'cpf' | null = this.isEmailOrCpf(this.formUser.get("emailOrCpf")?.value);
      switch (value) {
        case "cpf":
          userLogin.cpf = this.formUser.get("emailOrCpf")?.value; break;
        case "email":
          userLogin.email = this.formUser.get("emailOrCpf")?.value; break;
      }
      userLogin.password = this.formUser.get("password")?.value;
      if (value) {
        this.userService.postSessionLogin(userLogin).pipe(delay(3000)).subscribe({
          next: (data: any) => {
            this.onResultLoading.emit({...this.loadingMessages as LoadingInterface,value:true});
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            ComponentsService.subjectComponents.next(data.user)
          },
          error: (error) => {
            this.onResultLoading.emit({...this.loadingMessages as LoadingInterface,value:false});
            console.log(error);
          }
        });
      }

    }

  }

  public isEmailOrCpf(value: string): 'email' | 'cpf' | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      return 'email';
    }

    const cpfClean = value.replace(/\D/g, '');

    if (cpfClean.length === 11 && this.isValidCPF(cpfClean)) {
      return 'cpf';
    }

    return null;
  }


  public isValidCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[10])) return false;

    return true;
  }

}
