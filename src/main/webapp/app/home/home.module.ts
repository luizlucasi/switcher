import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwitcherSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [SwitcherSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class SwitcherHomeModule {}
