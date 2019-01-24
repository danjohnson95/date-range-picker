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

  formatDate (date: Date): string {
    return date.getDate() + ' ' + date.getMonth() + 1 + ' ' + date.getFullYear();
  }

  render () {
    return (
      <div class="outer-range-picker">
        <date-range-picker-input-elm
          from-date={this.startDate ? this.formatDate(this.startDate) : null}
          to-date={this.endDate ? this.formatDate(this.endDate) : null}>
        </date-range-picker-input-elm>

        <date-range-picker-popup
            is-open={this.isOpen}>
        </date-range-picker-popup>
      </div>
    );
  }
}
