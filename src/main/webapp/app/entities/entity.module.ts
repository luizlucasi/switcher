import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'radio',
        loadChildren: () => import('./radio/radio.module').then(m => m.SwitcherRadioModule)
      },
      {
        path: 'command',
        loadChildren: () => import('./command/command.module').then(m => m.SwitcherCommandModule)
      },
      {
        path: 'band',
        loadChildren: () => import('./band/band.module').then(m => m.SwitcherBandModule)
      },
      {
        path: 'antenna',
        loadChildren: () => import('./antenna/antenna.module').then(m => m.SwitcherAntennaModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SwitcherEntityModule {}
