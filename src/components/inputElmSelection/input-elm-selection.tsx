import { Component, Prop } from '@stencil/core';
import months from '../../lang/months.json';

@Component({
  tag: 'date-range-picker-input-elm-selection',
  styleUrl: 'input-elm-selection.css',
  shadow: true
})
export class DateRangePickerInputElmSelection {
  @Prop() date?: Date;
  @Prop() placeholder: string;

  output: string

  componentWillLoad() {
    this.output = this.getDateOutput();
  }

  componentWillUpdate() {
    this.output = this.getDateOutput();
  }

  private formatDate (date: Date): string {
    const month = months[date.getMonth()];

    return date.getDate() + this.getSuffixFor(date.getDate()) + ' ' + month + ' ' + date.getFullYear();
  }

  private getSuffixFor (date: number): string {
    switch (date) {
      case 1:
        return 'st';
      case 2:
      case 22:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  getDateOutput(): string {
      if (! this.date) {
          return this.placeholder;
      }

      return this.formatDate(this.date);
  }

  render () {
    return (
      <div>
        { this.output }
      </div>
    );
  }
}
