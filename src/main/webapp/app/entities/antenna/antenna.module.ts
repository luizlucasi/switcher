import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwitcherSharedModule } from 'app/shared/shared.module';
import { AntennaComponent } from './antenna.component';
import { AntennaDetailComponent } from './antenna-detail.component';
import { AntennaUpdateComponent } from './antenna-update.component';
import { AntennaDeleteDialogComponent } from './antenna-delete-dialog.component';
import { antennaRoute } from './antenna.route';

@NgModule({
  imports: [SwitcherSharedModule, RouterModule.forChild(antennaRoute)],
  declarations: [AntennaComponent, AntennaDetailComponent, AntennaUpdateComponent, AntennaDeleteDialogComponent],
  entryComponents: [AntennaDeleteDialogComponent]
})
export class SwitcherAntennaModule {}
