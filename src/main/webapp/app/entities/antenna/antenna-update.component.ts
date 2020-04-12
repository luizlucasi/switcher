import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAntenna, Antenna } from 'app/shared/model/antenna.model';
import { AntennaService } from './antenna.service';
import { IBand } from 'app/shared/model/band.model';
import { BandService } from 'app/entities/band/band.service';

@Component({
  selector: 'jhi-antenna-update',
  templateUrl: './antenna-update.component.html'
})
export class AntennaUpdateComponent implements OnInit {
  isSaving = false;
  bands: IBand[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    inUse: [],
    bandMeter: [],
    band: []
  });

  constructor(
    protected antennaService: AntennaService,
    protected bandService: BandService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ antenna }) => {
      this.updateForm(antenna);

      this.bandService.query().subscribe((res: HttpResponse<IBand[]>) => (this.bands = res.body || []));
    });
  }

  updateForm(antenna: IAntenna): void {
    this.editForm.patchValue({
      id: antenna.id,
      nome: antenna.nome,
      inUse: antenna.inUse,
      bandMeter: antenna.bandMeter,
      band: antenna.band
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const antenna = this.createFromForm();
    if (antenna.id !== undefined) {
      this.subscribeToSaveResponse(this.antennaService.update(antenna));
    } else {
      this.subscribeToSaveResponse(this.antennaService.create(antenna));
    }
  }

  private createFromForm(): IAntenna {
    return {
      ...new Antenna(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      inUse: this.editForm.get(['inUse'])!.value,
      bandMeter: this.editForm.get(['bandMeter'])!.value,
      band: this.editForm.get(['band'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAntenna>>): void {
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

  trackById(index: number, item: IBand): any {
    return item.id;
  }
}
