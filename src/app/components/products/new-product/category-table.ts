import { Component } from '@angular/core';

@Component({
    selector: 'cat-table',
    template: `
    
        <md-input-container class="example-full-width">
            <input mdInput placeholder="new category">
             <button type="button" md-raised-button>Add Category</button>
        </md-input-container>

    `,
    styles: ['']
})
export class CatTableComponent {

}