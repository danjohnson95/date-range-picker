import { Component, Prop } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'range-picker',
  styleUrl: 'range-picker.css',
  shadow: true
})
export class RangePicker {
  @Prop() calendarStart: string;
  @Prop() startDate: string;
  @Prop() endDate: string;
  @Prop() startOnSundays: boolean;
  @Prop() hideOutsiders: boolean;

  firstActiveMonth: string;
  lastActiveMonth: string;

  firstCalendar: HTMLElement

  getActiveMonthForFirstCalendar (): Date {
    if (!this.startDate) {
      this.startDate = new Date().toString();
    }

    const date = new Date(this.startDate);

    date.setDate(1);

    return date;
  }

  getActiveMonthForLastCalendar (): Date {
    const firstCal = this.getActiveMonthForFirstCalendar();

    firstCal.setMonth(firstCal.getMonth() + 1);

    return firstCal;
  }

  getMonthYearAsString (date: Date): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
  }

  render () {
    this.firstActiveMonth = this.getMonthYearAsString(this.getActiveMonthForFirstCalendar());
    this.lastActiveMonth = this.getMonthYearAsString(this.getActiveMonthForLastCalendar());

    return (
        <div class="range-picker">
          <range-navigation></range-navigation>
          <month-calendar
            activeMonth={this.firstActiveMonth}
            startDate={this.startDate}
            endDate={this.endDate}
            hideOutsiders={this.hideOutsiders}
            startOnSundays={this.startOnSundays}>
          </month-calendar>

          <month-calendar
            activeMonth={this.lastActiveMonth}
            startDate={this.startDate}
            endDate={this.endDate}
            hideOutsiders={this.hideOutsiders}
            startOnSundays={this.startOnSundays}>
          </month-calendar>
        </div>
    );
  }
}
