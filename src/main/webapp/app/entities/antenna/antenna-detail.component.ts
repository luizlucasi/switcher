import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAntenna } from 'app/shared/model/antenna.model';

@Component({
  selector: 'jhi-antenna-detail',
  templateUrl: './antenna-detail.component.html'
})
export class AntennaDetailComponent implements OnInit {
  antenna: IAntenna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ antenna }) => (this.antenna = antenna));
  }

  previousState(): void {
    window.history.back();
  }
}
