/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface DayBlock {
    'date': string;
    'isSelectedBetweenRange': boolean;
    'isSelectedEndRange': boolean;
    'outsideActiveMonth': boolean;
    'shouldHide': boolean;
  }
  interface DayBlockAttributes extends StencilHTMLAttributes {
    'date'?: string;
    'isSelectedBetweenRange'?: boolean;
    'isSelectedEndRange'?: boolean;
    'onClickDate'?: (event: CustomEvent) => void;
    'onMouseLeaveDate'?: (event: CustomEvent) => void;
    'onMouseOverDate'?: (event: CustomEvent) => void;
    'outsideActiveMonth'?: boolean;
    'shouldHide'?: boolean;
  }

  interface MonthCalendar {
    'activeMonth': string;
    'endDate'?: string;
    'hideOutsiders': boolean;
    'startDate'?: string;
    'startOnSundays': boolean;
  }
  interface MonthCalendarAttributes extends StencilHTMLAttributes {
    'activeMonth'?: string;
    'endDate'?: string;
    'hideOutsiders'?: boolean;
    'startDate'?: string;
    'startOnSundays'?: boolean;
  }

  interface RangeNavigation {}
  interface RangeNavigationAttributes extends StencilHTMLAttributes {
    'onNextMonth'?: (event: CustomEvent) => void;
    'onPreviousMonth'?: (event: CustomEvent) => void;
  }

  interface RangePicker {
    'calendarStart': string;
    'hideOutsiders': boolean;
    'initialEndDate'?: string;
    'initialStartDate'?: string;
    'numberOfCalendars': number;
    'startOnSundays': boolean;
  }
  interface RangePickerAttributes extends StencilHTMLAttributes {
    'calendarStart'?: string;
    'hideOutsiders'?: boolean;
    'initialEndDate'?: string;
    'initialStartDate'?: string;
    'numberOfCalendars'?: number;
    'startOnSundays'?: boolean;
  }
}

declare global {
  interface StencilElementInterfaces {
    'DayBlock': Components.DayBlock;
    'MonthCalendar': Components.MonthCalendar;
    'RangeNavigation': Components.RangeNavigation;
    'RangePicker': Components.RangePicker;
  }

  interface StencilIntrinsicElements {
    'day-block': Components.DayBlockAttributes;
    'month-calendar': Components.MonthCalendarAttributes;
    'range-navigation': Components.RangeNavigationAttributes;
    'range-picker': Components.RangePickerAttributes;
  }


  interface HTMLDayBlockElement extends Components.DayBlock, HTMLStencilElement {}
  var HTMLDayBlockElement: {
    prototype: HTMLDayBlockElement;
    new (): HTMLDayBlockElement;
  };

  interface HTMLMonthCalendarElement extends Components.MonthCalendar, HTMLStencilElement {}
  var HTMLMonthCalendarElement: {
    prototype: HTMLMonthCalendarElement;
    new (): HTMLMonthCalendarElement;
  };

  interface HTMLRangeNavigationElement extends Components.RangeNavigation, HTMLStencilElement {}
  var HTMLRangeNavigationElement: {
    prototype: HTMLRangeNavigationElement;
    new (): HTMLRangeNavigationElement;
  };

  interface HTMLRangePickerElement extends Components.RangePicker, HTMLStencilElement {}
  var HTMLRangePickerElement: {
    prototype: HTMLRangePickerElement;
    new (): HTMLRangePickerElement;
  };

  interface HTMLElementTagNameMap {
    'day-block': HTMLDayBlockElement
    'month-calendar': HTMLMonthCalendarElement
    'range-navigation': HTMLRangeNavigationElement
    'range-picker': HTMLRangePickerElement
  }

  interface ElementTagNameMap {
    'day-block': HTMLDayBlockElement;
    'month-calendar': HTMLMonthCalendarElement;
    'range-navigation': HTMLRangeNavigationElement;
    'range-picker': HTMLRangePickerElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
