import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {DayManagement} from './dayManagement';
import { MyActivity, MonthConfig, Events, Action, StructureCss} from './my-activity';

import { first } from 'rxjs/operators';
import { MyActivityService } from './my-activity.service'
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.scss']
})


export class MyActivityComponent implements OnInit {
   activity = new MyActivity();
   monthDay = new  MonthConfig();
   daysTitle: string[];
   days: string[];
   monthYears: string;
   calendarMonth: any[];
   years: number;
   date: {year: number, month: number};
   event: Events[];
   monthevents = new Action();
   model = new Events();
   now = moment().format('LLLL');
   month: number;
   minDate = {year: 2018, month: 8, day: 1};
   maxDate = {};
   configActivity = [
    {titre: 'Choisir activité', code: 0},
    {titre: 'Intitulé de la mission', code: '1'},
    {titre: 'Congés Payés', code: 2},
    {titre: 'Congés Exceptionnels', code: 3},
    {titre: 'Intercontrat', code: 4},
    {titre: 'Autres Absences', code: 5},
    {titre: 'Formation',  code: 6},
    {titre: 'Maladie', code: 7},
    {titre: 'RTT', code: 8},

   ];


   constructor(private dayManagement: DayManagement, private calendar: NgbCalendar,
      private authenticationService: AuthenticationService, private myactivityService:MyActivityService) {

    this.monthevents.events = [{
        title: 'Event 1',
        color: 'red',
        startsAt:  moment(new Date(), 'DD/MM/YYYY'),
        endsAt: this.now,
        etat: 1
      }, {
        title: 'Event 1',
        color: 'red',
        startsAt:  moment(new Date('08/06/2018'), 'DD/MM/YYYY'),
        endsAt: this.now,
        etat: 0
      }];
  }

  ngOnInit() {
      this.activity.activeMiDay =true;
    this.month = new Date().getUTCMonth();
    this.years = new Date().getUTCFullYear();
    this.calendarMonth = [];

    this.myactivityService.getConfigModule()
    .subscribe((data: any) =>   {
        this.monthDay.dayTitre = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    }
);
    this.monthYears = moment(new Date(), 'YYYY MMM', 'fr').format('MMMM YYYY');
    this.initMonth(new Date());
  }


  initMonth(date: Date): void {

    const nbDayMonth = this.dayManagement.workingDayWorked(moment(date, 'YYYY MMM', 'fr').month(), false);

    const Base = new Date(moment(date, 'YYYY MMM', 'fr').year(), moment(date, 'YYYY MMM', 'fr').month(), 1);

    let weekDay = [];
    for (let i = 0; i < nbDayMonth; i++) {

      const dateEvent = new Date(new Date(Base).setDate(Base.getDate() + i));
        if (dateEvent.getDay() === 1) {
            weekDay = [];
        }

        const infoActivite = this.colorCssFunc(dateEvent.getDay(), dateEvent.getDate());

        weekDay.push({
            date: dateEvent,
            nbjour: dateEvent.getDay(),
            day: i + 1,
            classCss: infoActivite.css,
            title: infoActivite.title,
            indexOrg: infoActivite.index
        });


        if (dateEvent.getDay() === 0) {
          const weekDayLength = weekDay.length;
            if (weekDay.length !== 7) {
                for (let iDateWeek = 0; iDateWeek < (7 - weekDayLength); iDateWeek++) {
                    weekDay.splice(iDateWeek, 0, {date: '', nbjour: '', day: '', classCss: 'noactivitie'});
                }
                this.calendarMonth.push(weekDay);
            } else {

                this.calendarMonth.push(weekDay);
            }

        } else if ((i + 1) === nbDayMonth && dateEvent.getDay() !== 0) {
            this.calendarMonth.push(weekDay);
        }
    }
}

 colorCssFunc(nbjour: number, indexJour: number): StructureCss {
  const active = {css: 'weekEnd', title: '', index: 0};

    switch (nbjour) {
        case 0:
        case 6:
            return  active;
        default :
             active.css = 'noactivitie';
             active.title = '';
             active.index = 0;

            this.monthevents.events.some(function (element, index) {
                    if ((new Date(element.startsAt).getDate() === indexJour)) {
                        switch (element.etat) {
                            case 0:
                                active.css = 'leave';
                                active.title = element.title;
                                active.index = index;
                                break;
                            case 1:
                                active.css = 'activitie';
                                active.title = element.title;
                                active.index = index;
                                break;
                        }
                        return true;
                    }
                }
            );
            return active;
    }
}


previousMonth(): void {

  this.month = this.month - 1;
  this.monthYears = moment(new Date(this.years, this.month, 1), 'YYYY MMM', 'fr').format('MMMM YYYY');

  this.calendarMonth = [];
  this.initMonth(new Date(this.years, this.month, 1));
}

nextMonth(): void {

  this.month = this.month + 1;
  this.monthYears = moment(new Date(this.years, this.month, 1), 'YYYY MMM', 'fr').format('MMMM YYYY');
  this.calendarMonth = [];
  console.log(new Date(this.years, this.month, 1));
  this.initMonth(new Date(this.years, this.month, 1));

}


  dateMin():void {
    this.minDate = this.activity.dateDebut;
  }

  dateMax():void {
    const dateDebut = new Date(this.activity.dateDebut.year, (this.activity.dateDebut.month - 1), this.activity.dateDebut.day);
    const dateFin = new Date(this.activity.dateFin.year, (this.activity.dateFin.month - 1), this.activity.dateFin.day);
    const nbJour = this.dayManagement.diffdate(dateDebut, dateFin, 'd' );
    this.activity.activeMiDay = !(nbJour===0);
    for ( let i = 0; i <= nbJour; i++) {
      const startsAt = moment(new Date(this.activity.dateDebut.year, (this.activity.dateDebut.month - 1), this.activity.dateDebut.day+i), 'DD/MM/YYYY');
      const endsAt= moment(new Date(this.activity.dateDebut.year, (this.activity.dateDebut.month - 1), this.activity.dateDebut.day+i), 'DD/MM/YYYY');

      this.monthevents.events.push({
        title: 'Event 1',
        color: 'red',
        startsAt: startsAt,
        endsAt: endsAt,
        etat: 0
      });
    }
    this.calendarMonth = [];
    this.initMonth(new Date());
    this.maxDate = this.activity.dateFin;

  }

  selectToday() {

  }

}
