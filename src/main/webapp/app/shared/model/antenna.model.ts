export interface IAntenna {
  id?: number;
  nome?: string;
  inUse?: boolean;
}

export class Antenna implements IAntenna {
  constructor(public id?: number, public nome?: string, public inUse?: boolean) {
    this.inUse = this.inUse || false;
  }
}
