
import { Injectable } from '@angular/core';

import { IDayManagement } from './IDayManagement';

@Injectable({ providedIn: 'root' })
export  class DayManagement implements IDayManagement {

   constructor () {}
/**
 *
 * @param month
 * @param ouver
 */
 workingDayWorked(month: any , ouver: any): any {
    const d = new Date();

    d.setUTCMonth(month);

    const nbDay = this.getNumberOfDaysMonth(d);
    let dayMonth = 0;
    if (ouver) {
        for (let i = 0; i < nbDay; i++) {
          const dateEvent = new Date(new Date().setDate(new Date().getDate() + i));

            if (dateEvent.getDay() !== 0 && dateEvent.getDay() !== 6) {
                dayMonth++;
            }

        }
        return dayMonth;
    } else {
        return nbDay;
    }

  }

/**
 *
 * @param date
 */
   getNumberOfDaysMonth(date: any): any {
     return new Date(date.getFullYear(), date.getMonth() + 1, -1).getDate() + 1;
}

/**
*
* @param d1
* @param d2
* @param u
* @returns {BigNumber|number}
*/
 diffdate(d1, d2, u): number {
  let div = 1;
  switch (u) {
      case 's':
          div = 1000;
          break;
      case 'm':
          div = 1000 * 60;
          break;
      case 'h':
          div = 1000 * 60 * 60;
          break;
      case 'd':
          div = 1000 * 60 * 60 * 24;
          break;
  }

  const Diff = d2.getTime() - d1.getTime();
  return Math.ceil((Diff / div));
}
}
