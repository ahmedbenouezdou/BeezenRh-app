export class MyActivity {
    titre?:string;
    dateDebut?:Date;
    dateFin?:Date;
}

export class MonthConfig{
    dayTitre?: string[];
    day: {};
}

export class Events{
    title: string;
    color: string;
    startsAt: any;
    endsAt: any;
    etat: number;
  }
  
  
  export class Action{
    events: Events[];
  }
  
  export class StructureCss{
    css: string;
     title: string;
     index: number;
  }
  
  