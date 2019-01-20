import { Component, Prop } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'month-calendar',
  styleUrl: 'month-calendar.css',
  shadow: true
})
export class MonthCalendar {
  @Prop() startDate?: string;
  @Prop() endDate?: string;
  @Prop() maybeEndDate?: string;
  @Prop() disablePast: boolean;
  @Prop() startOnSundays: boolean;
  @Prop() hideOutsiders: boolean;
  @Prop() activeMonth: string;
  @Prop() maybeStartDate: string;

  private weekdays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  private months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  render() {
    return this.renderMarkupForCalendar()
  }

  rangePartiallySet () {
    return this.startDate && ! this.endDate;
  }

  renderMarkupForCalendar () {
    const cal = this.renderCalendarBlock();

    return (
      <div class='datepicker-container'>
        <div class="month-header">
          {this.getMonthHeader()}
        </div>

          {this.getWeekdayHeaders()}
          {
            cal.map((week: Date[]) => {
              return (
                <div class="row">
                {
                    week.map((day: Date) => {
                      return this.renderCalendarDayBlock(day)
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
      <div class="row weekday-header">
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

  isOutsideActiveMonth (day: Date): boolean {
    return this.getActiveMonth().getMonth() !== day.getMonth();
  }

  isSelectedEndOfRange (day: Date): boolean {
    if (! this.startDate) {
      return false;
    }

    return day.getTime() === new Date(this.startDate).getTime() || day.getTime() === new Date(this.endDate).getTime();
  }

  isSelectedBetweenRange (day: Date): boolean {
    if (! this.startDate || this.isSelectedEndOfRange(day)) {
      return false;
    }

    const start = new Date(this.startDate)
    const end = new Date(this.endDate)

    return day > start && day < end
  }

  isMaybeRange (day: Date): boolean {
    if (this.startDate && this.maybeEndDate) {
      const start = new Date(this.startDate)
      const end = new Date(this.maybeEndDate)

      return day > start && day <= end;
    }

    return false;
  }

  isMaybeStart (day: Date): boolean {
    if (! this.maybeStartDate) {
      return false;
    }

    const maybeStart = new Date(this.maybeStartDate);

    return maybeStart.getTime() === day.getTime();
  }

  shouldDisable (day: Date) {
    const today = new Date();

    today.setMinutes(0);
    today.setHours(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    return this.disablePast && day < today;
  }

  renderCalendarDayBlock (day: Date) {
    return (
      <day-block
        class="column"
        shouldDisable={this.shouldDisable(day)}
        outsideActiveMonth={this.isOutsideActiveMonth(day)}
        shouldHide={this.hideOutsiders && this.isOutsideActiveMonth(day)}
        isSelectedEndRange={this.isSelectedEndOfRange(day)}
        isSelectedBetweenRange={this.isSelectedBetweenRange(day)}
        isMaybeStart={this.isMaybeStart(day)}
        isMaybeRange={this.isMaybeRange(day)}
        date={day.toString()}>
      </day-block>
    )
  }

  addOneDay (date: Date): Date {
    const unix = date.getTime();

    const newSeconds = unix + (60 * 60 * 24 * 1000);

    return new Date(newSeconds);
  }

  getActiveMonth () {
    return new Date(this.activeMonth + '-01');
  }

  getMonthHeader () {
    const active = this.getActiveMonth();

    return this.months[active.getMonth()] + " " + active.getFullYear();
  }

  getStartOfMonth (): Date {
    const now = this.getActiveMonth()

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
