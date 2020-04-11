import { IAntenna } from 'app/shared/model/antenna.model';
import { ICommand } from 'app/shared/model/command.model';
import { BandMeter } from 'app/shared/model/enumerations/band-meter.model';

export interface IBand {
  id?: number;
  bandMeter?: BandMeter;
  inUse?: boolean;
  antenna?: IAntenna;
  commands?: ICommand[];
}

export class Band implements IBand {
  constructor(
    public id?: number,
    public bandMeter?: BandMeter,
    public inUse?: boolean,
    public antenna?: IAntenna,
    public commands?: ICommand[]
  ) {
    this.inUse = this.inUse || false;
  }
}
