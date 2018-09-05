export class MyActivity {
    titre?: string;
    code?:number;
    dateDebut?: {year: number; month: number; day: number};
    dateFin?: {year: number; month: number; day: number};
}

export class MonthConfig {
    dayTitre?: string[];
    day: {};
}

export class Events {
    title: string;
    color: string;
    startsAt: any;
    endsAt: any;
    etat: number;
  }


  export class Action {
    events: Events[];
  }

  export class StructureCss {
    css: string;
     title: string;
     index: number;
  }

