import { Component, Prop, Listen, State, Watch, Event, EventEmitter } from '@stencil/core';

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
  @Prop() disablePast?: boolean;
  @Prop() numberOfCalendars: number = 2;

  @State() activeMonth: Date;
  @State() startDate: Date;
  @State() endDate: Date;
  @State() maybeStartDate: Date;
  @State() maybeEndDate: Date;

  @Event() input: EventEmitter;

  componentWillLoad () {
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
      this.maybeEndDate = null;
    } else {
      this.startDate = event.detail;
      this.endDate = null;
    }

    if (this.rangeSet()) {
      this.input.emit({
        startDate: this.startDate,
        endDate: this.endDate
      });
    }
  }

  @Listen('mouseOverDate')
  mouseOverDateHandler (event: CustomEvent) {
    if (this.rangePartiallySet()) {
      this.maybeEndDate = event.detail
    }
    
    if (this.rangePartiallySet() && event.detail < this.startDate) {
      this.maybeStartDate = event.detail;
    }

    if (! this.rangePartiallySet()) {
      this.maybeStartDate = event.detail;
    }
  }

  @Listen('mouseLeaveDate')
  mouseLeaveDateHandler () {
    if (this.rangePartiallySet()) {
      this.maybeEndDate = null;
    }

    this.maybeStartDate = null;
  }

  @Watch('startDate')
  startDateChangedHandler () {
    this.maybeStartDate = null;
  }

  @Watch('endDate')
  endDateChangedHandler () {
    this.maybeStartDate = null;
  }

  rangeSet () {
    return this.startDate && this.endDate;
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
          disablePast={this.disablePast}
          activeMonth={activeMonthStr}
          startDate={this.startDate ? this.startDate.toString() : null}
          endDate={this.endDate ? this.endDate.toString() : null}
          maybeStartDate={this.maybeStartDate ? this.maybeStartDate.toString() : null}
          maybeEndDate={this.maybeEndDate ? this.maybeEndDate.toString() : null}
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
