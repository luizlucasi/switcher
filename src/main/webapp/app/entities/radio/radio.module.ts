import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwitcherSharedModule } from 'app/shared/shared.module';
import { RadioComponent } from './radio.component';
import { RadioDetailComponent } from './radio-detail.component';
import { RadioUpdateComponent } from './radio-update.component';
import { RadioDeleteDialogComponent } from './radio-delete-dialog.component';
import { radioRoute } from './radio.route';

@NgModule({
  imports: [SwitcherSharedModule, RouterModule.forChild(radioRoute)],
  declarations: [RadioComponent, RadioDetailComponent, RadioUpdateComponent, RadioDeleteDialogComponent],
  entryComponents: [RadioDeleteDialogComponent]
})
export class SwitcherRadioModule {}
