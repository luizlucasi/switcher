import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAntenna } from 'app/shared/model/antenna.model';

type EntityResponseType = HttpResponse<IAntenna>;
type EntityArrayResponseType = HttpResponse<IAntenna[]>;

@Injectable({ providedIn: 'root' })
export class AntennaService {
  public resourceUrl = SERVER_API_URL + 'api/antennas';

  constructor(protected http: HttpClient) {}

  create(antenna: IAntenna): Observable<EntityResponseType> {
    return this.http.post<IAntenna>(this.resourceUrl, antenna, { observe: 'response' });
  }

  update(antenna: IAntenna): Observable<EntityResponseType> {
    return this.http.put<IAntenna>(this.resourceUrl, antenna, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAntenna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAntenna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
