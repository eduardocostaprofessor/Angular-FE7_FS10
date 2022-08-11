import { Component, OnInit } from '@angular/core';

import { faUser, faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  // nossas funcionalidades
  faUser = faUser
  faEnvelope = faEnvelope
  faLock = faLock
  faArrowLeft = faArrowLeft

  userModel = new User()//modelo/model
  nomeProfessor: any = ""
  mensagem: string = ""


  mostrarNome(): any {
    this.nomeProfessor = this.userModel.nome;
  }

  validaLogin(): boolean {
    if (//falta preencher campos
      this.userModel.nome === undefined || this.userModel.nome === '' || 
      this.userModel.email === undefined || this.userModel.email === '' ||
      this.userModel.password === undefined || this.userModel.password === ''
    ) { 
      return false;
    } else {
      return true;
    }
  }

  //Função de Login
  signin() {
    //fazer validação
    if ( this.validaLogin() ) { //pode cadastrar?
      console.log(this.userModel);
      this.userService.sigin(this.userModel)
        .subscribe(
          {
            next: (response) => {
              console.log(response);
              this.mensagem = `Logado com Sucesso! ${response.status} ${response.statusText}`

            },
            error: (e) => {
              console.log('DEU RUIMMMMMM', e);
              // console.clear()
              this.mensagem = `${e.error} ${e.status} ${e.statusText}`
            }

          }
        )

    } else {//falta preencher campos

      console.log(this.userModel);
      this.mensagem = "Preencher todos os campos"
    }
  }

}//fim da classe


// nova forma de utilizar o subscribe segundo a biblioteca rxJS, utilizada com o service do Angular

// https://rxjs.dev/deprecations/subscribe-arguments
  // subscribe({
  //   next: (v) => console.log(v),
  //   error: (e) => console.error(e),
  //   complete: () => console.info('complete')
  // })

  // ARROW FUNCTION
  //  (params) => {
  //   // açoes
  // }
