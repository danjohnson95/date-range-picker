import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'range-navigation',
    styleUrl: 'range-navigation.css',
    shadow: true
})

export class RangeNavigation {
    @Event() previousMonth: EventEmitter;
    @Event() nextMonth: EventEmitter;

    emitPrevousMonth () {
        this.previousMonth.emit();
    }

    emitNextMonth () {
        this.nextMonth.emit();
    }

    render () {
        return (
            <div>
                <button onClick={() => this.emitPrevousMonth()}>Back</button>
                <button onClick={() => this.emitNextMonth()}>Next</button>
            </div>
        )
    }
}
