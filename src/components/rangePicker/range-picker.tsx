import { Component, Prop, Listen, State } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'range-picker',
  styleUrl: 'range-picker.css',
  shadow: true
})
export class RangePicker {
  @Prop() calendarStart: string;
  @Prop() selectedStartDate: string;
  @Prop() selectedEndDate: string;
  @Prop() startOnSundays: boolean;
  @Prop() hideOutsiders: boolean;
  @Prop() numberOfCalendars: number = 2;

  @State() activeMonth: Date;

  constructor () {
    let activeMonth;

    if (this.calendarStart) {
      activeMonth = new Date(this.calendarStart);
    } else if (this.selectedStartDate) {
      activeMonth = new Date(this.selectedStartDate);
    } else {
      activeMonth = new Date();
    }

    activeMonth.setDate(1);

    this.activeMonth = activeMonth;
  }

  @Listen('previousMonth')
  previousMonthHandler () {
    // Decrement the first and last active month.
    this.moveMonth(false);
  }

  @Listen('nextMonth')
  nextMonthHandler () {
    // Increment the first and last active month.
    this.moveMonth(true);
  }

  moveMonth (forward: boolean = true) {
    const newMonth = new Date(+this.activeMonth);
    const increment = forward ? 1 : -1;

    newMonth.setMonth(newMonth.getMonth() + increment);

    this.activeMonth = newMonth;
  }

  getMonthYearAsString (date: Date): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
  }

  makeCalendars () {
    let html = [];

    for (let i = 0; i < this.numberOfCalendars; i++) {
      let activeMonth = new Date(+this.activeMonth)
      activeMonth.setMonth(activeMonth.getMonth() + i);

      const activeMonthStr = this.getMonthYearAsString(activeMonth);

      html.push(
        <month-calendar
          activeMonth={activeMonthStr}
          startDate={this.selectedStartDate}
          endDate={this.selectedEndDate}
          hideOutsiders={this.hideOutsiders}
          startOnSundays={this.startOnSundays}>
        </month-calendar>
      )
    }

    return html;
  }

  render () {
    return (
        <div class="range-picker">
          <range-navigation></range-navigation>
          {this.makeCalendars()}
        </div>
    );
  }
}
