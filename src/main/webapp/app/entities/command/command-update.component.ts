import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICommand, Command } from 'app/shared/model/command.model';
import { CommandService } from './command.service';
import { IRadio } from 'app/shared/model/radio.model';
import { RadioService } from 'app/entities/radio/radio.service';
import { IBand } from 'app/shared/model/band.model';
import { BandService } from 'app/entities/band/band.service';

type SelectableEntity = IRadio | IBand;

@Component({
  selector: 'jhi-command-update',
  templateUrl: './command-update.component.html'
})
export class CommandUpdateComponent implements OnInit {
  isSaving = false;
  radios: IRadio[] = [];
  bands: IBand[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    inUse: [],
    radio: [],
    bands: []
  });

  constructor(
    protected commandService: CommandService,
    protected radioService: RadioService,
    protected bandService: BandService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ command }) => {
      this.updateForm(command);

      this.radioService
        .query({ filter: 'command-is-null' })
        .pipe(
          map((res: HttpResponse<IRadio[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRadio[]) => {
          if (!command.radio || !command.radio.id) {
            this.radios = resBody;
          } else {
            this.radioService
              .find(command.radio.id)
              .pipe(
                map((subRes: HttpResponse<IRadio>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRadio[]) => (this.radios = concatRes));
          }
        });

      this.bandService.query().subscribe((res: HttpResponse<IBand[]>) => (this.bands = res.body || []));
    });
  }

  updateForm(command: ICommand): void {
    this.editForm.patchValue({
      id: command.id,
      nome: command.nome,
      inUse: command.inUse,
      radio: command.radio,
      bands: command.bands
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const command = this.createFromForm();
    if (command.id !== undefined) {
      this.subscribeToSaveResponse(this.commandService.update(command));
    } else {
      this.subscribeToSaveResponse(this.commandService.create(command));
    }
  }

  private createFromForm(): ICommand {
    return {
      ...new Command(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      inUse: this.editForm.get(['inUse'])!.value,
      radio: this.editForm.get(['radio'])!.value,
      bands: this.editForm.get(['bands'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommand>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IBand[], option: IBand): IBand {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
