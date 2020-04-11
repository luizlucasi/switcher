import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SwitcherTestModule } from '../../../test.module';
import { AntennaDetailComponent } from 'app/entities/antenna/antenna-detail.component';
import { Antenna } from 'app/shared/model/antenna.model';

describe('Component Tests', () => {
  describe('Antenna Management Detail Component', () => {
    let comp: AntennaDetailComponent;
    let fixture: ComponentFixture<AntennaDetailComponent>;
    const route = ({ data: of({ antenna: new Antenna(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SwitcherTestModule],
        declarations: [AntennaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AntennaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AntennaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load antenna on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.antenna).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
