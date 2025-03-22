import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { Stepper } from 'primeng/stepper';
import { ViaCepService } from '../../../../services/apis/via-cep.service';
import { IbgService } from '../../../../services/apis/ibg.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, SelectModule } from 'primeng/select';

@Component({
  selector: 'app-sing-up',
  standalone: false,
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent implements OnInit {
  @Output() onCloseModal: EventEmitter<void> = new EventEmitter();
  @Output() onChangeStatusAccount: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('stepper') stepper: Stepper;
  @ViewChild('selectMunicipio') selectMunicipio: Select;
  @ViewChild('estadoSelect') selectEstado: Select;


  public municipiosSelect: WritableSignal<({ name: string, code: string })[]> = signal([]);
  public ufs: any[] = [];
  public ufsSelect: WritableSignal<({ name: string, code: string })[]> = signal([]);
  public formCep: FormGroup;
  public formUser: FormGroup;
  public setMunicipio: (() => void) | null = null;
  public cepErrorMessage: WritableSignal<string> = signal("");
  public estadoErrorMessage:WritableSignal<string> = signal("");
  public municipioErrorMessage: WritableSignal<string> = signal("");
  public addressErrorMessage: WritableSignal<string> = signal("");
  public houseNumberErrorMessage: WritableSignal<string> = signal("");
  public userFormErrors: WritableSignal<Record<string, [boolean, string, string]>> = signal({
    email: [false, "Email inválido", "Email inválido"],
    cpf: [false, "CPF inválido", "CPF inválido"],
    password: [false, "Senha inválida", "Senha inválida"],
    passwordValidate: [false, "Confirme a senha", "Confirme a senha"]
  })

  public addressFormErrors: WritableSignal<Record<string, [boolean, string, string]>> = signal({
    estados: [false, "Estado não pode ser um campo vazio", "Estado não pode ser um campo vazio"],
    houseNumber: [false, "Número da casa não pode ser vazio", "Número da casa não pode ser vazio"],
    municipios: [false, "Município não pode ser vazio", "Município não pode ser vazio"],
    address: [false, "Endereço não pode ser vazio", "Endereço não pode ser vazio"]
  })



  constructor(private ibgeService: IbgService, private formBuilder: FormBuilder, private elementRef: ElementRef, private viaCepService: ViaCepService) { }

  ngOnInit(): void {
    this.setUFs();
    this.setupFormCep();
    this.setupFormUser();
  }

  public setupFormCep(): void {
    this.formCep = this.formBuilder.group({
      cep: [null, [Validators.required]],
      estados: [null, [Validators.required]],
      municipios: [null, [Validators.required]],
      address: [null, [Validators.required]],
      houseNumber: [null, [Validators.required]]

    });
    this.formCep.get("municipios")?.disable();
    this.formCep.get("cep")?.valueChanges.subscribe(() => this.cepErrorMessage.set(""));
    this.formCep.get("estados")?.valueChanges.subscribe((value: { name: string, code: string }) => {
      this.changeErrorStateUserForm("estados",false,this.addressFormErrors);
      this.ibgeService.getMunicipios(value.code).subscribe(({
        next: (result) => {
          this.municipiosSelect.set([]);
          result.forEach((municipio: any) => {
            this.municipiosSelect.update((municipios) => {
              municipios.push({ name: municipio.nome, code: municipio.id });
              return municipios;
            });
          });
          this.formCep.get("municipios")?.enable();
          if (this.setMunicipio) this.setMunicipio();
        }
      }));
    });

    this.stateFormErrors(false,this.formCep,this.addressFormErrors,["estados","cep"]);
  }

  public setupFormUser(): void {
    this.formUser = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordValidate: [null, [Validators.required]]
    });

    this.stateFormErrors(false,this.formUser,this.userFormErrors);

  }

  public stateFormErrors(value:boolean,form:FormGroup,objectErrors:WritableSignal<Record<string, [boolean, string, string]>>,exceptionList?:string[]): void {
    let keys = Object.keys(form.getRawValue());
    for(let key of keys){
      if(exceptionList) if(exceptionList.some((keyException) => keyException === key)) continue;
      form.get(key)?.valueChanges.subscribe({
        next: () => {
          console.log(key);
          if (this.addressFormErrors()[key]) this.changeErrorStateUserForm(key, value,objectErrors)
        }
      });
    }

  }

  public setUFs(): void {
    this.ibgeService.getUFs().subscribe({
      next: (result) => {
        result.forEach((uf: { nome: string, sigla: string }) => {
          this.ufs.push({ nome: uf.nome, sigla: uf.sigla });
        });
        this.ufsSelect.set(this.ufs.map((uf: { nome: string, sigla: string }) => { return { name: uf.nome, code: uf.sigla } }));
      }, error: (result) => console.log(result)
    });
  }

  public getCep(cep: string): void {
    if (this.formCep.get("cep")?.invalid) {
      this.cepErrorMessage.set("É obrigatório colocar o CEP para pesquisar");
      return;
    }
    this.viaCepService.getCep(cep).subscribe({
      next: (value) => {
        this.formCep.get("estados")?.setValue(this.ufsSelect().find((uf) => uf.name === value.estado));
        this.setMunicipio = () => this.formCep.get("municipios")?.setValue(this.municipiosSelect().find((municipio) => municipio.name === value.localidade));
        this.formCep.get("address")?.setValue(`${value.bairro} - ${value.logradouro}`);
      },
      error: (error) => {
        this.cepErrorMessage.set("Este CEP é inválido");
      }
    });
  }

  public setMunicipios(): void {

  }

  public submitSignForm(): void {
    if (this.formUser.invalid) return this.inputErrors(this.formUser,this.userFormErrors);
    if (this.formUser.get("password")?.value !== this.formUser.get("passwordValidate")?.value) {
      this.changeErrorStateUserForm("passwordValidate", true, this.userFormErrors,"Senhas não são iguais");
      return;
    }
    this.changeStep(2);
  }

  public submitCepForm(): void {
    let validForm: boolean = true;
    if(this.formCep.get("cep")?.invalid) {
      this.cepErrorMessage.set("É obrigatório colocar o CEP");
      validForm = false;
    }
    if (this.formCep.invalid) {
      this.inputErrors(this.formCep,this.addressFormErrors,["cep"]);
      validForm = false;
    }

    if(validForm){

    }
  }

  public inputErrors(form: FormGroup, objectErrors: WritableSignal<Record<string, [boolean, string, string]>>,exceptionList?:string[]): void {
    let keys = Object.keys(form.getRawValue());
    for (let key of keys) {
      if(exceptionList) if(exceptionList.some((keyException) => keyException === key)) continue;
      if (form.get(key)?.invalid) this.changeErrorStateUserForm(key, true,objectErrors);
    }
  }

  public changeErrorStateUserForm(key: string, value: boolean, objectErrors:WritableSignal<Record<string, [boolean, string, string]>>, messageError?: string): void {
    objectErrors.update((objectErrors: Record<string, [boolean, string, string]>) => {
      if (messageError) {
        (objectErrors[key as keyof typeof objectErrors] as [boolean, string, string])[1] = messageError;
      } else {
        (objectErrors[key as keyof typeof objectErrors] as [boolean, string, string])[1] = (objectErrors[key as keyof typeof objectErrors] as [boolean, string, string])[2];
      }
      (objectErrors[key as keyof typeof objectErrors] as [boolean, string, string])[0] = value;
      return objectErrors;
    });
  }

  public changeStep(stepper: number): void {
    this.stepper.value.set(stepper);
  }

  public closeModal(): void {
    this.onCloseModal.emit();
  }

  public changeStatusAccount(): void {
    this.onChangeStatusAccount.emit(true);
  }

}
