import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { faUser, faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
// Comando para rodar o json server auth e json server
// json-server db.json -m ./node_modules/json-server-auth

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 
  constructor(private userService: UserService, private router: Router) { 

    
  }

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
    // lista de palavras proibidas
    let blackList = ["SELECT", "OR",' ""="" ', "-- ", ";", "1 = 1", "1=1", "DROP", "\"\"=\"\"", "'='"];//lista de palavras chave
    
    let ataque = 0;
    
    blackList.forEach((palavra) => {
      if(this.userModel.email?.toUpperCase().includes(palavra)) {
        ataque++;//conta mais uma palavra proibida
      }
    })
    
    // console.log('ATAQUEEEEEEEEE',ataque);
    // if(ataque > 0){//tem palavra de sql injection
    //   return false;//não deixa passar!!!
    // }
    
    
    if (//falta preencher campos ou caiu na black list
      this.userModel.nome === undefined || this.userModel.nome === '' || 
      this.userModel.email === undefined || this.userModel.email === '' ||
      this.userModel.password === undefined || this.userModel.password === '' ||
      ataque > 0
    ) { 
      return false;
    } else {
      return true;
    }
  
  
  }//fim da função

  //Função de Login
  signin() {
    //fazer validação
    if ( this.validaLogin() ) { //pode logar?
      
      this.userService.sigin(this.userModel)
        .subscribe(
          {
            next: (response) => {
              this.mensagem = `Logado com Sucesso! ${response.status} ${response.statusText}`
              
              //encaminhar para a rota home
              this.router.navigate([''])
            },
            error: (e) => {
              this.mensagem = `${e.error} ${e.status} ${e.statusText}`
            }
          }
        )

    } else {//falta preencher campos ou contém sql injection

      console.log(this.userModel);
      this.mensagem = "Preencher todos os campos corretamente"
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
