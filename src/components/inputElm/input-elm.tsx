import { Component, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'date-range-picker-input-elm',
  styleUrl: 'input-elm.css',
  shadow: true
})
export class DateRangePickerInputElm {
  @Prop() fromDate?: Date;
  @Prop() toDate?: Date;
  @Prop() startDateActive: boolean;
  @Prop() endDateActive: boolean;
  @Event() didFocusElement: EventEmitter;

  toggle() {
    console.log('toggle');
    this.didFocusElement.emit();
  }

  render () {
    return (
      <div onClick={() => this.toggle()}>
        <date-range-picker-input-elm-selection
          placeholder="Start date"
          isActive={this.startDateActive}
          date={this.fromDate}>
        </date-range-picker-input-elm-selection>

        <svg class="_1ehavpg" focusable="false" viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path></svg>

        <date-range-picker-input-elm-selection
          placeholder="End date"
          isActive={this.endDateActive}
          date={this.toDate}>
        </date-range-picker-input-elm-selection>
      </div>
    );
  }
}
