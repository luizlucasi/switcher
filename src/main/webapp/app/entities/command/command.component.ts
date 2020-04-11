import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICommand } from 'app/shared/model/command.model';
import { CommandService } from './command.service';
import { CommandDeleteDialogComponent } from './command-delete-dialog.component';

@Component({
  selector: 'jhi-command',
  templateUrl: './command.component.html'
})
export class CommandComponent implements OnInit, OnDestroy {
  commands?: ICommand[];
  eventSubscriber?: Subscription;

  constructor(protected commandService: CommandService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.commandService.query().subscribe((res: HttpResponse<ICommand[]>) => (this.commands = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCommands();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICommand): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCommands(): void {
    this.eventSubscriber = this.eventManager.subscribe('commandListModification', () => this.loadAll());
  }

  delete(command: ICommand): void {
    const modalRef = this.modalService.open(CommandDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.command = command;
  }
}
