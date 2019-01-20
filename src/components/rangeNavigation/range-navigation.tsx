import { Component } from '@stencil/core';

@Component({
    tag: 'range-navigation',
    styleUrl: 'range-navigation.css',
    shadow: true
})

export class RangeNavigation {
    render () {
        return (
            <div>
                <button>Back</button>
                <button>Next</button>
            </div>
        )
    }
}
