import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SwitcherSharedModule } from 'app/shared/shared.module';
import { CommandComponent } from './command.component';
import { CommandDetailComponent } from './command-detail.component';
import { CommandUpdateComponent } from './command-update.component';
import { CommandDeleteDialogComponent } from './command-delete-dialog.component';
import { commandRoute } from './command.route';

@NgModule({
  imports: [SwitcherSharedModule, RouterModule.forChild(commandRoute)],
  declarations: [CommandComponent, CommandDetailComponent, CommandUpdateComponent, CommandDeleteDialogComponent],
  entryComponents: [CommandDeleteDialogComponent]
})
export class SwitcherCommandModule {}
