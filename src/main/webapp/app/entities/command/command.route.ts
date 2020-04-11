import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICommand, Command } from 'app/shared/model/command.model';
import { CommandService } from './command.service';
import { CommandComponent } from './command.component';
import { CommandDetailComponent } from './command-detail.component';
import { CommandUpdateComponent } from './command-update.component';

@Injectable({ providedIn: 'root' })
export class CommandResolve implements Resolve<ICommand> {
  constructor(private service: CommandService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICommand> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((command: HttpResponse<Command>) => {
          if (command.body) {
            return of(command.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Command());
  }
}

export const commandRoute: Routes = [
  {
    path: '',
    component: CommandComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CommandDetailComponent,
    resolve: {
      command: CommandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CommandUpdateComponent,
    resolve: {
      command: CommandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CommandUpdateComponent,
    resolve: {
      command: CommandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commands'
    },
    canActivate: [UserRouteAccessService]
  }
];
