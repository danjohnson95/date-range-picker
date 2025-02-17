import { Component, Prop } from '@stencil/core';
import weekdays from '../../lang/weekdays.json';
import months from '../../lang/months.json';

@Component({
  tag: 'month-calendar',
  styleUrl: 'month-calendar.css',
  shadow: true
})
export class MonthCalendar {
  @Prop() startDate?: Date;
  @Prop() endDate?: Date;
  @Prop() maybeEndDate?: Date;
  @Prop() disablePast: boolean;
  @Prop() startOnSundays: boolean;
  @Prop() hideOutsiders: boolean;
  @Prop() activeMonth: string;
  @Prop() maybeStartDate: Date;

  private weekdaysOrdered: string[];

  componentWillLoad () {
    this.updateWeekdayOrder();
  }

  componentWillUpdate () {
    this.updateWeekdayOrder();
  }

  updateWeekdayOrder () {
    this.weekdaysOrdered = weekdays.slice();

    if (! this.startOnSundays) {
      this.weekdaysOrdered.push(this.weekdaysOrdered.shift());
    }
  }

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
        this.weekdaysOrdered.map((day) => {
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

    return day.getTime() === this.startDate.getTime() || (this.endDate && day.getTime() === this.endDate.getTime());
  }

  isSelectedBetweenRange (day: Date): boolean {
    if (! this.startDate || this.isSelectedEndOfRange(day)) {
      return false;
    }

    return day > this.startDate && day < this.endDate
  }

  isMaybeRange (day: Date): boolean {
    if (this.startDate && this.maybeEndDate) {
      return day > this.startDate && day <= this.maybeEndDate;
    }

    return false;
  }

  isMaybeStart (day: Date): boolean {
    if (! this.maybeStartDate) {
      return false;
    }

    return this.maybeStartDate.getTime() === day.getTime();
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

    return months[active.getMonth()] + " " + active.getFullYear();
  }

  getStartOfMonth (): Date {
    const now = this.getActiveMonth()

    // Go back to the previous Monday, or Sunday if mode enabled.
    const weekStart = (this.startOnSundays ? 0 : 1);
    let currentDay = now.getDay();

    // If month starts on Sunday we need to treat currentDay as the last day of the week.
    if (currentDay === 0 && weekStart === 1) {
      currentDay = 7;
    }

    const distance = weekStart - currentDay;

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
