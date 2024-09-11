import { Injectable } from '@angular/core';
import { ErrorTypes, ERROR_MESSAGES } from './error-messages';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  getErrorValidationMessage(
    formControlName: string,
    errors: [string, any][]
  ): string{

    console.log(formControlName,  errors)
    switch (true) {
      case this.checkErrorType(errors, 'required'):
        return ERROR_MESSAGES['required'](formControlName);

        case this.checkErrorType(errors, 'pattern'):
        return ERROR_MESSAGES['pattern'](formControlName);

        // case this.checkErrorType(errors, 'Buchstabengruppe'):
        // return ERROR_MESSAGES['Buchstabengruppe'](formControlName);

        // case this.checkErrorType(errors, 'Erkennungsnummer'):
        // return ERROR_MESSAGES['Erkennungsnummer'](formControlName);

        case this.checkErrorType(errors, 'maxLength'):
        return ERROR_MESSAGES['maxLength'](formControlName);

      default:
        return '';
    }
  }

  checkErrorType(errors: [string, any][], key: ErrorTypes) {
    return errors.some(([errorKey, value]) => errorKey === key);
  }

  getErrorMessage(errors: [string, any][], key: ErrorTypes) {
    return errors.find(([k, v]) => k === key)?.[1];
  }
}
