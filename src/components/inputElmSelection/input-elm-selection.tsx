import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'date-range-picker-input-elm-selection',
  styleUrl: 'input-elm-selection.css',
  shadow: true
})
export class DateRangePickerInputElmSelection {
  @Prop() date?: Date;
  @Prop() placeholder: string;
  @Prop() isActive: boolean;

  output: string

  componentWillLoad() {
    this.output = this.getDateOutput();
  }

  componentWillUpdate() {
    this.output = this.getDateOutput();
  }

  private formatDate (date: Date): string {
    return [
      date.getDate().toString().padStart(2, '0'),
      date.getMonth().toString().padStart(2, '0'),
      date.getFullYear().toString()
    ].join('/');
  }

  getDateOutput(): string {
    if (! this.date) {
      return null;
    }

    return this.formatDate(this.date);
  }

  render () {
    const classList = {
      'active': this.isActive
    };

    console.log('is active?', this.isActive)

    return (
      <input class={classList} type="text" placeholder={this.placeholder} value={this.output}/>
    );
  }
}
