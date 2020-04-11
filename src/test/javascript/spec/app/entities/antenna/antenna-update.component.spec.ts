import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SwitcherTestModule } from '../../../test.module';
import { AntennaUpdateComponent } from 'app/entities/antenna/antenna-update.component';
import { AntennaService } from 'app/entities/antenna/antenna.service';
import { Antenna } from 'app/shared/model/antenna.model';

describe('Component Tests', () => {
  describe('Antenna Management Update Component', () => {
    let comp: AntennaUpdateComponent;
    let fixture: ComponentFixture<AntennaUpdateComponent>;
    let service: AntennaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SwitcherTestModule],
        declarations: [AntennaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AntennaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AntennaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AntennaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Antenna(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Antenna();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
