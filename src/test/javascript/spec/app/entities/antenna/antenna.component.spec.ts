import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SwitcherTestModule } from '../../../test.module';
import { AntennaComponent } from 'app/entities/antenna/antenna.component';
import { AntennaService } from 'app/entities/antenna/antenna.service';
import { Antenna } from 'app/shared/model/antenna.model';

describe('Component Tests', () => {
  describe('Antenna Management Component', () => {
    let comp: AntennaComponent;
    let fixture: ComponentFixture<AntennaComponent>;
    let service: AntennaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SwitcherTestModule],
        declarations: [AntennaComponent]
      })
        .overrideTemplate(AntennaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AntennaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AntennaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Antenna(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.antennas && comp.antennas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
