import { Component, Prop, Listen, State, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'date-range-picker-popup',
  styleUrl: 'popup.css',
  shadow: true
})
export class DateRangePickerPopup {
  @Prop() calendarStart?: string;
  @Prop() initialStartDate?: string;
  @Prop() initialEndDate?: string;
  @Prop() startOnSundays?: boolean = false;
  @Prop() hideOutsiders?: boolean = true;
  @Prop() disablePast?: boolean = true;
  @Prop() numberOfCalendars: number = 2;

  @State() activeMonth: Date;
  @State() startDate: Date;
  @State() endDate: Date;
  @State() maybeStartDate: Date;
  @State() maybeEndDate: Date;

  @Event() input: EventEmitter;
  @Event() startDateSet: EventEmitter;
  @Event() endDateSet: EventEmitter;

  componentWillLoad () {
    this.updateActiveMonth();
    this.updateSelectedRange();
  }

  componentWillUpdate () {
    // this.updateActiveMonth();
    // this.updateSelectedRange();
  }

  private updateActiveMonth (): void {
    let activeMonth: Date;

    if (this.calendarStart) {
      activeMonth = new Date(this.calendarStart);
    } else if (this.initialStartDate) {
      activeMonth = new Date(this.initialStartDate);
    } else {
      activeMonth = new Date();
    }

    activeMonth.setDate(1);

    this.activeMonth = activeMonth;
  }

  private updateSelectedRange (): void {
    if (this.initialStartDate) {
      this.startDate = new Date(this.initialStartDate);
    }

    if (this.initialEndDate) {
      this.endDate = new Date(this.initialEndDate);
    }
  }

  @Listen('previousMonth')
  previousMonthHandler (): void {
    this.moveMonth(false);
  }

  @Listen('nextMonth')
  nextMonthHandler (): void {
    this.moveMonth(true);
  }

  @Listen('clickDate')
  clickDateHandler (event: CustomEvent): void {
    if (this.isRangePartiallySet() && this.isRangeAllowed(event.detail)) {
      this.endDate = event.detail;
      this.maybeEndDate = null;

      this.endDateSet.emit(this.endDate);
    } else {
      this.startDate = event.detail;
      this.endDate = null;

      this.startDateSet.emit(this.startDate);
    }

    if (this.isRangeSet()) {
      this.input.emit({
        startDate: this.startDate,
        endDate: this.endDate
      });
    }
  }

  @Listen('mouseOverDate')
  mouseOverDateHandler (event: CustomEvent): void {
    if (this.isRangePartiallySet()) {
      this.maybeEndDate = event.detail
    }
    
    if (this.isRangePartiallySet() && event.detail < this.startDate) {
      this.maybeStartDate = event.detail;
    }

    if (! this.isRangePartiallySet()) {
      this.maybeStartDate = event.detail;
    }
  }

  @Listen('mouseLeaveDate')
  mouseLeaveDateHandler (): void {
    if (this.isRangePartiallySet()) {
      this.maybeEndDate = null;
    }

    this.maybeStartDate = null;
  }

  @Watch('startDate')
  startDateChangedHandler (): void {
    this.maybeStartDate = null;
  }

  @Watch('endDate')
  endDateChangedHandler () {
    this.maybeStartDate = null;
  }

  private isRangeSet (): boolean {
    return this.startDate !== null && this.endDate !== null;
  }

  private isRangePartiallySet (): boolean {
    return this.startDate !== null && this.endDate === null;
  }

  private isRangeAllowed (date: Date): boolean {
    return date > this.startDate
  }

  private moveMonth (forward: boolean = true): void {
    const newMonth: Date = new Date(+this.activeMonth);
    const increment: number = forward ? 1 : -1;

    newMonth.setMonth(newMonth.getMonth() + increment);

    this.activeMonth = newMonth;
  }

  private getMonthYearAsString (date: Date): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
  }

  private makeCalendars () {
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
