import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function neptunCodeValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors|null => {
    const value = (control.value || '') as string;

    return /^[A-Z][A-Z\d]{5}$/.test(value) ? null : { neptunCode: true };
  }
}