export interface Location {
  location: string;
  bases: Base[];
}

export interface Base {
  base: string;
  units: Unit[];
}

export interface Unit {
  unit: string;
}
