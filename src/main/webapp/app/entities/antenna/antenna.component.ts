import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAntenna } from 'app/shared/model/antenna.model';
import { AntennaService } from './antenna.service';
import { AntennaDeleteDialogComponent } from './antenna-delete-dialog.component';

@Component({
  selector: 'jhi-antenna',
  templateUrl: './antenna.component.html'
})
export class AntennaComponent implements OnInit, OnDestroy {
  antennas?: IAntenna[];
  eventSubscriber?: Subscription;

  constructor(protected antennaService: AntennaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.antennaService.query().subscribe((res: HttpResponse<IAntenna[]>) => (this.antennas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAntennas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAntenna): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAntennas(): void {
    this.eventSubscriber = this.eventManager.subscribe('antennaListModification', () => this.loadAll());
  }

  delete(antenna: IAntenna): void {
    const modalRef = this.modalService.open(AntennaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.antenna = antenna;
  }
}
