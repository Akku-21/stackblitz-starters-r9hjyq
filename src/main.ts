import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { KfzPlateComponent } from './kfz/kfz';
import { KfzPlateComponent2 } from './kfz/plate';

@Component({
  selector: 'app-root',
  imports:[KfzPlateComponent,KfzPlateComponent2],
  standalone: true,
  template: `
  <h1 class="text-3xl font-bold underline">kFz Test</h1>
    <app-kfz-plate/>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
