export class MyActivity {
    titre?: string;
    code?: number;
    dateDebut?: {year: number; month: number; day: number};
    dateFin?: {year: number; month: number; day: number};
    activeMiDay? : boolean;
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
    date: {year: number, month: number};
    daysTitle: string[];
    days: string[];
    monthYears: string;
    calendarMonth: any[];
    years: number;
    month: number;
  }

  export class StructureCss {
    css: string;
     title: string;
     index: number;
  }

