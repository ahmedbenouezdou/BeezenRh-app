import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {DayManagement} from './dayManagement';
import { MyActivity, MonthConfig, Events, Action, StructureCss} from './my-activity';

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.css']
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
  constructor(private dayManagement: DayManagement, private calendar: NgbCalendar) {

    this.monthevents.events = [{
        title: 'Event 1',
        color: 'red',
        startsAt:  moment(new Date(), "DD/MM/YYYY"),
        endsAt: this.now,
        etat: 1
      },{
        title: 'Event 1',
        color: 'red',
        startsAt:  moment(new Date("08/06/2018"), "DD/MM/YYYY"),
        endsAt: this.now,
        etat: 0
      }];
  }

  ngOnInit() {
    this.month = new Date().getUTCMonth();
    this.years = new Date().getUTCFullYear();
    this.calendarMonth = [];
    this.monthDay.dayTitre = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    this.monthYears = moment(new Date(), 'YYYY MMM', 'fr').format('MMMM YYYY');
    this.initMonth(new Date());
  }


  initMonth(date: Date): void {

    let nbDayMonth = this.dayManagement.workingDayWorked(moment(date, 'YYYY MMM', 'fr').month(), false);

    let Base = new Date(moment(date, 'YYYY MMM', 'fr').year(), moment(date, 'YYYY MMM', 'fr').month(), 1);

    let weekDay = [];
    for (let i = 0; i < nbDayMonth; i++) {

        let dateEvent = new Date(new Date(Base).setDate(Base.getDate() + i));
        if (dateEvent.getDay() === 1) {
            weekDay = [];
        }

        let infoActivite = this.colorCssFunc(dateEvent.getDay(), dateEvent.getDate());

        weekDay.push({
            date: dateEvent,
            nbjour: dateEvent.getDay(),
            day: i + 1,
            classCss: infoActivite.css,
            title: infoActivite.title,
            indexOrg: infoActivite.index
        });


        if (dateEvent.getDay() === 0) {
            let weekDayLength = weekDay.length;
            if (weekDay.length != 7) {
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

 colorCssFunc(nbjour: number, indexJour:number): StructureCss {
    let active = {css: "weekEnd", title: '', index: 0};

    switch (nbjour) {
        case 0:
        case 6:
            return  active;
        default :
             active.css= "noactivitie"
             active.title='';
             active.index = 0;

            this.monthevents.events.some(function (element, index) {
                    if ((new Date(element.startsAt).getDate() == indexJour)) {
                        switch (element.etat) {
                            case 0:
                                active.css= "leave";
                                active.title=element.title;
                                active.index = index;
                                break;
                            case 1:
                                active.css= "activitie";
                                active.title=element.title;
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
  this.monthYears = moment(new Date(this.years, this.month, 1), 'YYYY MMM', 'fr').format("MMMM YYYY");

  this.calendarMonth = [];
  this.initMonth(new Date(this.years, this.month, 1));
}

nextMonth(): void {

  this.month = this.month + 1;
  this.monthYears = moment(new Date(this.years, this.month, 1), 'YYYY MMM', 'fr').format("MMMM YYYY");
  this.calendarMonth = [];
  console.log(new Date(this.years, this.month, 1));
  this.initMonth(new Date(this.years, this.month, 1));

}

selectToday() {
    console.log(this.activity);
  }
}
