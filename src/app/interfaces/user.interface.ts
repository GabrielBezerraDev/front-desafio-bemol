export interface UserLoginInterface{
  email?: string;
  cpf?: string;
  password:string;
}

export interface UserInterface{
  email: string;
  cpf: string;
  name:string;
  password:string;
}

export interface UserGetInterface extends UserInterface{
  id: number;
}

export interface UserPostInterface extends UserInterface{}
