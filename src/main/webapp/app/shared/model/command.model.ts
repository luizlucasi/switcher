import { IRadio } from 'app/shared/model/radio.model';
import { IBand } from 'app/shared/model/band.model';

export interface ICommand {
  id?: number;
  nome?: string;
  inUse?: boolean;
  radio?: IRadio;
  bands?: IBand[];
}

export class Command implements ICommand {
  constructor(public id?: number, public nome?: string, public inUse?: boolean, public radio?: IRadio, public bands?: IBand[]) {
    this.inUse = this.inUse || false;
  }
}
