import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBand, Band } from 'app/shared/model/band.model';
import { BandService } from './band.service';
import { IAntenna } from 'app/shared/model/antenna.model';
import { AntennaService } from 'app/entities/antenna/antenna.service';

@Component({
  selector: 'jhi-band-update',
  templateUrl: './band-update.component.html'
})
export class BandUpdateComponent implements OnInit {
  isSaving = false;
  antennas: IAntenna[] = [];

  editForm = this.fb.group({
    id: [],
    bandMeter: [],
    inUse: [],
    antenna: []
  });

  constructor(
    protected bandService: BandService,
    protected antennaService: AntennaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ band }) => {
      this.updateForm(band);

      this.antennaService.query().subscribe((res: HttpResponse<IAntenna[]>) => (this.antennas = res.body || []));
    });
  }

  updateForm(band: IBand): void {
    this.editForm.patchValue({
      id: band.id,
      bandMeter: band.bandMeter,
      inUse: band.inUse,
      antenna: band.antenna
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const band = this.createFromForm();
    if (band.id !== undefined) {
      this.subscribeToSaveResponse(this.bandService.update(band));
    } else {
      this.subscribeToSaveResponse(this.bandService.create(band));
    }
  }

  private createFromForm(): IBand {
    return {
      ...new Band(),
      id: this.editForm.get(['id'])!.value,
      bandMeter: this.editForm.get(['bandMeter'])!.value,
      inUse: this.editForm.get(['inUse'])!.value,
      antenna: this.editForm.get(['antenna'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBand>>): void {
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

  trackById(index: number, item: IAntenna): any {
    return item.id;
  }
}
