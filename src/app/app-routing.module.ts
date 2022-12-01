import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/compartilhado/admin/admin.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarUsuarioComponent } from './pages/login/cadastrar/cadastrarlogin.component';
import { LoginComponent } from './pages/login/login.component';
import { MinhasComponent } from './pages/minhas-solicitacoes/minhas.component';
import { UsuarioAutenticadoAdminGuard } from './services/guards/usuario-autenticado-admin.guard';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard]},
  { path: 'cadastrarUsuario', component: CadastrarUsuarioComponent },
  {
    path: '', component: PrincipalComponent, canActivate: [UsuarioAutenticadoGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'minhasSolicitacoes', component: MinhasComponent },

    ],
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [UsuarioAutenticadoAdminGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'minhasSolicitacoes', component: MinhasComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
