import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UpperCaseInputDirective } from './uppercase-directive';
import { NumberRestricDirective } from './number-directive';
import { InvalidDirective } from './invalid-directive';
import { ShowErrorDirective } from '../error/show-error.directive';
import { FormFieldComponent } from '../error/show-error-component';
import { ErrorService } from '../error/error.service';

@Component({
  selector: 'app-kfz-plate',
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule, UpperCaseInputDirective, NumberRestricDirective, InvalidDirective, ShowErrorDirective, FormFieldComponent ],
  template: `
  <form [formGroup]="plateForm" (ngSubmit)="onSubmit()">
    <div class="flex flex-row gap-4 justify-center"> 

      <input class="grow-0"
       #part1Input formControlName="part1" placeholder="M" uppercase maxLength="3" app-invalid showError>

      <input class="grow-0"
       #part2Input formControlName="part2" placeholder="AB" uppercase maxLength="2" app-invalid showError>
      
      <input class="grow-0"
       #part3Input formControlName="part3" placeholder="1234" maxLength="4" app-invalid showError>

    </div>
    <ul>
    @for(error of errors; track error)
    {
      <li>{{error}}</li>
    }
  </ul>
    <button class="" type="submit" [disabled]="!plateForm.valid">Submit</button>
    <div *ngIf="plateForm.get('fullPlate')?.invalid && (plateForm.get('fullPlate')?.dirty || plateForm.get('fullPlate')?.errors)">
      <p>Invalid number plate format</p>
    </div>
  </form>
`,
styles: [`
  input {
    margin: 5px;
    padding: 5px;
  }
  p {
    color: red;
  }
  input:user-invalid{
    border-right: solid red
  }

  input:user-valid{
    border-right: solid green;
  }
`]
})
export class KfzPlateComponent implements OnInit {

errorService = inject(ErrorService);

errors:string[] =[];
plateForm: FormGroup;

plateId = output<string>();

constructor(private fb: FormBuilder) {
  this.plateForm = this.fb.group({
    part1: ['', [Validators.required,Validators.maxLength(3), Validators.pattern(/^[A-ZÜÖÄ]{1,3}$/)]],
    part2: ['', [Validators.required,Validators.maxLength(2),  Validators.pattern(/^[A-Z]{1,2}$/)]],
    part3: ['', [Validators.required,Validators.maxLength(5), Validators.pattern(/^[1-9][0-9]{1,3}?$/)]]
  });
  //toSignal(this.plateForm.valueChanges);
  this.plateForm.statusChanges.subscribe(()=>{
    this.errors = [
      ...Array(this.plateForm.controls['part1'].errors!).map((err)=>{
        return this.errorService.getErrorValidationMessage('part1',Object.entries(err||{}));}),
      ...Array(this.plateForm.controls['part2'].errors!).map((err)=>{
          return this.errorService.getErrorValidationMessage('part2',Object.entries(err||{}));}) ,
      ...Array(this.plateForm.controls['part3'].errors!).map((err)=>{
            return this.errorService.getErrorValidationMessage('part3',Object.entries(err||{}));}),
    ] 
  
  console.dir(this.plateForm);
  this.errors   = this.errors.filter((e)=> !!e);
  });
}

ngOnInit() {
  console.log(  this.plateForm.errors);
  // ... (keep the existing ngOnInit logic)
}

onPartialKeydown(event: KeyboardEvent, currentField: string, nextInput?: HTMLInputElement) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  if (event.key === '-') {
    event.preventDefault();
    if (nextInput) {
      nextInput.focus();
    }
    return;
  }

  let regex: RegExp;
  let maxLength: number;

  switch (currentField) {
    case 'part1':
      regex = /^[A-ZÜÖÄ]$/;
      maxLength = 3;
      break;
    case 'part2':
      regex = /^[A-Z]$/;
      maxLength = 2;
      break;
    case 'part3':
      regex = /^[1-9EH]$/;
      maxLength = 5;
      break;
    default:
      return;
  }

  if (!regex.test(event.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
    event.preventDefault();
  } else if (value.length >= maxLength && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
    event.preventDefault();
    if (nextInput) {
      nextInput.focus();
    }
  }
}

onFullPlateBlur() {
  // ... (keep the existing onFullPlateBlur logic)
}

onSubmit() {
  // ... (keep the existing onSubmit logic)
}
}