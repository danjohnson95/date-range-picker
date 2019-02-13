import { Component, Prop, State, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'date-range-picker',
  styleUrl: 'date-range-picker.css',
  shadow: true
})
export class DateRangePicker {
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

  isOpen: boolean = false;

  @Listen('startDateSet')
  startDateSetHandler (event: CustomEvent) {
    this.startDate = event.detail;
  }

  @Listen('endDateSet')
  endDateSetHandler (event: CustomEvent) {
    this.endDate = event.detail;
  }

  componentWillLoad () {
    this.updateActiveMonth();
    this.updateSelectedRange();
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

  formatDate (date: Date): string {
    return date.getDate() + ' ' + date.getMonth() + 1 + ' ' + date.getFullYear();
  }

  render () {
    return (
      <div class="outer-range-picker">
        <date-range-picker-input-elm
          fromDate={this.startDate}
          toDate={this.endDate}>
        </date-range-picker-input-elm>

        <date-range-picker-popup
            isOpen={this.isOpen}
            hideOutsiders={this.hideOutsiders}
            initialStartDate="2019-01-01T00:00:00"
            initialEndDate="2019-02-13T00:00:00"
            initialActiveMonth={this.activeMonth}
            startOnSundays={this.startOnSundays}
            disablePast={this.disablePast}
            numberOfCalendars={this.numberOfCalendars}>
        </date-range-picker-popup>
      </div>
    );
  }
}
