import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: 
    `
        <div class="container mt-3">
          <div class="col-xs-4">
            <weather-widget></weather-widget>
          </div>
        </div>
    `,
    styles: [`
        
    `]
})
export class AppComponent { }