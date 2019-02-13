import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'date-range-picker-input-elm',
  styleUrl: 'input-elm.css',
  shadow: true
})
export class DateRangePickerInputElm {
  @Prop() fromDate?: Date;
  @Prop() toDate?: Date;

  render () {
    return (
      <div>
        <date-range-picker-input-elm-selection
          placeholder="Start date"
          date={this.fromDate}>
        </date-range-picker-input-elm-selection>

        <date-range-picker-input-elm-selection
          placeholder="End date"
          date={this.toDate}>
        </date-range-picker-input-elm-selection>
      </div>
    );
  }
}
