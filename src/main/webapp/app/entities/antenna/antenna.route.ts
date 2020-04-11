import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAntenna, Antenna } from 'app/shared/model/antenna.model';
import { AntennaService } from './antenna.service';
import { AntennaComponent } from './antenna.component';
import { AntennaDetailComponent } from './antenna-detail.component';
import { AntennaUpdateComponent } from './antenna-update.component';

@Injectable({ providedIn: 'root' })
export class AntennaResolve implements Resolve<IAntenna> {
  constructor(private service: AntennaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAntenna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((antenna: HttpResponse<Antenna>) => {
          if (antenna.body) {
            return of(antenna.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Antenna());
  }
}

export const antennaRoute: Routes = [
  {
    path: '',
    component: AntennaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Antennas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AntennaDetailComponent,
    resolve: {
      antenna: AntennaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Antennas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AntennaUpdateComponent,
    resolve: {
      antenna: AntennaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Antennas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AntennaUpdateComponent,
    resolve: {
      antenna: AntennaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Antennas'
    },
    canActivate: [UserRouteAccessService]
  }
];
