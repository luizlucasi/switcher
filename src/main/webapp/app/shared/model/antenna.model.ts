import { IBand } from 'app/shared/model/band.model';
import { BandMeter } from 'app/shared/model/enumerations/band-meter.model';

export interface IAntenna {
  id?: number;
  nome?: string;
  inUse?: boolean;
  bandMeter?: BandMeter;
  band?: IBand;
}

export class Antenna implements IAntenna {
  constructor(public id?: number, public nome?: string, public inUse?: boolean, public bandMeter?: BandMeter, public band?: IBand) {
    this.inUse = this.inUse || false;
  }
}
