import { Component, Prop, Listen, State, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'date-range-picker-popup',
  styleUrl: 'popup.css',
  shadow: true
})
export class DateRangePickerPopup {
  @Prop() isOpen?: boolean
  @Prop() calendarStart?: string;
  @Prop() fromDate?: Date;
  @Prop() toDate?: Date;
  @Prop() startOnSundays?: boolean = false;
  @Prop() hideOutsiders?: boolean = true;
  @Prop() disablePast?: boolean = true;
  @Prop() numberOfCalendars: number;
  @Prop() initialActiveMonth: Date;

  @State() maybeStartDate: Date;
  @State() maybeEndDate: Date;
  @State() activeMonth: Date;

  @Event() input: EventEmitter;
  @Event() startDateSet: EventEmitter;
  @Event() endDateSet: EventEmitter;

  componentWillLoad () {
    this.activeMonth = this.initialActiveMonth;
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
      this.maybeEndDate = null;
      this.endDateSet.emit(event.detail);
    } else {
      this.startDateSet.emit(event.detail);
    }
  }

  @Listen('mouseOverDate')
  mouseOverDateHandler (event: CustomEvent): void {
    if (this.isRangePartiallySet()) {
      this.maybeEndDate = event.detail
    }
    
    if (this.isRangePartiallySet() && event.detail < this.toDate) {
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

  @Watch('fromDate')
  startDateChangedHandler (): void {
    this.maybeStartDate = null;
  }

  @Watch('toDate')
  endDateChangedHandler () {
    this.maybeStartDate = null;
  }

  private isRangePartiallySet (): boolean {
    return this.fromDate !== null && this.toDate === null;
  }

  private isRangeAllowed (date: Date): boolean {
    return date > this.fromDate
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
          startDate={this.fromDate}
          endDate={this.toDate}
          maybeStartDate={this.maybeStartDate}
          maybeEndDate={this.maybeEndDate}
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
