import { Component, Input, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';

interface ILicensePlateProps {
  plateColor?: string;
  countryCode: string;
  countryCodeColor?: string;
  plateId: string;
  height: number;
}

@Component({
  selector: 'app-kfz-plate-2',
  standalone:true,
  imports:[CommonModule],
  template: `
     <div
      class="license-plate__rectangle"
      [ngStyle]="styles"
    >
      <div class="country">
        <div class="european-stars">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/93/European_stars.svg"
            alt="Stars of european flag"
            [style.width]="'80%'"
          />
        </div>
        <div class="country-code">
          <h1
            [style.fontSize]="countryFontSize"
            [style.color]="countryCodeColor"
          >
            {{countryCode.substring(0, 3)}}
          </h1>
        </div>
      </div>
      <div class="id">
        <h1 [style.fontSize]="plateFontSize" >{{plateId}}</h1>
      </div>
    </div>
`,
styles: [`
  .license-plate__rectangle {
  border: 5px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: row;

  & .country {
    height: 100%;
    width: 16%;
    background-color: blue;
    display: flex;
    flex-direction: column;

    & > div {
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }

  & .id {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
`]
})
export class KfzPlateComponent2 implements OnInit {
  @Input({ required: true }) plateId!: string;

public height= 150;
public color = 'blue';
countryCode= 'D';
ccode = '';
styles = {
  'background-color': '#fff',
  'width': this.height*3 + 'px',
  'height': this.height + 'px',
}

plateFontSize = this.height/2 + 'px';
countryFontSize = this.height/3 + 'px';
countryCodeColor = '#fff';


  ngOnInit(){
    this.ccode = this.countryCode.substring(0,3)

}
}