import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UpperCaseInputDirective } from '../directives/uppercase-directive';
import { NumberRestricDirective } from '../directives/number-directive';
import { InvalidDirective } from '../directives/invalid-directive';
import { ErrorService } from '../error/error.service';


export function maxLength() {
    return (group: AbstractControl) => {
      const totlallength = group.get('part1')?.value.length + group.get('part2')?.value.length + group.get('part3')?.value.length;

      if(totlallength > 8 )
        {

      return { maxLength: 'foobraiern' };
        }
      return null;
    }
}

@Component({
  selector: 'kennzeichen-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UpperCaseInputDirective, NumberRestricDirective, InvalidDirective],
  templateUrl: './kennzeichen-component.component.html',
  styleUrl: './kennzeichen-component.component.css'
})
export class KennzeichenComponent implements  ControlValueAccessor {

  errorService = inject(ErrorService);

  errors: string[] = [];
  plateForm: FormGroup;

  plateId = output<string>();
  protected _onChange = (event:any)  =>{console.log(event)};
  protected _onTouched = (event:any) => {console.log(event)};

  constructor(private fb: FormBuilder) {
    this.plateForm = this.fb.group({
      Ortskennzeichen: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(/^[A-ZÜÖÄ]{1,3}$/)]],
      Buchstabengruppe: ['', [Validators.required, Validators.maxLength(2), Validators.pattern(/^[A-Z]{1,2}$/)]],
      Erkennungsnummer: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^[1-9][0-9]{1,3}?$/)]],
      part4: ['', []],
    }, {
      validators: maxLength()
    }
    );
    //toSignal(this.plateForm.valueChanges);
    this.plateForm.statusChanges.subscribe(() => {
      this.errors = [
        ...Array(this.plateForm.controls['Ortskennzeichen'].errors!).map((err) => {
          return this.errorService.getErrorValidationMessage('Ortskennzeichen', Object.entries(err || {}));
        }),
        ...Array(this.plateForm.controls['Buchstabengruppe'].errors!).map((err) => {
          return this.errorService.getErrorValidationMessage('Buchstabengruppe', Object.entries(err || {}));
        }),
        ...Array(this.plateForm.controls['Erkennungsnummer'].errors!).map((err) => {
          return this.errorService.getErrorValidationMessage('Erkennungsnummer', Object.entries(err || {}));
        }),
        ...Array(this.plateForm.errors!).map((err) => {
          return this.errorService.getErrorValidationMessage('maxLength', Object.entries(err || {}));
        }),
      ]
      this.errors = this.errors.filter((e) => !!e);
    });
  }

  writeValue(obj: any): void {
   // check if obj is a string
    if (typeof obj === 'string') {
    // split the string into parts
      const parts = obj.split(' ');
      //assign the parts to the form controls
      this.plateForm.get('Ortskennzeichen')?.setValue(parts[0]);
      this.plateForm.get('Buchstabengruppe')?.setValue(parts[1]);
      this.plateForm.get('Erkennungsnummer')?.setValue(parts[2]);
    }
  }

  registerOnChange(fn: any): void {
 this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
     this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled? this.plateForm.disable(): this.plateForm.enable();
  }
}
