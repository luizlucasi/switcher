import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAntenna } from 'app/shared/model/antenna.model';
import { AntennaService } from './antenna.service';

@Component({
  templateUrl: './antenna-delete-dialog.component.html'
})
export class AntennaDeleteDialogComponent {
  antenna?: IAntenna;

  constructor(protected antennaService: AntennaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.antennaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('antennaListModification');
      this.activeModal.close();
    });
  }
}
