import { Component, Prop } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'month-calendar',
  styleUrl: 'month-calendar.css',
  shadow: true
})
export class MonthCalendar {
  @Prop() startDate: Date;
  @Prop() endDate: Date;
  @Prop() startOnSundays: Boolean;

  private weekdays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  render() {
    return this.renderMarkupForCalendar()
  }

  renderMarkupForCalendar () {
    const cal = this.renderCalendarBlock();

    return (
      <div class='datepicker-container'>
          {this.getWeekdayHeaders()}
          {
            cal.map((week: Date[]) => {
              return (
                <div class="row">
                  {
                    week.map((day: Date) => {
                      return (
                        <div class="column">{day.getDate()}</div>
                      );
                    })
                  }
                </div>
              )
            })
          }
      </div>
    );
  }

  getWeekdayHeaders () {
    return (
      <div class="row">
      {
        this.weekdays.map((day) => {
          return (
            <div class="column">{day.substr(0, 3)}</div>
          )
        })
      }
      </div>
    )
  }

  addOneDay (date: Date): Date {
    const unix = date.getTime();

    const newSeconds = unix + (60 * 60 * 24 * 1000);

    return new Date(newSeconds);
  }

  getStartOfMonth (): Date {
    const now = new Date();

    now.setDate(1);

    // Go back to the previous Monday.
    const currentDay = now.getDay();
    const distance = 1 - currentDay;

    now.setDate(now.getDate() + distance);

    return now;
  }

  renderCalendarBlock () {
    const daysInBlock = 42;
    let currentDate = this.getStartOfMonth()
    let calendar = [];

    for (let i = 0, col = 0, row = 0; i < daysInBlock; i++, col++, currentDate = this.addOneDay(currentDate)) {
      if (i > 0 && col % 7 === 0) {
          col = 0;
          row++;
      }

      if (calendar[row] === undefined) {
        calendar[row] = [];
      }

      calendar[row][col] = Object.assign(currentDate);
    }

    return calendar;
  }
}
