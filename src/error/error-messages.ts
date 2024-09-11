export type ErrorTypes =
  | 'required'
  | 'pattern'
  | 'maxLength';

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
  required: (formControlName: string) => `${formControlName} wird benötigt.`,
  pattern: (formControlName: string) => {
    switch (formControlName) {
     case 'Ortskennzeichen':
        return 'Bitte geben Sie das Ortskennzeichen des Zulassungsbezirks an (z.B. M für München). Es sind nur Buchstaben zulässig.';
       case 'Buchstabengruppe':
        return 'Bitte geben Sie die Buchstabengruppe des Kennzeichens an. Es sind nur Buchstaben zulässig.';
        case 'Erkennungsnummer':
        return 'Bitte geben Sie die Ziffern des Kennzeichens an. Es sind nur Ziffern zulässig';
    }
    return 'alles kapott';
  },
    maxLength: () => 'Insgesamt dürfen maximal 8 Zeichen für das gesamte Kennzeichen eingetragen sein'
};
