import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { KennzeichenComponent } from './kennzeichen-component/kennzeichen-component.component';

@Component({
  selector: 'app-root',
  imports:[KennzeichenComponent],
  standalone: true,
  template: `
  <h1 class="text-3xl font-bold underline">kFz Test</h1>
    <kennzeichen-component/>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
