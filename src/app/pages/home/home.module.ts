import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home.router.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
