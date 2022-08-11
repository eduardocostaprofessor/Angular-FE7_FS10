import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// import dos componentes da aplicação

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProdutoComponent } from './views/produto/produto.component';

const routes: Routes = [
  
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "produto", component: ProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
