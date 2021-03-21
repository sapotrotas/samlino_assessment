import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Providers
import { GuardProvider } from './providers/guard.provider';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [GuardProvider],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [GuardProvider],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [GuardProvider],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
