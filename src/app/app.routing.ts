import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {VideoNewComponent} from './components/video-new/video-new.component';
import {VideoEditComponent} from './components/video-edit/video-edit.component';
import {VideoDetailComponent} from './components/video-detail/video-detail.component';

import {ErrorComponent} from './components/error/error.component';

import {IdentityGuard} from './Services/identity.guard';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'inicio/:page', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'perfil', component: UserEditComponent, canActivate:[IdentityGuard]},
  {path: 'guardar-video', component: VideoNewComponent, canActivate:[IdentityGuard]},
  {path: 'editar-video/:id', component: VideoEditComponent, canActivate:[IdentityGuard]},
  {path: 'video/:id', component: VideoDetailComponent, canActivate:[IdentityGuard]},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent},
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
