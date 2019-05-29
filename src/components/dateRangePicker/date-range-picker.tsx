import { Component, Prop, State, Event, EventEmitter, Listen, Method } from '@stencil/core';

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
  @Prop() inline: boolean = false;

  @State() activeMonth: Date;
  @State() startDate: Date;
  @State() endDate: Date;
  @State() isOpen: boolean = false;
  @State() startDateActive: boolean = false;
  @State() endDateActive: boolean = false;

  @Event() input: EventEmitter;

  initialStartDateAsDate?: Date;
  initialEndDateAsDate?: Date;

  @Listen('startDateSet')
  startDateSetHandler (event: CustomEvent) {
    this.startDate = event.detail;
    this.endDate = null;
    this.startDateActive = false;
    this.endDateActive = true;
  }

  @Listen('endDateSet')
  endDateSetHandler (event: CustomEvent) {
    this.endDate = event.detail;
    this.isOpen = false;
    this.startDateActive = false;
    this.endDateActive = false;

    this.input.emit({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

  @Listen('didFocusElement')
  didFocusElementHandler () {
    this.isOpen = true;
    this.startDateActive = true;
    this.endDateActive = false;
  }

  @Method()
  clear () {
    this.startDateActive = false;
    this.endDateActive = false;
    this.startDate = null;
    this.endDate = null;
  }

  componentWillLoad () {
    if (this.initialStartDate) {
      this.initialStartDateAsDate = new Date(this.initialStartDate);
    }

    if (this.initialEndDate) {
      this.initialEndDateAsDate = new Date(this.initialEndDate);
    }

    this.updateActiveMonth();
    this.updateSelectedRange();
    this.bindClickToClose();
  }

  private bindClickToClose() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.localName !== 'date-range-picker') {
        this.isOpen = false;
        this.startDateActive = false;
        this.endDateActive = false;
      }
    });
  }

  private updateActiveMonth (): void {
    let activeMonth: Date;

    if (this.calendarStart) {
      activeMonth = new Date(this.calendarStart);
    } else if (this.initialStartDateAsDate) {
      activeMonth = this.initialStartDateAsDate;
    } else {
      activeMonth = new Date();
    }

    activeMonth.setDate(1);

    this.activeMonth = activeMonth;
  }

  private updateSelectedRange (): void {
    if (this.initialStartDateAsDate) {
      this.startDate = this.initialStartDateAsDate;
    }

    if (this.initialEndDate) {
      this.endDate = this.initialEndDateAsDate;
    }
  }

  renderInputElm () {
    return (
      <date-range-picker-input-elm
        fromDate={this.startDate}
        toDate={this.endDate}
        startDateActive={this.startDateActive}
        endDateActive={this.endDateActive}>
      </date-range-picker-input-elm>
    );
  }

  render () {
    return (
      <div class="outer-range-picker">
        {! this.inline ? this.renderInputElm() : ''}

        <date-range-picker-popup
            inline={this.inline}
            isOpen={this.isOpen}
            hideOutsiders={this.hideOutsiders}
            fromDate={this.startDate}
            toDate={this.endDate}
            initialActiveMonth={this.activeMonth}
            startOnSundays={this.startOnSundays}
            disablePast={this.disablePast}
            numberOfCalendars={this.numberOfCalendars}>
        </date-range-picker-popup>
      </div>
    );
  }
}
