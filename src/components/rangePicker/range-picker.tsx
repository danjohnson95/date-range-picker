import { Component, Prop, Listen, State } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'range-picker',
  styleUrl: 'range-picker.css',
  shadow: true
})
export class RangePicker {
  @Prop() calendarStart: string;
  @Prop() initialStartDate?: string;
  @Prop() initialEndDate?: string;
  @Prop() startOnSundays: boolean;
  @Prop() hideOutsiders: boolean;
  @Prop() numberOfCalendars: number = 2;

  @State() activeMonth: Date;
  @State() startDate: Date;
  @State() endDate: Date;

  constructor () {
    let activeMonth;

    if (this.calendarStart) {
      activeMonth = new Date(this.calendarStart);
    } else if (this.initialStartDate) {
      activeMonth = new Date(this.initialStartDate);
    } else {
      activeMonth = new Date();
    }

    activeMonth.setDate(1);

    this.activeMonth = activeMonth;

    if (this.initialStartDate) {
      this.startDate = new Date(this.initialStartDate);
    }

    if (this.initialEndDate) {
      this.endDate = new Date(this.initialEndDate);
    }
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

  @Listen('clickDate')
  clickDateHandler (event: CustomEvent) {
    if (this.rangePartiallySet() && this.rangeIsAllowed(event.detail)) {
      this.endDate = event.detail;
    } else {
      this.startDate = event.detail;
      this.endDate = null;
    }
  }

  @Listen('mouseOverDate')
  mouseOverDateHandler () {

  }

  @Listen('mouseLeaveDate')
  mouseLeaveDateHandler () {

  }

  rangePartiallySet () {
    return this.startDate && ! this.endDate;
  }

  rangeIsAllowed (date: Date): boolean {
    return date > this.startDate
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
          startDate={this.startDate ? this.startDate.toString() : null}
          endDate={this.endDate ? this.endDate.toString() : null}
          hideOutsiders={this.hideOutsiders}
          startOnSundays={this.startOnSundays}>
        </month-calendar>
      )
    }

    return html;
  }

  render () {
    return (
      <div class="outer-range-picker">
        <div class="range-picker">
          <range-navigation></range-navigation>
          {this.makeCalendars()}
        </div>
      </div>
    );
  }
}
