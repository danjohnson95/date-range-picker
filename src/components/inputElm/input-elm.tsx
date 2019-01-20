import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'date-range-picker-input-elm',
  styleUrl: 'input-elm.css',
  shadow: true
})
export class DateRangePickerInputElm {
  @Prop() fromDate?: string;
  @Prop() toDate?: string;

  val: string;

  componentWillLoad () {
    this.val = this.getValue();
  }

  componentWillUpdate () {
    this.val = this.getValue();
  }

  getValue (): string {
    if (this.fromDate) {
      return this.fromDate.toString() + ' to ' + (this.toDate ? this.toDate.toString() : '?');
    }

    return 'No range set';
  }

  render () {
    return (
      <div>
        <input type="text" value={this.val}/>
      </div>
    );
  }
}
