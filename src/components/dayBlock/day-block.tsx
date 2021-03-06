import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'day-block',
  styleUrl: 'day-block.css',
  shadow: true
})
export class DayBlock {
  @Prop() outsideActiveMonth: boolean;
  @Prop() shouldHide: boolean;
  @Prop() isSelectedEndRange: boolean;
  @Prop() isSelectedBetweenRange: boolean;
  @Prop() isMaybeRange: boolean;
  @Prop() isMaybeStart: boolean;
  @Prop() date: string;
  @Prop() shouldDisable: boolean;

  @Event() clickDate: EventEmitter;
  @Event() mouseOverDate: EventEmitter;
  @Event() mouseLeaveDate: EventEmitter;

  private dateObj: Date;

  private classList = {}

  componentWillUpdate () {
    this.updateValues();
  }

  componentWillLoad () {
    this.updateValues();
  }

  updateValues () {
    this.dateObj = new Date(this.date);

    this.classList = {
      'disabled': this.shouldDisable,
      'outside-active-month': this.outsideActiveMonth,
      'hide-block': this.shouldHide,
      'selected-end-range': this.isSelectedEndRange,
      'selected-between-range': this.isSelectedBetweenRange,
      'maybe-range': this.isMaybeRange,
      'maybe-start': this.isMaybeStart,
      'column': true
    }
  }

  handleClick () {
    if (! this.shouldDisable) {
      this.clickDate.emit(this.dateObj);
    }
  }

  handleMouseOver () {
    if (! this.shouldDisable) {
      this.mouseOverDate.emit(this.dateObj);
    }
  }

  handleMouseLeave () {
    if (! this.shouldDisable) {
      this.mouseLeaveDate.emit(this.dateObj);
    }
  }

  getDateAsString () {
    return this.dateObj.getDate();
  }

  render () {
    return (
      <div 
        class={this.classList}
        onClick={() => this.handleClick()}
        onMouseOver={() => this.handleMouseOver()}
        onMouseLeave={() => this.handleMouseLeave()}>
        {this.getDateAsString()}
      </div>
    )
  }
}
