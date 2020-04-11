import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SwitcherSharedModule } from 'app/shared/shared.module';
import { SwitcherCoreModule } from 'app/core/core.module';
import { SwitcherAppRoutingModule } from './app-routing.module';
import { SwitcherHomeModule } from './home/home.module';
import { SwitcherEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    SwitcherSharedModule,
    SwitcherCoreModule,
    SwitcherHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SwitcherEntityModule,
    SwitcherAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class SwitcherAppModule {}
