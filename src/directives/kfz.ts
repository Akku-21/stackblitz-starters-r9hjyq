import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UpperCaseInputDirective } from './uppercase-directive';
import { NumberRestricDirective } from './number-directive';
import { InvalidDirective } from './invalid-directive';
import { ShowErrorDirective } from '../error/show-error.directive';
import { FormFieldComponent } from '../error/show-error-component';
import { ErrorService } from '../error/error.service';


export function checkMatchValidator(field1: string, field2: string) {
  return function (frm:any) {
    let field1Value = frm.get(field1).value;
    let field2Value = frm.get(field2).value;

    if (field1Value !== '' && field1Value !== field2Value) {
      return { 'match': `value ${field1Value} is not equal to ${field2Value}` }
    }
    return null;
  }
}

export const multipleFieldsValidator = (): ValidatorFn => {
return (control: AbstractControl): ValidationErrors | null => {
  console.log(control.value)
  return (control.value.length + control.parent?.get('part1')?.value.length) > 4 ? { fieldIsInvalid: true } : null;
};
};

export function maxLength() {
    return (group: AbstractControl) => {
      const totlallength = group.get('part1')?.value.length + group.get('part2')?.value.length + group.get('part3')?.value.length;

      if(totlallength >= 8 )
        {

      return { maxLength: 'foobraiern' };
        }
      return null;
    }
}

@Component({
  selector: 'app-kfz-plate',
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule, UpperCaseInputDirective, NumberRestricDirective, InvalidDirective, ShowErrorDirective, FormFieldComponent ],
  template: `
  <form [formGroup]="plateForm" (ngSubmit)="onSubmit()">
    <div class="flex flex-row gap-4 justify-center">

      <input class="grow-0"
       #part1Input formControlName="part1" placeholder="M" uppercaese maxLength="3"  app-invalid>

      <input class="grow-0"
       #part2Input formControlName="part2" placeholder="AB" uppercasle maxLength="2" app-invalid >

      <input class="grow-0"
       #part3Input formControlName="part3" placeholder="1234" maxLength="4" app-invalid >

       <select formControlName="part4" class="grow-0" app-invalid>
        <option value=""></option>
        <option value="E">E</option>
        <option value="H">H</option>
        </select>
    </div>
    <ul>
    @for(error of errors; track error)
    {
    <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <p>{{error}}</p>
    </div>
      }
  </ul>
    <button class="" type="submit" [disabled]="!plateForm.valid">Submit</button>
    <div *ngIf="plateForm?.invalid && (plateForm?.dirty || plateForm?.errors)">
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
export class KfzPlateComponent {

errorService = inject(ErrorService);

errors:string[] =[];
plateForm: FormGroup;

plateId = output<string>();

constructor(private fb: FormBuilder) {
  this.plateForm = this.fb.group({
    part1: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[A-ZÜÖÄ]{1,3}$/)]],
    part2: ['', [Validators.required, Validators.maxLength(2), Validators.pattern(/^[A-Z]{1,2}$/)]],
    part3: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^[1-9][0-9]{1,3}?$/)]],
    part4:['',[]],
  },{
            validators: maxLength()
  }
  );
  //toSignal(this.plateForm.valueChanges);
  this.plateForm.statusChanges.subscribe(() => {
    console.log('status changed', this.plateForm.errors);

    this.errors = [
      ...Array(this.plateForm.controls['part1'].errors!).map((err)=>{
        return this.errorService.getErrorValidationMessage('part1',Object.entries(err||{}));}),
      ...Array(this.plateForm.controls['part2'].errors!).map((err)=>{
          return this.errorService.getErrorValidationMessage('part2',Object.entries(err||{}));}) ,
      ...Array(this.plateForm.controls['part3'].errors!).map((err)=>{
            return this.errorService.getErrorValidationMessage('part3',Object.entries(err||{}));}),
      ...Array(this.plateForm.errors!).map((err)=>{
            return this.errorService.getErrorValidationMessage('maxLength',Object.entries(err||{}));}),
    ]

  console.dir(this.plateForm);
  this.errors   = this.errors.filter((e)=> !!e);
  });
}

onFullPlateBlur() {
  // ... (keep the existing onFullPlateBlur logic)
}

onSubmit() {
  // ... (keep the existing onSubmit logic)
}
}
